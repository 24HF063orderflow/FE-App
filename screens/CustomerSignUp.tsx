import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, StatusBar, TouchableOpacity, Text, ImageBackground, TextInput, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { storeData } from "../utils/storeData";

type screenType = "MainScreen" | "Login";

type Props = {
  screenChange: (screen: screenType) => void;
};

const CustomerSignUp = ({ screenChange }: Props) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannerVisible, setScannerVisible] = useState<boolean>(false); // 스캐너 보이기 상태 추가

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: any; data: string }) => {
    setScanned(true);
    setAuthCode(data);
    setScannerVisible(false); // 스캐너 비활성화
    Alert.alert("QR Code Scanned", `Scanned data: ${data}`);
  };

  const handlePress = async (screenName: screenType) => {
    try {
      const response = await fetch("http://13.124.22.36:8080/api/seats/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          authCode: authCode
        })
      })
        .then((response) => {
          if (response.ok) {
            Alert.alert("성공", "로그인에 성공했습니다.");
            screenChange(screenName);
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          storeData("tableNumber", data["TableNumber:"]);
          storeData("token", data["Token:"]);
        })
        .catch((error) => {
          Alert.alert("실패", "로그인에 실패했습니다.");
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <ImageBackground
        source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/LoginBack.png?raw=true" }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <TouchableOpacity onPress={() => screenChange("Login")} style={styles.backBtn}>
          <Image source={require("../assets/images/backbutton.png")} style={styles.backButtonImage} />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image style={styles.Logo} source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/LoginLogo.png?raw=true" }} />
        </View>

        <View style={{ flexDirection: "column", marginTop: 30, marginLeft: "30%", width: "40%" }}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={{ color: "white", fontSize: 18, fontFamily: "Typo_DodamM" }}>Auth Code</Text>
            <Text style={{ color: "red", fontSize: 32 }}> *</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 0 }}>
            <TextInput
              style={styles.input}
              placeholder="Auth Code를 입력하세요"
              placeholderTextColor="gray"
              value={authCode}
              onChangeText={setAuthCode}
              keyboardType="default"
            />
          </View>

          {/* QR 코드 스캐너 버튼 */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setScanned(false);
                setScannerVisible(true); // 스캐너 보이기
              }}
            >
              <Image
                style={styles.buttonImage2}
                source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/qr2.png?raw=true" }}
              />
            </TouchableOpacity>
          </View>

          {/* 신청하기 버튼 */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
            <TouchableOpacity onPress={() => handlePress("MainScreen")} style={styles.typeBtn}>
              <Image
                style={styles.buttonImage}
                source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/LoginButton.png?raw=true" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* QR 코드 스캐너 모달 */}
      {scannerVisible && hasPermission === true && (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullScreenImage: {
    width: "100%",
    height: "100%"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10
  },
  Logo: {
    width: 300,
    height: 100,
    resizeMode: "stretch"
  },
  typeBtn: {
    alignItems: "center"
  },
  buttonImage: {
    width: 350,
    height: 50,
    overflow: "hidden",
    borderWidth: 3,
    resizeMode: "stretch"
  },
  buttonImage2: {
    width: 100,
    height: 100,
    overflow: "hidden",
    resizeMode: "stretch"
  },
  backBtn: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1
  },
  backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  qrScanBtn: {
    backgroundColor: ""
  },
  qrScanBtnText: {
    color: "black",
    fontSize: 16
  }
});

export default CustomerSignUp;
