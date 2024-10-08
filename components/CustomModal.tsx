import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  visible: boolean;
  onClose?: () => void;
  onPress?: () => void;
  backgroundColor: string;
  children: React.ReactNode;
};

const CustomModal = ({ visible, onClose, onPress, backgroundColor, children }: Props) => {
  if (!visible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onPress}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.modalContainer, { backgroundColor: backgroundColor }]}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000 // 다른 UI 요소들 위에 표시되도록 함
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  modalContainer: {
    width: "80%", // 모달 너비를 화면의 80%로 설정
    height: "80%", // 모달 높이를 화면의 60%로 설정
    padding: scale(20), // 패딩을 추가하여 내부 콘텐츠와 여백을 유지
    borderRadius: 10,
    elevation: 10,
    zIndex: 1001, // 모달 내용이 배경보다 위에 표시되도록 함
    justifyContent: "center", // 내부 콘텐츠를 수직 중앙 정렬
    alignItems: "center" // 내부 콘텐츠를 수평 중앙 정렬
  }
});

export default CustomModal;
