import axios from "axios";
import { formatCurrentTime } from "./musicRequest";
import { getData } from "./storeData";

export const addFeedbackList = async (newItem: feedbackType) => {
  try {
    const token = await getData("token");
    const tableNumber = await getData("tableNumber");
    const newData = {
      tableNumber: tableNumber,
      score: newItem.rating,
      comment: newItem.feedback,
      createdAt: formatCurrentTime()
    };
    await axios
      .post<musicType[]>("http://13.124.22.36:8080/api/feedback/submit/1", newData, {
        timeout: 5000,
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((response) => {
        console.log("Feedback item added:", response.data);
      });
  } catch (error) {
    console.error("Error adding feedback item:", error);
  }
};
