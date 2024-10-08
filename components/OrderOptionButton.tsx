import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onPress?: () => void;
  children: ReactNode;
  customStyle: {
    fontSize: number;
    padding: number;
    backgroundColor: string;
    fontColor: string;
  };
};

const OrderOptionButton = ({ onPress, children, customStyle }: Props) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [
              styles.controlButton,
              styles.pressed,
              {
                paddingHorizontal: customStyle.padding,
                paddingVertical: customStyle.padding / 2,
                backgroundColor: customStyle.backgroundColor
              }
            ]
          : [
              styles.controlButton,
              {
                paddingHorizontal: customStyle.padding,
                paddingVertical: customStyle.padding / 2,
                backgroundColor: customStyle.backgroundColor
              }
            ]
      }
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: customStyle.fontSize,
          color: customStyle.fontColor
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  controlButton: {
    borderRadius: scale(5),
    marginHorizontal: scale(5)
  },
  pressed: {
    opacity: 0.75
  }
});

export default OrderOptionButton;
