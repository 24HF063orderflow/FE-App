import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, SectionList } from "react-native";
import TopBar from "../components/TopBar";
import LeftBar from "../components/Category/LeftBar";
import MenuList from "../components/MenuList/MenuList";
import Cart from "../components/Cart/Cart";
import CartButton from "../components/Cart/CartButton";
import PaymentModal from "../components/Payment/PaymentModal";
import OrderCompleteModal from "../components/Order/OrderCompleteModal";
import ReceiptModal from "../components/Order/ReceiptModal";
import { getMenuInfo } from "../utils/menuInfo";
import { addCart, deleteAllCart, deleteCart, getCart, modifyCart } from "../utils/cart";
import { getCategoryList } from "../utils/categoryList";
import { postCartOrder } from "../utils/order";
import { getData, removeData } from "../utils/storeData";

type Props = {
  screenChange: (screen: screenType) => void;
};

const MainScreen = ({ screenChange }: Props) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [receiptVisible, setReceiptVisible] = useState(false);

  const [categoryList, setCategoryList] = useState<categoryType[]>([]);
  const [menuInfo, setMenuInfo] = useState<menuInfoType[]>([]);
  const [cartList, setCartList] = useState<cartType[]>([]);

  const sectionListRef = useRef<SectionList>(null); // SectionList의 참조를 저장

  useEffect(() => {
    (async () => {
      setCategoryList(await getCategoryList());
      setMenuInfo(await getMenuInfo());
      setCartList((await getCart()) as unknown as cartType[]);
    })();
  }, []);

  const handleAddToCart = async (item: cartType) => {
    try {
      await addCart(item);
      setCartList((await getCart()) as unknown as cartType[]);
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  const handleModifyToCart = async (title: string, count: number) => {
    try {
      await modifyCart(title, count);
      setCartList((await getCart()) as unknown as cartType[]);
    } catch (error) {
      console.error("Error updating item to cart", error);
    }
  };

  const handleDeleteToCart = async (title: string) => {
    try {
      await deleteCart(title);
      setCartList((await getCart()) as unknown as cartType[]);
    } catch (error) {
      console.error("Error deleting item to cart", error);
    }
  };

  const clearCart = async () => {
    await deleteAllCart();
    setCartList((await getCart()) as unknown as cartType[]);
  };

  const handleCategoryPress = (index: number) => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0, // 섹션의 첫 번째 아이템으로 스크롤
        animated: true
      });
    }
  };

  const togglePaymentComplete = () => {
    setPaymentComplete((pre) => !pre);
  };

  const toggleReceiptVisible = () => {
    setReceiptVisible((pre) => !pre);
  };

  const togglePaymentModal = () => {
    setPaymentVisible((pre) => !pre);
  };

  const toggleOrderModal = () => {
    if (cartList.length > 0) setOrderVisible((pre) => !pre);
    else alert("상품을 추가해주세요!");
  };

  const handlePaymentSelect = async (method: string) => {
    const data = await getData("cart");
    const cart: cartType[] = JSON.parse(data || "[]");
    postCartOrder(method, cart).then(() => {
      clearCart();
    });
    togglePaymentModal();
    // togglePaymentComplete();
  };

  const toggleCart = () => {
    setCartVisible((pre) => !pre);
  };

  const closeCart = () => {
    if (cartVisible) {
      toggleCart();
    }
  };

  // 섹션별로 데이터 그룹화
  const groupedSections = categoryList.map((category) => ({
    title: category,
    data: menuInfo.filter((item) => item.categoryName === category)
  }));

  return (
    <>
      <TopBar homeButtonVisible={false} screenChange={screenChange} />
      <TouchableWithoutFeedback onPress={closeCart}>
        <View style={styles.container}>
          <LeftBar categoryList={categoryList} onPressCategory={handleCategoryPress} screenChange={screenChange} />
          <MenuList
            sections={groupedSections}
            onAddCart={handleAddToCart}
            sectionListRef={sectionListRef} // SectionList의 ref 전달
            toggleCartVisibility={toggleCart}
          />
          {cartVisible && (
            <Cart
              cartList={cartList}
              onOrder={toggleOrderModal}
              toggleCartVisibility={toggleCart}
              onModifyCart={handleModifyToCart}
              onDeleteCart={handleDeleteToCart}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      {!cartVisible && <CartButton onPress={toggleCart} />}
      <OrderCompleteModal
        orderList={cartList}
        paymentComplete={paymentComplete}
        visible={orderVisible}
        onClose={() => setOrderVisible(false)}
        onPayment={togglePaymentModal}
        togglePaymentComplete={togglePaymentComplete}
        toggleReceiptVisible={toggleReceiptVisible}
        clearCart={clearCart}
      />
      <PaymentModal
        visible={paymentVisible}
        onClose={() => setPaymentVisible(false)}
        onOrder={toggleOrderModal}
        onSelectPayment={handlePaymentSelect}
      />
      <ReceiptModal visible={receiptVisible} clearCart={clearCart} onClose={() => setReceiptVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    position: "relative"
  }
});

export default MainScreen;
