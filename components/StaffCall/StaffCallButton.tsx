import { View, Text, StyleSheet, Pressable } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onPress: () => void;
};

const StaffCallButton = ({ onPress }: Props) => {
  return (
    <View style={{ marginTop: scale(10) }}>
      <View style={styles.button}>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>직원{"\n"}호출</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffd700",
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35), // 동그라미 모양
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden" // 버튼 경계 내에서 리플 효과를 유지
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  buttonText: {
    color: "#ffffff", // 텍스트 색상 흰색으로 변경
    fontSize: scale(20),
    fontWeight: "bold",
    textAlign: "center"
  },
  pressed: {
    opacity: 0.7 // 눌렀을 때 시각적 피드백
  }
});

export default StaffCallButton;
