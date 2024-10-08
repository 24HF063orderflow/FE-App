import React, { ReactNode } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
  color: string;
  onPress: () => void;
};

const CallButton = ({ children, color, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.callButton, { backgroundColor: color, opacity: 0.75 }] : [styles.callButton, { backgroundColor: color }]
      }
      onPress={onPress}
    >
      <Text style={styles.callText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  callButton: {
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  callText: {
    color: "white",
    fontSize: 20
  }
});

export default CallButton;
