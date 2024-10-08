import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import OrderOptionButton from "../OrderOptionButton";
import { scale } from "react-native-size-matters";

type Props = {
  orderInfo: staffCartType;
  onModifyStaffCart: (title: string, count: number) => void;
  onDeleteStaffCart: (title: string) => void;
};

const StaffCallOrderCard = ({ orderInfo, onModifyStaffCart, onDeleteStaffCart }: Props) => {
  return (
    <Pressable style={styles.orderInfo}>
      <Text style={styles.orderText}>{orderInfo.title}</Text>
      <View style={styles.orderControls}>
        <OrderOptionButton
          onPress={() => {
            onModifyStaffCart(orderInfo.title, 1);
          }}
          customStyle={{ fontSize: scale(16), padding: scale(10), backgroundColor: "#e0e0e0", fontColor: "#000" }}
        >
          +
        </OrderOptionButton>
        <Text style={styles.orderCount}>{orderInfo.count}개</Text>
        <OrderOptionButton
          onPress={() => {
            onModifyStaffCart(orderInfo.title, -1);
          }}
          customStyle={{ fontSize: scale(16), padding: scale(10), backgroundColor: "#e0e0e0", fontColor: "#000" }}
        >
          -
        </OrderOptionButton>
        <OrderOptionButton
          onPress={() => {
            onDeleteStaffCart(orderInfo.title);
          }}
          customStyle={{ fontSize: scale(16), padding: scale(10), backgroundColor: "#ff6f61", fontColor: "#fff" }}
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
    fontSize: scale(16),
    color: "#000"
  },
  orderControls: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  orderCount: {
    marginHorizontal: scale(10),
    fontSize: scale(16),
    color: "#000"
  }
});

export default StaffCallOrderCard;
