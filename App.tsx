import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import StartScreen from "./screens/StartScreen";
import MainScreen from "./screens/MainScreen"; // 기존 코드
import Login from "./screens/Login"; // Login 컴포넌트 import
import * as ScreenOrientation from "expo-screen-orientation";
import StaffCallScreen from "./screens/StaffCallScreen";
import MusicRequestScreen from "./screens/MusicRequestScreen";
import { FeedbackScreen } from "./screens/FeedbackScreen";
import ManagerSignUp from "./screens/ManagerSinUp";
import CustomerSignUp from "./screens/CustomerSignUp";
import ManagerMain from "./screens/ManagerMain";
import MusicRequestListScreen from "./screens/MusicRequestListScreen";
import Ad from "./screens/Ad";
import AdminSettingsScreen from "./screens/AdminSettingScreen";
import TableManager from "./screens/TableManager";
import Suggestions from "./screens/Suggestions";
import Sale from "./screens/Sale";
import OrderManagementScreen from "./screens/OrderManagementScreen";
import CategoryFoodManagementScreen from "./screens/CategoryFoodManagementScreen";
import ProductManagementScreen from "./screens/ProductManagementScreen";
import ManagerLogin from "./screens/ManagerLogin";
import OptionManagementScreen from "./screens/OptionManagementScreen";

export default function App() {
  const [isIdle, setIsIdle] = useState(true); // 초기 화면을 StartScreen으로 설정
  const [screen, setScreen] = useState<screenType>("Login" as screenType); // 초기 화면을 Login으로 설정

  const idleTimer = useRef<NodeJS.Timeout | null>(null); // useRef를 사용해 타이머 참조 관리

  const handleScreen = (screen: screenType) => {
    setScreen(screen);
  };

  const screenComponents = {
    StartScreen: StartScreen,
    Login: Login, // Login 컴포넌트 추가
    MainScreen: MainScreen,
    StaffCallScreen: StaffCallScreen,
    MusicRequestScreen: MusicRequestScreen,
    FeedbackScreen: FeedbackScreen,
    ManagerSignUp: ManagerSignUp,
    CustomerSignUp: CustomerSignUp,
    ManagerMain: ManagerMain,
    MusicRequestListScreen: MusicRequestListScreen,
    Ad: Ad,
    AdminSettingsScreen: AdminSettingsScreen,
    TableManager: TableManager,
    Suggestions: Suggestions,
    Sale: Sale,
    OrderManagementScreen: OrderManagementScreen,
    CategoryFoodManagementScreen: CategoryFoodManagementScreen,
    ProductManagementScreen: ProductManagementScreen,
    ManagerLogin: ManagerLogin,
    OptionManagementScreen: OptionManagementScreen,

  };

  useEffect(() => {
    // 가로 모드 고정
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current); // 컴포넌트가 unmount될 때 타이머 해제
      }
    };
  }, []);

  const resetIdleTimer = () => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current); // 기존 타이머 초기화
    }
    idleTimer.current = setTimeout(() => {
      setIsIdle(true);
      handleScreen("Login" as screenType);
    }, 1000000); // 10000ms = 10초
  };

  const handleTouch = () => {
    setIsIdle(false); // 상호작용이 있으므로 idle 상태 해제
    resetIdleTimer(); // 타이머 리셋
    console.log(screen, "터치", isIdle, idleTimer.current);
  };

  const ActiveScreen = isIdle ? screenComponents["StartScreen"] : screenComponents[screen];

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container} onTouchStart={handleTouch} onResponderMove={handleTouch} onStartShouldSetResponder={() => true}>
        <ActiveScreen screenChange={handleScreen} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});