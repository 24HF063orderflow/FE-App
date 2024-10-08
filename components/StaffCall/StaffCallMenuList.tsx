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
      renderItem={({ item }) => <StaffCallMenuCard title={item.title} onAddStaffCart={onAddStaffCart} />}
      keyExtractor={(v, i) => v.title + i}
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
