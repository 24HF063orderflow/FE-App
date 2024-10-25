import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CategoryButton from "./CategoryButton";

type Props = {
  data: categoryType[];
  onPressCategory: (categoryName: number) => void;
};

const CategoryList = ({ data, onPressCategory }: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.menuContentContainer}
      data={data}
      renderItem={({ item, index }) => (
        <CategoryButton
          color="#00ff0000"
          onPress={() => onPressCategory(index)} // 카테고리 버튼을 누를 때 해당 섹션으로 이동
        >
          {item}
        </CategoryButton>
      )}
      keyExtractor={(item, index) => index.toString() || item}
    />
  );
};

const styles = StyleSheet.create({
  menuContentContainer: {
    flexGrow: 1, // 컨텐츠가 중앙에 위치하도록 설정
    alignContent: "center",
    justifyContent: "center" // 중앙 정렬
  }
});

export default CategoryList;
