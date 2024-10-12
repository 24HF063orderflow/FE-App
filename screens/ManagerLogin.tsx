import React, { useState } from 'react';
import { StyleSheet, View, Image, StatusBar, TouchableOpacity, Text, ImageBackground, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // 추가
import axios from 'axios';  // axios 사용
import { scale } from "react-native-size-matters";

type screenType = 'ManagerMain' | 'Login';

type Props = {
    screenChange: (screen: screenType) => void;
};

const ManagerLogin = ({ screenChange }: Props) => {
    const [email, setEmail] = useState<string>('');  
    const [password, setPassword] = useState<string>(''); 

    const handlePress = async () => {
        try {
            const response = await axios.post('http://192.168.0.191:8080/api/login', {
                email,
                password,
            });
            
            if (response.data.status === 'Success') {
                // JWT 토큰 저장
                await AsyncStorage.setItem('jwtToken', response.data.token);
                Alert.alert('로그인 성공', '로그인 성공하였습니다.');
                screenChange('ManagerMain');  // 로그인 성공 후 화면 이동
            } else {
                Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            Alert.alert('오류 발생', '로그인 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ImageBackground 
                source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/LoginBack.png?raw=true' }}  
                style={styles.fullScreenImage}
                resizeMode="stretch"
            > 
                <TouchableOpacity
                    onPress={() => screenChange('Login')}
                    style={styles.backBtn}
                >
                    <Image
                        source={require('../assets/images/backbutton.png')}  
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: 'center'}}>
                    <Image style={styles.Logo} source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/LoginLogo.png?raw=true' }} />
                </View>

                <View style={{ flexDirection: "column", marginTop: scale(30), marginLeft: '30%', width: '40%' }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: 'white', fontSize: scale(11), fontFamily: 'Typo_DodamM' }}>이메일</Text>
                        <Text style={{ color: 'red', fontSize: scale(18) }}> *</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                        <TextInput 
                            style={styles.input}
                            placeholder="이메일을 입력하세요"
                            placeholderTextColor="gray"
                            value={email}  
                            onChangeText={setEmail}  
                            keyboardType="email-address" 
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop:scale(10) }}>
                        <Text style={{ color: 'white', fontSize: scale(11), fontFamily: 'Typo_DodamM' }}>비밀번호</Text>
                        <Text style={{ color: 'red', fontSize: scale(18) }}> *</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                        <TextInput 
                            style={styles.input}
                            placeholder="비밀번호를 입력하세요"
                            placeholderTextColor="gray"
                            value={password}  
                            onChangeText={setPassword}  
                            secureTextEntry 
                        />
                    </View>
                    
                    <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: scale(10) }}>
                        <TouchableOpacity
                            onPress={handlePress}
                            style={styles.typeBtn}
                        >
                            <Image
                                style={styles.buttonImage}
                                source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/LoginButton.png?raw=true' }}
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
        flex: 1,  // View 전체를 차지하게 만듭니다
    },
    fullScreenImage: {
        width: '100%',  // 화면의 너비를 100%로 설정
        height: '100%',  // 화면의 높이를 100%로 설정
    },
    input: {
        flex: 1,
        borderWidth: scale(0),
        borderColor: 'gray',
        backgroundColor: 'white',
        width: scale(200),
        height: scale(30),
        borderRadius: 10,
    },  
    Logo: {
        width: scale(300),
        height: scale(100),
        resizeMode: 'stretch',
    },
    typeBtn: {
        alignItems: 'center',
    },
    buttonImage: {
        width: scale(190),
        height: scale(40),
        overflow: 'hidden',
        borderWidth: 3,
        resizeMode: 'stretch',
    },
    backBtn: {
        position: 'absolute',  // 버튼을 고정 위치로 설정
        top: 30,  // 화면 상단에서 30px 떨어지게 설정
        right: 20,  // 화면 오른쪽에서 20px 떨어지게 설정
        zIndex: 1,  // 버튼이 다른 컴포넌트 위에 나타나도록 설정
    },
    backButtonImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',  // 이미지를 적절히 크기에 맞춰 조정
    },
});

export default ManagerLogin;
