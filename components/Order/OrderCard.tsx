import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  item: cartType;
};

const OrderCard = ({ item }: Props) => {
  return (
    <Pressable style={styles.orderItem}>
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: scale(90) }}>
        <Text style={[styles.itemText]}>{item.count}개</Text>
        <Text style={styles.itemText}>{item.price * item.count}원</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(5),
    paddingHorizontal: scale(10)
  },
  itemText: {
    fontSize: scale(14)
  }
});

export default OrderCard;
