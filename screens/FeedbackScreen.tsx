import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import TopBar from "../components/TopBar";
import { scale } from "react-native-size-matters";
import StarRating from "../components/Feedback/StarRating";
import { addFeedbackList } from "../utils/feedback";

type Props = {
  screenChange: (screen: screenType) => void;
};

export const FeedbackScreen = ({ screenChange }: Props) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleAddToFeedbackList = async (item: feedbackType) => {
    try {
      await addFeedbackList(item);
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  return (
    <>
      <TopBar screenChange={screenChange} homeButtonVisible={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>고객의 소리</Text>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
          </View>
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            style={styles.feedbackInput}
            multiline={true}
            placeholder="피드백을 입력하세요"
          />
          <TouchableOpacity
            onPress={() => {
              if (feedback || rating) {
                handleAddToFeedbackList({ feedback: feedback, rating: rating });
                setFeedback("");
              } else {
                alert("내용을 입력해주세요!");
              }
            }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>작성 완료</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2F2F", // 배경 색상 어두운 색
    padding: scale(20)
  },
  title: {
    color: "#FFFFFF", // 텍스트 색상 흰색
    fontSize: scale(16),
    marginBottom: scale(10),
    marginLeft: scale(6)
  },
  feedbackInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: scale(10),
    padding: scale(10),
    fontSize: scale(10),
    textAlignVertical: "top" // 텍스트가 상단에서부터 입력되도록 설정
  },
  submitButton: {
    backgroundColor: "#C1A87D", // 버튼 배경 색상
    borderRadius: scale(10),
    paddingVertical: scale(5),
    alignItems: "center",
    marginTop: scale(20)
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: scale(14)
  }
});

export default FeedbackScreen;
