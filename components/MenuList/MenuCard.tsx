import React from "react";
import { Image, Text, StyleSheet, Pressable } from "react-native";
import { scale } from "react-native-size-matters";
import { addCart } from "../../utils/cart";

type Props = {
  menuInfo: menuInfoType;
  itemWidth: number;
  onAddCart: (item: cartType) => void;
  toggleCartVisibility: () => void;
};

const MenuCard = ({ menuInfo, itemWidth, onAddCart, toggleCartVisibility }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? [styles.card, { opacity: 0.75, width: itemWidth }] : [styles.card, { width: itemWidth }])}
      onPress={() => {
        onAddCart({ title: menuInfo.title, price: menuInfo.price, count: 1 });
        toggleCartVisibility();
      }}
    >
      <Image source={{ uri: menuInfo.img }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{menuInfo.title}</Text>
      <Text style={styles.cardPrice}>{menuInfo.price}원</Text>
      <Text style={styles.cardSubText}>{menuInfo.subText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    margin: scale(6)
  },
  cardImage: {
    width: "100%",
    height: scale(100),
    borderRadius: 10,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  cardPrice: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5
  },
  cardSubText: {
    fontSize: 12,
    color: "#888"
  }
});

export default MenuCard;
