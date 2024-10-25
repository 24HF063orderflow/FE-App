import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type screenType = "ManagerMain";

interface OptionData {
  id: string;
  optionName: string;
}

type Props = {
  screenChange: (screen: screenType) => void;
};

const OptionManagementScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };
  const [options, setOptions] = useState<OptionData[]>([]);
  const [newOptionName, setNewOptionName] = useState<string>("");
  const [ownerId, setOwnerId] = useState<number | null>(null);

  useEffect(() => {
    // JWT 토큰에서 ownerId를 가져오는 함수
    const getOwnerIdFromJWT = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          // 토큰에서 id 추출
          const decoded: { id: number } = jwtDecode(token);
          setOwnerId(decoded.id);
        }
      } catch (error) {
        console.error("JWT 디코딩 에러:", error);
      }
    };

    getOwnerIdFromJWT();
  }, []);

  useEffect(() => {
    if (ownerId !== null) {
      loadOptions();
    }
  }, [ownerId]);

  // 옵션 리스트 불러오기
  const loadOptions = async () => {
    try {
      const response = await axios.get(`http://13.124.22.36:8080/api/options/list/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("jwtToken")}`,
          accept: "*/*"
        }
      });
      setOptions(response.data);
    } catch (error) {
      console.error("옵션 리스트 불러오기 에러:", error);
    }
  };

  // 옵션 추가하기
  const addOption = async () => {
    if (!newOptionName.trim()) {
      return;
    }
    try {
      await axios.post(
        `http://13.124.22.36:8080/api/options/add?ownerId=${ownerId}&optionName=${encodeURIComponent(newOptionName)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("jwtToken")}`,
            accept: "*/*"
          }
        }
      );
      setNewOptionName("");
      loadOptions();
    } catch (error) {
      console.error("옵션 추가 에러:", error);
    }
  };

  // 옵션 삭제하기
  const deleteOption = async (optionId: string) => {
    try {
      await axios.delete(`http://13.124.22.36:8080/api/options/delete/${optionId}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("jwtToken")}`,
          accept: "*/*"
        }
      });
      loadOptions();
    } catch (error) {
      console.error("옵션 삭제 에러:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress("ManagerMain")} style={styles.backBtn}>
        <Image
          source={require("../assets/images/backbutton.png")} // 뒤로가기 버튼 이미지 사용
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>옵션 관리</Text>
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>{item.optionName}</Text>
            <TouchableOpacity onPress={() => deleteOption(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addOptionContainer}>
        <TextInput value={newOptionName} onChangeText={setNewOptionName} placeholder="새 옵션 이름" style={styles.input} />
        <TouchableOpacity onPress={addOption} style={styles.addButton}>
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute", // 버튼을 고정 위치로 설정
    top: 20, // 화면 상단에서 30px 떨어지게 설정
    right: 20, // 화면 오른쪽에서 20px 떨어지게 설정
    zIndex: 1 // 버튼이 다른 컴포넌트 위에 나타나도록 설정
  },
  backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: "contain" // 이미지를 적절히 크기에 맞춰 조정
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    marginVertical: 5,
    borderRadius: 5
  },
  optionText: {
    fontSize: 18
  },
  deleteButton: {
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16
  },
  addOptionContainer: {
    flexDirection: "row",
    marginTop: 20
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5
  },
  addButtonText: {
    color: "white",
    fontSize: 16
  }
});

export default OptionManagementScreen;
