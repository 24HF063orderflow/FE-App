import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, StatusBar, ImageBackground, Image, Alert } from "react-native";
import Draggable from "react-native-draggable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { scale } from "react-native-size-matters";

interface Table {
  id: number;
  name: string;
  authCode: string;
  qrUrl: string;
  x: number;
  y: number;
  checked?: boolean;
}

type screenType = "ManagerMain";

type Props = {
  screenChange: (screen: screenType) => void;
};

const TableManager = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };

  const [tables, setTables] = useState<Table[]>([]);
  const [tableCount, setTableCount] = useState<number>(0);
  const [isMoveMode, setIsMoveMode] = useState<boolean>(false);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState<boolean>(false);
  const [qrCodeURL, setQRCodeURL] = useState<string>("");
  const [ownerId, setOwnerId] = useState<number | null>(null); // ownerId 상태 추가

  const tableAreaWidth = Dimensions.get("window").width - 40;
  const tableAreaHeight = Dimensions.get("window").height - 240;

  // JWT 토큰에서 ownerId를 가져오는 함수
  const getOwnerIdFromJWT = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      console.log("토큰", token);
      if (token) {
        // 토큰에서 id 추출
        const decoded: { id: number } = jwtDecode(token); // 토큰 디코딩
        const userId = decoded.id;
        setOwnerId(userId);
      }
    } catch (error) {
      console.error("JWT 디코딩 에러:", error);
    }
  };

  // 초기화 작업
  useEffect(() => {
    getOwnerIdFromJWT();
    fetchTables();
  }, [ownerId]);
  // 테이블 정보 불러오기
  const fetchTables = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token && ownerId) {
        const response = await axios.get(`http://13.124.22.36:8080/api/table/manage/${ownerId}/seats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("API 응답:", response); // 전체 응답 확인
        console.log("API 응답 데이터:", response.data); // 응답의 데이터 부분만 확인

        // 응답 데이터가 배열인지 확인
        if (Array.isArray(response.data)) {
          const formattedTables = response.data.map((table) => ({
            id: table.id,
            name: `Table ${table.tableNumber}`,
            authCode: table.authCode,
            qrUrl: table.qrUrl,
            x: table.x,
            y: table.y
          }));
          setTables(formattedTables); // 테이블 정보를 state에 저장
        } else {
          console.error("API 응답 데이터가 배열이 아닙니다:", response.data);
          setTables([]); // 배열이 아닐 경우 빈 배열로 초기화
        }
      }
    } catch (error) {
      console.error("테이블 정보를 불러오지 못했습니다:", error);
    }
  };

  // 테이블 추가 함수
  const addTable = async () => {
    const margin = 20;
    const tableSize = 100;

    let initialX = 0;
    let initialY = 0;

    if (tables.length > 0) {
      // 마지막 테이블의 좌표를 기준으로 옆에 배치
      const lastTable = tables[tables.length - 1];
      initialX = lastTable.x + tableSize + margin;
      initialY = lastTable.y;

      // 만약 테이블이 화면 밖으로 나가면, 다음 줄로 이동
      if (initialX + tableSize > tableAreaWidth) {
        initialX = 0;
        initialY += tableSize + margin;
      }
    }

    // 현재 테이블 목록에서 가장 큰 번호를 찾고, 그 다음 번호로 설정
    const nextTableNumber = tables.length > 0 ? Math.max(...tables.map((table) => parseInt(table.name.split(" ")[1]))) + 1 : 1;

    if (!ownerId) return;

    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        const response = await axios.post(`http://13.124.22.36:8080/api/table/manage/${ownerId}/addSeat`, null, {
          params: {
            x: initialX,
            y: initialY
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const newTable = {
          id: response.data.id,
          name: `Table ${nextTableNumber}`, // 테이블 번호 설정
          authCode: response.data.authCode,
          qrUrl: response.data.qrUrl,
          x: initialX,
          y: initialY
        };
        setTables([...tables, newTable]);
        setTableCount(tableCount + 1);
      }
    } catch (error) {
      console.error("테이블을 추가하지 못했습니다:", error);
    }
  };

  // 테이블 삭제 함수
  const removeTable = async (id: number) => {
    Alert.alert("삭제 확인", "정말로 이 테이블을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (token && ownerId) {
              await axios.delete(`http://13.124.22.36:8080/api/table/manage/${ownerId}/delete-seat/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              setTables(tables.filter((table) => table.id !== id));
            }
          } catch (error) {
            console.error("테이블을 삭제하지 못했습니다:", error);
          }
        }
      }
    ]);
  };

  // 테이블 위치 업데이트 함수
  const updateTablePosition = async (id: number, x: number, y: number) => {
    if (!ownerId) return;

    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        await axios.put(`http://13.124.22.36:8080/api/table/manage/${ownerId}/move-seat/${id}`, null, {
          params: {
            x: x,
            y: y
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // 좌표 업데이트가 성공하면 클라이언트 쪽에서도 테이블 위치를 업데이트
        setTables((prevTables) => prevTables.map((table) => (table.id === id ? { ...table, x, y } : table)));
      }
    } catch (error) {
      console.error("테이블 위치를 업데이트하지 못했습니다:", error);
    }
  };
  // QR 코드 보기 함수
  const showQRCode = (qrUrl: string) => {
    setQRCodeURL(qrUrl);
    setIsQRCodeVisible(true);
  };

  // QR 코드 닫기 함수
  const hideQRCode = () => {
    setIsQRCodeVisible(false);
    setQRCodeURL("");
  };

  // 토큰 보기 함수
  const showToken = (authCode: string) => {
    Alert.alert("토큰", authCode, [{ text: "확인", style: "cancel" }]);
  };

  // 이동 모드 토글 함수
  const toggleMoveMode = () => {
    setIsMoveMode(!isMoveMode);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true" }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <TouchableOpacity onPress={() => handlePress("ManagerMain")} style={styles.backBtn}>
          <Image
            source={require("../assets/images/backbutton.png")} // 뒤로가기 버튼 이미지 사용
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <View style={{ width: "100%", height: "17%", flexDirection: "row" }}>
          <View style={{ width: "15%", height: "80%", flexDirection: "row" }}>
            <ImageBackground
              source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/logo.png?raw=true" }}
              style={styles.fullScreenImage}
              resizeMode="stretch"
            />
          </View>
        </View>
        <View style={{ width: "100%", height: "85%", flexDirection: "row" }}>
          <View style={{ width: "80%", height: "100%", flexDirection: "column" }}>
            <View style={styles.tableArea}>
              {tables.map((table) => (
                <Draggable
                  key={table.id}
                  x={table.x}
                  y={table.y}
                  disabled={!isMoveMode}
                  onDragRelease={(e, gestureState) => {
                    const newX = gestureState.moveX - 50; // X 좌표
                    const newY = gestureState.moveY - 50; // Y 좌표
                    console.log("이동 후 좌표:", { newX, newY });

                    updateTablePosition(table.id, newX, newY); // 테이블 위치 업데이트
                  }}
                >
                  <View style={[styles.table, table.checked && styles.checkedTable]}>
                    <Text style={styles.tableText}>{table.name}</Text>
                    <TouchableOpacity style={styles.tableButton} onPress={() => showToken(table.authCode)}>
                      <Text style={styles.buttonText}>토큰 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tableButton} onPress={() => showQRCode(table.qrUrl)}>
                      <Text style={styles.buttonText}>QR 코드 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tableButton} onPress={() => removeTable(table.id)}>
                      <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>
                  </View>
                </Draggable>
              ))}
            </View>
          </View>
          <View style={{ width: "20%", height: "100%", flexDirection: "column" }}>
            <View style={{ width: "100%", height: "20%", flexDirection: "column" }}>
              <TouchableOpacity style={styles.addButton} onPress={addTable}>
                <Text style={styles.addButtonText}>테이블 추가</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: "20%", marginTop: "1%", flexDirection: "column" }}>
              <TouchableOpacity style={styles.addButton} onPress={toggleMoveMode}>
                <Text style={styles.addButtonText}>{isMoveMode ? "테이블 이동종료" : "테이블 이동"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      {isQRCodeVisible && (
        <View style={styles.qrCodeOverlay}>
          {qrCodeURL ? (
            <Image
              source={{ uri: qrCodeURL }}
              style={styles.qrCodeImage}
              resizeMode="contain"
              onLoad={() => console.log("QR 코드 로드 완료")}
              onError={(error) => {
                console.error("QR Code image loading error", error.nativeEvent);
                Alert.alert("Error", "QR 코드를 불러오지 못했습니다.");
              }}
            />
          ) : (
            <Text>로딩 중...</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={hideQRCode}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  fullScreenImage: {
    width: "100%",
    height: "100%"
  },
  addButton: {
    backgroundColor: "#b5a883",
    width: "100%",
    height: scale(50),
    borderRadius: 10,
    alignItems: "center"
  },
  addButtonText: {
    color: "white",
    fontSize: scale(18),
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    textAlign: "center"
  },
  tableArea: {
    flex: 1,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#EEEEEE",
    opacity: 0.9
  },
  table: {
    width: 150,
    height: 150,
    backgroundColor: "#ffe071",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  },
  tableText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  tableButton: {
    backgroundColor: "#607D8B",
    padding: 5,
    borderRadius: 5,
    marginVertical: 2,
    width: "70%",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 12
  },
  qrCodeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
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
  qrCodeImage: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: "#b5a883",
    padding: 10,
    borderRadius: 5
  },
  closeButtonText: {
    color: "white",
    fontSize: 16
  },
  checkedTable: {
    backgroundColor: "red"
  }
});

export default TableManager;
