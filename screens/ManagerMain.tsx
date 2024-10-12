import React from 'react';
import { StyleSheet, View, StatusBar, ImageBackground, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { scale } from "react-native-size-matters";
type screenType = 
  'AdminSettingsScreen' | 
  'TableManager' | 
  'OrderManagementScreen' | 
  'Sale' | 
  'Suggestions' | 
  'CategoryFoodManagementScreen' | 
  'Ad' | 
  'MusicRequestListScreen' |
  'Suggestions' |
  'Sale' |
  'OrderManagementScreen' |
  'CategoryFoodManagementScreen' |
  'ProductManagementScreen'|
  'Login';

type Props = {
  screenChange: (screen: screenType) => void;
};

const { width, height } = Dimensions.get('window');

const ManagerMain= ({ screenChange }: Props) => {
    const handlePress = (screenName: screenType) => {
      screenChange(screenName);
    };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <ImageBackground
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/back.png?raw=true' }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >               
      <TouchableOpacity
          onPress={() => handlePress('Login')}
          style={styles.backBtn}
      >
          <Image
              source={require('../assets/images/backbutton.png')}  // 뒤로가기 버튼 이미지 사용
              style={styles.backButtonImage}
          />
      </TouchableOpacity>

        <View style={{ width: '100%', height: '0%', marginTop: scale(40) }} />

        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => handlePress('AdminSettingsScreen')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/001.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => handlePress('TableManager')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/002.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
            <TouchableOpacity onPress={() => handlePress('Ad')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/009.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => handlePress('OrderManagementScreen')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/004.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => handlePress('Sale')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/005.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.textline}>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>설정</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>테이블 관리</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>광고관리</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>주문내역</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>매출관리</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => handlePress('Suggestions')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/006.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
            <TouchableOpacity onPress={() => handlePress('MusicRequestListScreen')} style={styles.typeBtn}>
                <ImageBackground
                  source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/music.png?raw=true' }}
                  style={styles.Icon}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
            <TouchableOpacity onPress={() => handlePress('ProductManagementScreen')} style={styles.typeBtn}>
              <ImageBackground
                source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/008.png?raw=true' }}
                style={styles.Icon}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            </View>
            <View style={styles.box}>

            </View>
            <View style={styles.box}>

            </View>
          </View>

          <View style={styles.textline}>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>고객의 소리</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>음악신청</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>상품관리</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
          </View>

          <View style={styles.textline}>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
            <View style={styles.texbox}>
              <Text style={styles.textfont}>?</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',  // 버튼을 고정 위치로 설정
    top: 20,  // 화면 상단에서 30px 떨어지게 설정
    right: 20,  // 화면 오른쪽에서 20px 떨어지게 설정
    zIndex: 1,  // 버튼이 다른 컴포넌트 위에 나타나도록 설정
},
backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',  // 이미지를 적절히 크기에 맞춰 조정
},
  container: {
    flex: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  Icon: {
    width: '95%',
    height: '95%',
    marginLeft: '5%',
    marginTop: '5%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textfont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: Dimensions.get('window').width > 500 ? 11 : 9,
    textAlign: 'center',
    fontFamily: 'Typo_DodamM',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  textline: {
    flexDirection: 'row',
    height: '5%',
    width: '100%',
    marginTop: '0.4%',
  },
  texbox: {
    width: scale(70),
    height: scale(70),
    marginLeft: '4%',
  },
  box: {
    width:  scale(70),
    height: scale(70),
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: '4%',
  },
});

export default ManagerMain;