import axios from "axios";
import { getData } from "./storeData";

export const getMusicList = async () => {
  try {
    const token = await getData("token");
    const response = await axios.get<musicType[]>("http://13.124.22.36:8080/api/song/list/1", {
      timeout: 5000,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the music list", error);
    return [];
  }
};

export const addMusicList = async (newItem: musicType) => {
  try {
    const token = await getData("token");
    const tableNumber = await getData("tableNumber");
    const newData = {
      ...newItem,
      ownerId: 1,
      tableNumber: tableNumber,
      status: "IN_PROGRESS",
      requestedAt: formatCurrentTime()
    };
    await axios
      .post<musicType[]>("http://13.124.22.36:8080/api/song/request", newData, {
        timeout: 5000,
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((response) => {
        console.log("Music item added:", response.data);
      });
  } catch (error) {
    console.error("Error adding music item:", error);
  }
};

export const formatCurrentTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
