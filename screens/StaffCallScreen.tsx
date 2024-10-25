import { View, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";
import { scale } from "react-native-size-matters";
import StaffCallMenuList from "../components/StaffCall/StaffCallMenuList";
import StaffCallOrderList from "../components/StaffCall/StaffCallOrderList";
import CallButton from "../components/CallButton";
import { useEffect, useState } from "react";
import { addStaffCart, deleteAllStaffCart, deleteStaffCart, getStaffCart, getStaffMenu, modifyStaffCart } from "../utils/staffCall";
import StaffCallOrderCompleteModal from "../components/StaffCall/StaffCallOrderCompleteModal";

type Props = {
  screenChange: (screen: screenType) => void;
};

const StaffCallScreen = ({ screenChange }: Props) => {
  const [staffMenuList, setStaffMenuList] = useState<staffMenuType[]>([]);
  const [staffCartList, setStaffCartList] = useState<staffCartType[]>([]);
  const [staffCallOrderModalVisible, setStaffCallOrderModalVisible] = useState(false);

  const handleAddToStaffCart = async (item: staffCartType) => {
    try {
      await addStaffCart(item);
      setStaffCartList(await getStaffCart());
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  const handleModifyToStaffCart = async (title: string, count: number) => {
    try {
      await modifyStaffCart(title, count);
      setStaffCartList(await getStaffCart());
    } catch (error) {
      console.error("Error updating item to cart", error);
    }
  };

  const handleDeleteToStaffCart = async (title: string) => {
    try {
      await deleteStaffCart(title);
      setStaffCartList(await getStaffCart());
    } catch (error) {
      console.error("Error deleting item to cart", error);
    }
  };

  const handleClearStaffCart = async () => {
    await deleteAllStaffCart();
    setStaffCartList(await getStaffCart());
  };

  const handleOnlyStaff = async () => {
    await deleteAllStaffCart();
    const onlyStaff = staffMenuList.find((item) => item.optionName === "직원호출");
    if (onlyStaff) await addStaffCart({ id: onlyStaff.id, optionName: onlyStaff.optionName, count: 1 });
    setStaffCartList(await getStaffCart());
    setStaffCallOrderModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      setStaffMenuList(await getStaffMenu());
      setStaffCartList(await getStaffCart());
    })();
  }, []);

  return (
    <>
      <TopBar homeButtonVisible={true} screenChange={screenChange} />
      <View style={styles.container}>
        <View style={styles.menu}>
          <StaffCallMenuList onAddStaffCart={handleAddToStaffCart} menuList={staffMenuList} />
          <CallButton color="black" onPress={handleOnlyStaff}>
            직원만 호출
          </CallButton>
        </View>
        <View style={styles.call}>
          <StaffCallOrderList
            onModifyStaffCart={handleModifyToStaffCart}
            onDeleteStaffCart={handleDeleteToStaffCart}
            data={staffCartList}
          />
          <CallButton
            color="#9e9e9e"
            onPress={() => {
              if (staffCartList.length > 0) setStaffCallOrderModalVisible(true);
              else alert("요청상품을 추가해주세요!");
            }}
          >
            요청하기
          </CallButton>
        </View>
      </View>
      <StaffCallOrderCompleteModal
        visible={staffCallOrderModalVisible}
        staffCartList={staffCartList}
        onClose={() => setStaffCallOrderModalVisible(false)}
        clearStaffCart={handleClearStaffCart}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#3c3c3c",
    padding: scale(20),
    paddingTop: 0
  },
  menu: {
    flex: 1,
    backgroundColor: "#7d7d7d",
    marginRight: scale(10),
    justifyContent: "space-between",
    borderRadius: scale(10),
    padding: scale(10)
  },
  call: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: scale(10),
    justifyContent: "space-between",
    padding: scale(10),
    borderRadius: scale(10)
  }
});

export default StaffCallScreen;
