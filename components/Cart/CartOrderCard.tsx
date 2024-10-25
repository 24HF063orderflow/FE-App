import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import OrderOptionButton from "../OrderOptionButton";

type Props = {
  orderInfo: cartType;
  onModifyCart: (title: string, count: number) => void;
  onDeleteCart: (title: string) => void;
};

const CartOrderCard = ({ orderInfo, onModifyCart, onDeleteCart }: Props) => {
  return (
    <Pressable style={styles.orderInfo}>
      <Text style={styles.orderText}>{orderInfo.name}</Text>
      <View style={styles.orderControls}>
        <OrderOptionButton
          onPress={() => {
            onModifyCart(orderInfo.name, 1);
          }}
          customStyle={{ fontSize: scale(8), padding: scale(6), backgroundColor: "#e0e0e0", fontColor: "#000" }}
        >
          +
        </OrderOptionButton>
        <Text style={styles.orderCount}>{orderInfo.count}개</Text>
        <OrderOptionButton
          onPress={() => {
            onModifyCart(orderInfo.name, -1);
          }}
          customStyle={{ fontSize: scale(8), padding: scale(6), backgroundColor: "#e0e0e0", fontColor: "#000" }}
        >
          -
        </OrderOptionButton>
        <OrderOptionButton
          onPress={() => {
            onDeleteCart(orderInfo.name);
          }}
          customStyle={{ fontSize: scale(8), padding: scale(6), backgroundColor: "#ff6f61", fontColor: "#fff" }}
        >
          삭제
        </OrderOptionButton>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  orderInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(10),
    paddingBottom: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  orderText: {
    flex: 3,
    fontSize: scale(8),
    color: "#000"
  },
  orderControls: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  orderCount: {
    // marginHorizontal: scale(10),
    fontSize: scale(8),
    color: "#000"
  }
});

export default CartOrderCard;
