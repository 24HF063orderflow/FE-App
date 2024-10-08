import axios from "axios";

export const addFeedbackList = async (newItem: feedbackType) => {
  try {
    await axios.post<feedbackType[]>("http://192.168.219.101:3000/feedbackList", newItem).then((response) => {
      console.log("feedback item added:", response.data);
    });
  } catch (error) {
    console.error("Error adding feedback item:", error);
  }
};
