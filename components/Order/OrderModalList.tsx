import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import OrderCard from "./OrderCard";
import { scale } from "react-native-size-matters";

type Props = {
  orderList: cartType[];
};

const OrderModalList = ({ orderList }: Props) => {
  const totalPrice = orderList.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);
  return (
    <>
      <Pressable style={{ flex: 1 }}>
        <FlatList data={orderList} renderItem={({ item }) => <OrderCard item={item} />} keyExtractor={(v, i) => v.title + i} />
      </Pressable>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>합</Text>
        <Text style={styles.totalText}>{totalPrice}원</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: scale(10)
  },
  totalText: {
    fontSize: scale(14),
    fontWeight: "bold"
  }
});
export default OrderModalList;
