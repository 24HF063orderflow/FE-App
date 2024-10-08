import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onPress: () => void;
  children: ReactNode;
};

const OrderButton = ({ onPress, children }: Props) => {
  return (
    <Pressable style={({ pressed }) => (pressed ? [styles.button, styles.pressed] : styles.button)} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#FFD700",
    paddingVertical: scale(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(5),
    marginHorizontal: scale(5)
  },
  buttonText: {
    fontSize: scale(12),
    fontWeight: "bold",
    color: "#000"
  },
  pressed: {
    opacity: 0.75
  }
});

export default OrderButton;
