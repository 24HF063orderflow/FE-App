import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, StatusBar, TouchableOpacity, Text, ImageBackground, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

type screenType = 'MainScreen' | 'Login';

type Props = {
    screenChange: (screen: screenType) => void;
};

const CustomerSignUp = ({ screenChange }: Props) => {
    const [authCode, setAuthCode] = useState<string>(''); // 인증 코드 상태 추가
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);  
    const [scanned, setScanned] = useState<boolean>(false);  
    const [scannerVisible, setScannerVisible] = useState<boolean>(false); 

    useEffect(() => {
        const requestCameraPermission = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        requestCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: any; data: string }) => {
        setScanned(true);
        setAuthCode(data); // 인증 코드를 QR 코드 데이터로 설정
        setScannerVisible(false);  
        Alert.alert('QR Code Scanned', `Scanned data: ${data}`);
    };
    const handlePress = async (screenName: screenType) => {
        if (!authCode) {
            Alert.alert('Error', '인증 코드를 입력해주세요.');
            return;
        }
    
        // 인증 API 호출
        try {
            const response = await fetch('http://192.168.0.191:8080/api/seats/activate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify({ authCode })
            });
    
            // 응답 상태와 메시지를 로깅
            console.log('Response Status:', response.status);
            const result = await response.json();
            console.log('Response Body:', result);
    
            // 응답 객체에서 "Token:" 대신 "Token"으로 키 접근
            if (response.ok && result['Token:']) {
                // JWT 토큰 저장
                await AsyncStorage.setItem('userToken', result['Token:']);
                Alert.alert('Success', '테이블 연결 성공');
                screenChange('MainScreen'); // 메인 화면으로 이동
            } else {
                // 서버로부터 받은 에러 메시지 출력
                Alert.alert('Error', result.message || '인증에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error: any) {
            // 타입을 any로 캐스팅하여 메시지 접근
            console.error('Error occurred:', error);
            Alert.alert('Error', `서버와의 연결에 문제가 발생했습니다: ${error.message || error.toString()}`);
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

                <View style={{ flexDirection: "column", marginTop: 30, marginLeft: '30%', width: '40%' }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Typo_DodamM' }}>테이블 인증코드</Text>
                        <Text style={{ color: 'red', fontSize: 32 }}> *</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                        <TextInput 
                            style={styles.input}
                            placeholder="테이블 인증코드를 입력하세요"
                            placeholderTextColor="gray"
                            value={authCode}  
                            onChangeText={setAuthCode}  
                            keyboardType="default" 
                        />
                    </View>

                    {/* QR 코드 스캐너 버튼 */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setScanned(false);  
                                setScannerVisible(true);  
                            }}
                        >
                            <Image style={styles.buttonImage2} source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/qr2.png?raw=true' }} />
                        </TouchableOpacity>
                    </View>
                    
                    {/* 신청하기 버튼 */}
                    <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={() => handlePress('MainScreen')}
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

            {/* QR 코드 스캐너 모달 */}
            {scannerVisible && hasPermission === true && (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
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
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },  
    Logo: {
        width: 300,
        height: 100,
        resizeMode: 'stretch',
    },
    typeBtn: {
        alignItems: 'center',
    },
    buttonImage: {
        width: 350,
        height: 50,
        overflow: 'hidden',
        borderWidth: 3,
        resizeMode: 'stretch',
    },
    buttonImage2: {
      width: 100,
      height: 100,
      overflow: 'hidden',
      resizeMode: 'stretch',
  },
    backBtn: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 1,
    },
    backButtonImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
});

export default CustomerSignUp;
