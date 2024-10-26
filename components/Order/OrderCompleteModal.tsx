import React from "react";
import { StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";
import CustomModal from "../CustomModal";
import OrderModalHead from "./OrderModalHead";
import OrderModalList from "./OrderModalList";
import OrderButton from "./OrderButton";

type Props = {
  orderList: cartType[];
  paymentComplete: boolean;
  visible: boolean;
  onPayment: () => void;
  onClose: () => void;
  togglePaymentComplete: () => void;
  toggleReceiptVisible: () => void;
  clearCart: () => void;
};

const OrderCompleteModal = ({
  orderList,
  paymentComplete,
  visible,
  onPayment,
  onClose,
  togglePaymentComplete,
  toggleReceiptVisible,
  clearCart
}: Props) => {
  return (
    <CustomModal
      visible={visible}
      backgroundColor="#fff"
      onClose={() => {
        if (paymentComplete) {
          onClose();
          clearCart();
          togglePaymentComplete();
        }
      }}
    >
      <View style={styles.contentContainer}>
        <OrderModalHead paymentComplete={paymentComplete} />
        <View style={styles.orderDetails}>
          <OrderModalList orderList={orderList} />
        </View>
        <View style={styles.buttonContainer}>
          {!paymentComplete ? (
            <>
              <OrderButton
                onPress={() => {
                  onPayment();
                  onClose();
                }}
              >
                선불 결제
              </OrderButton>
              <OrderButton
                onPress={() => {
                  onClose();
                  clearCart();
                }}
                disabled
              >
                후불 결제
              </OrderButton>
            </>
          ) : (
            <OrderButton
              onPress={() => {
                onClose();
                togglePaymentComplete();
                // toggleReceiptVisible();
              }}
            >
              영수증
            </OrderButton>
          )}
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10)
  },

  orderDetails: {
    width: "100%",
    marginTop: scale(10),
    marginBottom: scale(10),
    height: scale(150),
    justifyContent: "space-between"
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default OrderCompleteModal;
