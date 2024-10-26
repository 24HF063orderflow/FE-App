import React, { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onSelectPayment: () => void;
  children: ReactNode;
  uri: string;
};

const PaymentButton = ({ onSelectPayment, children, uri }: Props) => {
  return (
    <Pressable style={({ pressed }) => [styles.option, pressed && styles.pressed]} onPress={onSelectPayment}>
      <Image source={{ uri: uri }} style={styles.icon} />
      <Text style={styles.optionText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    alignItems: "center",
    width: "30%",
    height: scale(115),
    padding: scale(10),
    backgroundColor: "white",
    borderRadius: scale(10),
    elevation: 2,
    justifyContent: "center"
  },
  optionText: {
    marginTop: scale(10),
    fontSize: scale(10),
    fontWeight: "bold",
    textAlign: "center"
  },
  icon: {
    width: scale(70),
    height: scale(70)
  },
  pressed: {
    opacity: 0.9 // 눌렀을 때 시각적 피드백
  }
});

export default PaymentButton;
