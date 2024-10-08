import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";

export default function StartScreen() {
  // 애니메이션 값 초기화
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 색상 애니메이션 실행
    const animateColor = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
          }),
          Animated.timing(colorAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
          })
        ])
      ).start();
    };

    animateColor();
  }, [colorAnim]);

  // 색상 interpolate 설정
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#414141", "#d0cdcd"]
  });

  return (
    <View style={styles.main}>

        <Image style={styles.mainImage} source={require("../assets/images/LoginLogo.png")} />
        <Animated.Text style={[styles.mainText, { color: backgroundColor }]}>Please touch the screen</Animated.Text>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717"
  },
  mainImage: {
    height: "60%",
    resizeMode: "contain"
  },
  mainText: {
    fontSize: scale(22), // 화면 크기에 따라 비례하여 폰트 크기 설정
    marginTop: scale(10)
  }
});
