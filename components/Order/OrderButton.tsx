import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onPress: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const OrderButton = ({ onPress, disabled = false, children }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => (disabled ? [styles.button, styles.disabled] : pressed ? [styles.button, styles.pressed] : styles.button)}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={disabled ? [styles.buttonText, styles.disabledColor] : styles.buttonText}>{children}</Text>
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
  disabled: {
    backgroundColor: "gray"
  },
  buttonText: {
    fontSize: scale(12),
    fontWeight: "bold",
    color: "#000"
  },
  disabledColor: {
    color: "white"
  },
  pressed: {
    opacity: 0.75
  }
});

export default OrderButton;
