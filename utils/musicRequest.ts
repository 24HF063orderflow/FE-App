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
    await axios.post<musicType[]>("http://192.168.219.101:3000/musicList", newItem).then((response) => {
      console.log("Music item added:", response.data);
    });
  } catch (error) {
    console.error("Error adding music item:", error);
  }
};
