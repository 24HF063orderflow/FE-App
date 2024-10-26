import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { scale } from "react-native-size-matters";
import PaymentButton from "./PaymentButton";
import CustomModal from "../CustomModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onOrder: () => void;
  onSelectPayment: (method: string) => void;
};

const PaymentModal = ({ visible, onClose, onOrder, onSelectPayment }: Props) => {
  return (
    <CustomModal
      visible={visible}
      onClose={() => {
        onClose();
        onOrder();
      }}
      backgroundColor="#787878"
    >
      <View>
        <Text style={styles.title}>Choose Payment Method</Text>
        <View style={styles.optionsContainer}>
          <PaymentButton uri="https://via.placeholder.com/150" onSelectPayment={() => onSelectPayment("CARD")}>
            PAY IN CARD
          </PaymentButton>
          <PaymentButton uri="https://via.placeholder.com/150" onSelectPayment={() => onSelectPayment("CASH")}>
            PAY IN CASH
          </PaymentButton>
          <PaymentButton uri="https://via.placeholder.com/150" onSelectPayment={() => onSelectPayment("KAKAOPAY ")}>
            PAY IN KAKAO
          </PaymentButton>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    fontSize: scale(18),
    fontWeight: "bold",
    textAlign: "center",
    top: scale(-40),
    left: "22.5%",
    color: "#FFD700"
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(30)
  }
});

export default PaymentModal;
