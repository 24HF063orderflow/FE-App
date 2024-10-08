import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, Linking, Platform } from "react-native";

type screenType = 'StartScreen' | 'Login' | 'MainScreen' | 'StaffCallScreen' | 'MusicRequestScreen' | 'FeedbackScreen' | 'ManagerMain' | 'CustomerSignUp' | 'ManagerSignUp' | 'ManagerLogin';

type Props = {
  screenChange: (screen: screenType) => void;
};

const Login = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };

  const handleCallPress = async () => {
    const phoneNumber = '01076294088';
    const url = Platform.select({
      ios: `tel:${phoneNumber}`,
      android: `tel:${phoneNumber}`,
    });

    try {
      if (url) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('전화 걸기에 실패했습니다:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/LoginBack.png?raw=true' }} 
        style={styles.fullScreenImage}
        resizeMode="cover"
      >
        {/* 요소들을 화면에 맞게 절대 위치로 설정 */}
        <View style={styles.overlay}>
          <View style={{ flexDirection: "row", justifyContent: 'center'}}>
              <Image style={styles.Logo} source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/LoginLogo.png?raw=true' }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => handlePress('ManagerLogin')} style={styles.typeBtn}>
              <Image style={styles.buttonImage} source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/Manager.png?raw=true' }} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={() => handlePress('CustomerSignUp')} style={styles.typeBtn}>
              <Image style={styles.buttonImage} source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/Customer.png?raw=true' }} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 10 }}>
            <View style={{ justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={() => handlePress('ManagerSignUp')} style={styles.textButton}>
                <Text style={styles.text}>가맹점 등록</Text>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', marginTop: 10, marginLeft: 5, marginRight: 5 }}>
              <Text style={styles.text}>|</Text>
            </View>

            <View style={{ justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={handleCallPress} style={styles.textButton}>
                <Text style={styles.text}>전화 상담하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',  // 배경 이미지 위에 요소를 덮을 수 있도록 설정
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  typeBtn: {
    alignItems: 'center',
  },
  buttonImage: {
    width: 400,
    height: 40,
    overflow: 'hidden',
    borderWidth: 3,
    resizeMode: 'stretch',
  },
  Logo: {
    width: 500,
    height: 200,
    resizeMode: 'stretch',
  },
  textButton: {
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default Login;