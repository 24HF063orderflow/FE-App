import React from "react";
import { StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";
import CustomModal from "../CustomModal";
import StaffCallOrderModalHead from "./StaffCallOrderModalHead";
import StaffCallOrderModalList from "./StaffCallOrderModalList";
import OrderButton from "../Order/OrderButton";

type Props = {
  visible: boolean;
  staffCartList: staffCartType[];
  onClose: () => void;
  clearStaffCart: () => void;
};

const StaffCallOrderCompleteModal = ({ visible, staffCartList, onClose, clearStaffCart }: Props) => {
  return (
    <CustomModal visible={visible} backgroundColor="#fff">
      <View style={styles.contentContainer}>
        <StaffCallOrderModalHead />
        <View style={styles.orderDetails}>
          <StaffCallOrderModalList staffCartList={staffCartList} />
        </View>
        <View style={styles.buttonContainer}>
          <OrderButton
            onPress={() => {
              onClose();
              clearStaffCart();
            }}
          >
            확인
          </OrderButton>
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

export default StaffCallOrderCompleteModal;
