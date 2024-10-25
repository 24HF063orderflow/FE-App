import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import CartOrderCard from "./CartOrderCard";
import { scale } from "react-native-size-matters";
import CallButton from "../CallButton";

type Props = {
  cartList: cartType[];
  toggleCartVisibility: () => void;
  onOrder: () => void;
  onModifyCart: (title: string, count: number) => void;
  onDeleteCart: (title: string) => void;
};

const Cart = ({ cartList, toggleCartVisibility, onOrder, onModifyCart, onDeleteCart }: Props) => {
  return (
    <Pressable style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={toggleCartVisibility} />
      <View style={styles.cartContainer}>
        <Text style={styles.title}>장바구니</Text>
        <FlatList
          data={cartList}
          renderItem={({ item }) => <CartOrderCard orderInfo={item} onModifyCart={onModifyCart} onDeleteCart={onDeleteCart} />}
          keyExtractor={(v, i) => v.name + i}
        />
        <CallButton color="#9e9e9e" onPress={onOrder}>
          주문하기
        </CallButton>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 회색 배경
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  cartContainer: {
    width: "27%",
    backgroundColor: "white",
    padding: 16,
    borderLeftWidth: 1,
    borderColor: "#ddd",
    height: "100%" // 화면 전체 높이를 차지하도록 설정
  },
  title: {
    fontSize: scale(13),
    fontWeight: "bold",
    marginBottom: 20
  }
});

export default Cart;
