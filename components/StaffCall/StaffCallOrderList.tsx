import React from "react";
import { FlatList } from "react-native";
import StaffCallOrderCard from "./StaffCallOrderCard";

type Props = {
  data: staffCartType[];
  onModifyStaffCart: (title: string, count: number) => void;
  onDeleteStaffCart: (title: string) => void;
};

const StaffCallOrderList = ({ data, onModifyStaffCart, onDeleteStaffCart }: Props) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <StaffCallOrderCard onModifyStaffCart={onModifyStaffCart} onDeleteStaffCart={onDeleteStaffCart} orderInfo={item} />
      )}
      keyExtractor={(v, i) => v.optionName + i}
    />
  );
};

export default StaffCallOrderList;
