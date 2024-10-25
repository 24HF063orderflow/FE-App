import React, { useState } from "react";
import { StyleSheet, View, Image, StatusBar, TouchableOpacity, Text, ImageBackground, TextInput, Alert } from "react-native";
import Checkbox from "expo-checkbox";

type screenType = "Login" | "CustomerSignUp";

type Props = {
  screenChange: (screen: screenType) => void;
};

const ManagerSignUp = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };

  const [isChecked, setChecked] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState<string>(""); // 인증 코드 입력 상태 저장
  const [businessType, setBusinessType] = useState<string>("");
  const [businessNumber, setBusinessNumber] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // 이메일 추가
  const [name, setName] = useState<string>(""); // 이름 추가
  const [password, setPassword] = useState<string>(""); // 비밀번호 추가

  // 이메일 인증 API 요청 함수
  const sendEmailVerification = async () => {
    try {
      const response = await fetch("http://13.124.22.36:8080/api/auth/phonecheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });
      console.log("????");
      const data = await response.json();

      if (response.ok) {
        Alert.alert("성공", data.message);
        setVerifyCode(data.verifyCode); // 서버에서 받은 인증 코드를 저장
      } else {
        Alert.alert("실패", data.message);
      }
    } catch (error) {
      Alert.alert("오류", "인증번호 전송 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 API 호출 함수
  const handleSignUp = async () => {
    try {
      const response = await fetch("http://13.124.22.36:8080/api/auth/signUp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          verifyCode,
          name,
          password,
          businessNumber
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("성공", "회원가입에 성공했습니다.");
        screenChange("Login"); // 로그인 화면으로 이동
      } else {
        Alert.alert("실패", data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "회원가입 중 오류가 발생했습니다.");
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
        <TouchableOpacity onPress={() => handlePress("Login")} style={styles.backBtn}>
          <Image
            source={require("../assets/images/backbutton.png")} // 뒤로가기 버튼 이미지 사용
            style={styles.backButtonImage}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "column", width: "40%", marginLeft: "30%", marginTop: "0%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>핸드폰 번호</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 0 }}>
            <View style={{ flexDirection: "column", marginTop: 3 }}>
              <TextInput
                style={styles.input}
                placeholder="핸드폰번호를 입력하시오"
                placeholderTextColor="gray"
                value={phone}
                onChangeText={setPhone} // 이메일 입력 상태 업데이트
              />
            </View>
            <View style={{ flexDirection: "column", marginTop: 3 }}>
              <TouchableOpacity style={styles.addButton} onPress={sendEmailVerification}>
                <Text style={styles.addButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.label}>인증번호</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <TextInput
              style={styles.input}
              placeholder="인증번호를 입력하세요"
              placeholderTextColor="gray"
              value={verifyCode} // 서버에서 받은 인증 코드 사용
              onChangeText={setVerifyCode}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.label}>이메일</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력하세요"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.label}>이름</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.label}>사업자 등록번호</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <TextInput
              style={styles.input}
              placeholder="사업자 등록번호를 입력하세요"
              placeholderTextColor="gray"
              value={businessNumber}
              onChangeText={setBusinessNumber}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 50 }}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? "#4630EB" : "white"} />

            <Text style={styles.checkboxText}>
              [필수] 개인(신용)정보 수집 · 이용에 동의합니다.{"\n"} 상담 및 등록 외 다른 목적으로 사용하지 않습니다.
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
            <TouchableOpacity
              onPress={handleSignUp} // 회원가입 버튼 누르면 API 호출
              style={styles.typeBtn}
            >
              <Image
                style={styles.buttonImage}
                source={{
                  uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/%EC%8B%A0%EC%B2%AD%ED%95%98%EA%B8%B0.png?raw=true"
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
  Logo: {
    width: 150,
    height: 50,
    resizeMode: "stretch"
  },
  label: {
    color: "white",
    fontSize: 16,
    fontFamily: "Typo_DodamM"
  },
  required: {
    color: "red",
    fontSize: 11
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 270,
    height: 35
  },
  addButton: {
    backgroundColor: "#b5a883",
    width: 70,
    height: 35,
    borderRadius: 10,
    alignItems: "center"
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    textAlign: "center"
  },
  checkbox: {
    width: 20,
    height: 20,
    marginTop: 0
  },
  checkboxText: {
    color: "#c2c2c2",
    fontSize: 11,
    marginLeft: 10,
    textAlign: "center"
  },
  typeBtn: {
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonImage: {
    width: 200,
    height: 30,
    overflow: "hidden",
    borderWidth: 3,
    resizeMode: "stretch"
  },
  backBtn: {
    position: "absolute", // 버튼을 고정 위치로 설정
    top: 30, // 화면 상단에서 30px 떨어지게 설정
    right: 20, // 화면 오른쪽에서 20px 떨어지게 설정
    zIndex: 1 // 버튼이 다른 컴포넌트 위에 나타나도록 설정
  },
  backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: "contain" // 이미지를 적절히 크기에 맞춰 조정
  }
});

export default ManagerSignUp;
