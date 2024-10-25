import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type MusicItem = {
  id: number;
  title: string;
  artist: string;
  status: string;
};

type screenType = "ManagerMain";

const MusicRequestListScreen = ({ screenChange }: { screenChange: (screen: screenType) => void }) => {
  const [musicList, setMusicList] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ownerId, setOwnerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMusicList = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        console.log("토큰", token);
        if (token) {
          // 토큰에서 id 추출
          const decoded: { id: number } = jwtDecode(token); // 토큰 디코딩
          const userId = decoded.id;
          console.log("디코딩된 아이디값", userId);
          setOwnerId(userId);

          const response = await axios.get(`http://13.124.22.36:8080/api/song/list/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log("API 응답", response.data);

          // status가 IN_PROGRESS인 노래들만 필터링
          const filteredMusic = response.data.filter((music: MusicItem) => music.status === "IN_PROGRESS");
          setMusicList(filteredMusic);
        }
      } catch (error) {
        console.error("음악 리스트를 불러오는 중 오류가 발생했습니다.", error);
        Alert.alert("Error", "음악 리스트를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusicList();
  }, []);

  const handleCompleteMusic = async (songId: number) => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token && ownerId !== null) {
        await axios.put(`http://13.124.22.36:8080/api/song/status/${ownerId}/${songId}?newStatus=COMPLETED`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Alert.alert("성공", "노래 상태가 완료로 변경되었습니다.");

        // 리스트를 다시 불러오거나 해당 항목을 제거
        setMusicList(musicList.filter((music) => music.id !== songId));
      }
    } catch (error) {
      console.error("음악 상태를 변경하는 중 오류가 발생했습니다.", error);
      Alert.alert("Error", "음악 상태를 변경하는 중 오류가 발생했습니다.");
    }
  };

  const renderItem = ({ item }: { item: MusicItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemText}>{item.artist}</Text>
      <TouchableOpacity style={styles.CompleteButton} onPress={() => handleCompleteMusic(item.id)}>
        <Text style={styles.CompleteButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>음악 신청 리스트</Text>
      <TouchableOpacity onPress={() => screenChange("ManagerMain")} style={styles.backBtn}>
        <Image source={require("../assets/images/backbutton.png")} style={styles.backButtonImage} />
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : (
        <FlatList data={musicList} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 10
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
  title: {
    color: "#FFD700",
    fontSize: 20,
    marginBottom: 10
  },
  item: {
    backgroundColor: "#555",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemText: {
    color: "#FFF",
    fontSize: 16
  },
  CompleteButton: {
    backgroundColor: "#6FADCF",
    padding: 10,
    borderRadius: 5
  },
  CompleteButtonText: {
    color: "#FFF",
    fontSize: 14
  },
  loadingText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20
  }
});

export default MusicRequestListScreen;
