import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Keyboard } from "react-native";
import { scale } from "react-native-size-matters";
import CustomModal from "../CustomModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  clearCart: () => void;
};

const PhoneNumberModal = ({ visible, onClose, clearCart }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSend = () => {
    // 핸드폰 번호 전송 로직을 여기서 처리
    console.log("Phone number sent:", phoneNumber);
    onClose();
    clearCart();
  };

  return (
    <CustomModal
      visible={visible}
      onClose={() => {
        if (!Keyboard.isVisible()) {
          onClose();
          clearCart();
        } else {
          Keyboard.dismiss();
        }
      }}
      onPress={Keyboard.dismiss}
      backgroundColor="#000"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.label}>
          핸드폰 번호 <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          inputMode="tel"
          placeholder="핸드폰 번호 입력"
          placeholderTextColor="#aaa"
          returnKeyType={"done"}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Pressable style={({ pressed }) => (pressed ? [styles.button, styles.pressed] : styles.button)} onPress={handleSend}>
          <Text style={styles.buttonText}>핸드폰으로 전송</Text>
        </Pressable>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: "90%",
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    alignItems: "center"
  },
  label: {
    fontSize: scale(16),
    marginBottom: scale(10),
    color: "#fff", // 흰색 텍스트로 설정
    alignSelf: "flex-start"
  },
  input: {
    width: "100%",
    height: scale(40),
    borderColor: "#fff", // 흰색 테두리
    borderWidth: 1,
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    marginBottom: scale(20),
    fontSize: scale(18),
    backgroundColor: "#fff", // 하얀색 배경색
    color: "#000" // 입력 텍스트는 검정색
  },
  button: {
    backgroundColor: "#FFD700", // 노란색 배경색
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(5),
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#fff" // 검정색 텍스트 색상
  },
  pressed: {
    opacity: 0.75
  }
});

export default PhoneNumberModal;
