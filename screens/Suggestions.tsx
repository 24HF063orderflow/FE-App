import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

type screenType = "ManagerMain";

// 타입 정의
interface Feedback {
  id: number;
  comment: string;
  score: number;
  reply: string;
}

type Props = {
  screenChange: (screen: screenType) => void;
};

const Suggestions = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };

  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [responseText, setResponseText] = useState<string>("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeedbackList = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          let decoded: any;
          try {
            decoded = jwtDecode(token);
          } catch (error) {
            console.error("Invalid token specified:", error);
            return;
          }
          const response = await axios.get(`http://13.124.22.36:8080/api/feedback/list/${decoded.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setFeedbackList(response.data);
        }
      } catch (error) {
        console.error("Error fetching feedback list:", error);
      }
    };

    fetchFeedbackList();
  }, []);

  const handleAddResponse = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (selectedFeedbackId && responseText.trim() && token) {
        await axios.post(`http://13.124.22.36:8080/api/feedback/comment/${selectedFeedbackId}`, null, {
          params: { comment: responseText },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFeedbackList(
          feedbackList.map((feedback) => (feedback.id === selectedFeedbackId ? { ...feedback, reply: responseText } : feedback))
        );
        setResponseText("");
        setSelectedFeedbackId(null);
      } else {
        Alert.alert("입력 오류", "답변을 입력해주세요.");
      }
    } catch (error) {
      console.error("Error adding response", error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <Text key={index} style={index < rating ? styles.starFilled : styles.starEmpty}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }: { item: Feedback }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.comment}</Text>
      {renderStars(item.score)}
      {item.reply ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>답변:</Text>
          <Text style={styles.responseText}>{item.reply}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedFeedbackId(item.id);
          }}
        >
          <Text style={styles.addButtonText}>답변 달기</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>건의사항 리스트</Text>
      <TouchableOpacity onPress={() => handlePress("ManagerMain")} style={styles.backBtn}>
        <Image source={require("../assets/images/backbutton.png")} style={styles.backButtonImage} />
      </TouchableOpacity>

      <FlatList data={feedbackList} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      {selectedFeedbackId && (
        <View style={styles.responseForm}>
          <TextInput style={styles.input} placeholder="답변을 입력하세요..." value={responseText} onChangeText={setResponseText} />
          <TouchableOpacity style={styles.addButton} onPress={handleAddResponse}>
            <Text style={styles.addButtonText}>답변 추가</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    color: "#FFD700",
    fontSize: 20,
    marginBottom: 10
  },
  item: {
    backgroundColor: "#555",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10
  },
  itemText: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 5
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 5
  },
  starFilled: {
    color: "#FFD700",
    fontSize: 16
  },
  starEmpty: {
    color: "#888",
    fontSize: 16
  },
  responseContainer: {
    marginTop: 10
  },
  responseTitle: {
    color: "#FFD700",
    fontSize: 16
  },
  responseText: {
    color: "#FFF",
    fontSize: 16
  },
  responseForm: {
    marginTop: 20,
    backgroundColor: "#C3A36A",
    padding: 20,
    borderRadius: 10
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16
  },
  addButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
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
  addButtonText: {
    color: "#FFF",
    fontSize: 16
  }
});

export default Suggestions;
