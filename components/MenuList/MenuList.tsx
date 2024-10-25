import React from "react";
import { SectionList, StyleSheet, useWindowDimensions, Text, View, Pressable } from "react-native";
import MenuCard from "./MenuCard";
import { scale } from "react-native-size-matters";

type Props = {
  sections: {
    title: string;
    data: menuInfoType[];
  }[];
  onAddCart: (item: cartType) => void;
  sectionListRef: React.RefObject<SectionList<any>>;
  toggleCartVisibility: () => void;
};

const MenuList = ({ sections, onAddCart, sectionListRef, toggleCartVisibility }: Props) => {
  const { width } = useWindowDimensions();
  const itemWidth = width / 4 - scale(14);

  // 각 섹션의 데이터(items)를 3개씩 그룹화합니다.
  const groupedSections = sections.map((section) => ({
    title: section.title,
    data: groupItems(section.data, 3) // 3개씩 그룹화
  }));

  return (
    <SectionList
      ref={sectionListRef}
      sections={groupedSections}
      keyExtractor={(item, index) => item.map((i: menuInfoType) => i.name + index || i.name).join("-") + index}
      renderItem={({ item }) => (
        <Pressable style={styles.row}>
          {item.map((menuInfo: menuInfoType) => (
            <MenuCard
              key={Math.random()}
              menuInfo={menuInfo}
              itemWidth={itemWidth}
              onAddCart={onAddCart}
              toggleCartVisibility={toggleCartVisibility}
            />
          ))}
        </Pressable>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Pressable style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </Pressable>
      )}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

// Helper function to group items into rows
const groupItems = (data: menuInfoType[], itemsPerRow: number): menuInfoType[][] => {
  const groupedItems: menuInfoType[][] = [];
  for (let i = 0; i < data.length; i += itemsPerRow) {
    groupedItems.push(data.slice(i, i + itemsPerRow));
  }
  return groupedItems;
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    padding: scale(6)
  },
  sectionHeader: {
    paddingVertical: scale(10),
    backgroundColor: "#f5f5f5"
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row"
  }
});

export default MenuList;
