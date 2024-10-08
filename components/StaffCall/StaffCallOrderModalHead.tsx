import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {};

const StaffCallOrderModalHead = ({}: Props) => {
  return (
    <>
      <Text style={styles.orderNumber}>NO.03</Text>
      <Text style={styles.message}>주문이 완료되었습니다.</Text>
      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>주문 내역</Text>
    </>
  );
};

const styles = StyleSheet.create({
  orderNumber: {
    fontSize: scale(12),
    fontWeight: "bold"
  },
  message: {
    fontSize: scale(10)
  },
  divider: {
    width: "100%",
    height: scale(1),
    backgroundColor: "#ddd",
    marginVertical: scale(5)
  },
  sectionTitle: {
    fontSize: scale(10),
    fontWeight: "bold"
  }
});

export default StaffCallOrderModalHead;
