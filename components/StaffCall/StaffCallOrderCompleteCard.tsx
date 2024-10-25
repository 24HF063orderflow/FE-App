import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  item: staffCartType;
};

const StaffCallOrderCompleteCard = ({ item }: Props) => {
  return (
    <Pressable style={styles.orderItem}>
      <Text style={styles.itemText}>{item.optionName}</Text>
      <Text style={[styles.itemText]}>{item.count}개</Text>
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

export default StaffCallOrderCompleteCard;
