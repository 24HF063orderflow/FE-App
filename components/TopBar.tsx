import React from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  homeButtonVisible: boolean;
  screenChange: (screen: screenType) => void;
};

const TopBar = ({ homeButtonVisible, screenChange }: Props) => {
  return (
    <View style={styles.topBar}>
      <Image source={require("../assets/images/MainImage.png")} style={styles.logo} />
      <View style={styles.topBarMenu}>
        {homeButtonVisible && (
          <Pressable
            onPress={() => {
              screenChange("MainScreen");
            }}
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
          >
            <Image source={require("../assets/images/HomeImage.png")} style={styles.homeLogo} />
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            screenChange("MusicRequestScreen");
          }}
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
        >
          <Text style={styles.topBarText}>노래 신청</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            screenChange("FeedbackScreen");
          }}
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
        >
          <Text style={styles.topBarText}>고객의 소리</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginLeft: scale(35),
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  homeLogo: {
    width: 60,
    height: 60,
    resizeMode: "cover"
  },
  topBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3c3c3c",
    alignItems: "center"
  },
  topBarMenu: {
    flexDirection: "row",
    marginRight: scale(25),
    alignItems: "center"
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: "white"
  }
});

export default TopBar;
