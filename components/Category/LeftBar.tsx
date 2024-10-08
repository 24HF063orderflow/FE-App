import React from "react";
import { View, StyleSheet } from "react-native";
import StaffCallButton from "../StaffCall/StaffCallButton";
import CategoryList from "./CategoryList";

type Props = {
  categoryList: categoryType[];
  onPressCategory: (index: number) => void;
  screenChange: (screen: screenType) => void;
};

const LeftBar = ({ categoryList, onPressCategory, screenChange }: Props) => {
  return (
    <View style={styles.sidebar}>
      <CategoryList data={categoryList} onPressCategory={onPressCategory} />
      <StaffCallButton
        onPress={() => {
          screenChange("StaffCallScreen");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: "20%",
    backgroundColor: "#3c3c3c",
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  menuContentContainer: {
    flexGrow: 1,
    alignContent: "center",
    justifyContent: "center"
  }
});

export default LeftBar;
