import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  id: number;
  title: string;
  onAddStaffCart: (item: staffCartType) => void;
};

const StaffCallMenuCard = ({ id, title, onAddStaffCart }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? [styles.card, { opacity: 0.75 }] : styles.card)}
      onPress={() => {
        onAddStaffCart({ id, optionName: title, count: 1 });
      }}
    >
      <Text style={styles.cardTitle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "28%",
    height: scale(60),
    backgroundColor: "#b5a883",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: scale(5)
  },
  cardTitle: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginBottom: 5,
    color: "white"
  }
});

export default StaffCallMenuCard;
