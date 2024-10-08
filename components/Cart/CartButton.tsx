import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onPress?: () => void;
};

const CartButton = ({ onPress }: Props) => {
  return (
    <>
      <Pressable style={({ pressed }) => (pressed ? [styles.button, styles.pressed] : styles.button)} onPress={onPress}>
        <Text style={styles.buttonText}>장바구니</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: scale(20),
    bottom: scale(20),
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  },
  buttonText: {
    color: "white",
    fontSize: scale(12),
    fontWeight: "bold"
  },
  pressed: {
    opacity: 0.75
  }
});

export default CartButton;
