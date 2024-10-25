import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import StaffCallOrderCompleteCard from "./StaffCallOrderCompleteCard";

type Props = {
  staffCartList: staffCartType[];
};

const StaffCallOrderModalList = ({ staffCartList }: Props) => {
  return (
    <>
      <Pressable style={{ flex: 1 }}>
        <FlatList
          data={staffCartList}
          renderItem={({ item }) => <StaffCallOrderCompleteCard item={item} />}
          keyExtractor={(v, i) => v.optionName + i}
        />
      </Pressable>
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
export default StaffCallOrderModalList;
