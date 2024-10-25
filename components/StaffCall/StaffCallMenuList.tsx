import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import StaffCallMenuCard from "./StaffCallMenuCard";

type Props = {
  menuList: staffMenuType[];
  onAddStaffCart: (item: staffCartType) => void;
};

const StaffCallMenuList = ({ menuList, onAddStaffCart }: Props) => {
  const [numColumns] = useState(3);
  const listKey = `list-${numColumns}`;
  return (
    <FlatList
      key={listKey}
      data={menuList}
      renderItem={({ item }) => <StaffCallMenuCard id={item.id} title={item.optionName} onAddStaffCart={onAddStaffCart} />}
      keyExtractor={(v, i) => v.optionName + i}
      numColumns={numColumns}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between"
  }
});

export default StaffCallMenuList;
