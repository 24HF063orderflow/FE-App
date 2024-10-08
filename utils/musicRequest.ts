import axios from "axios";

export const getMusicList = async () => {
  try {
    const response = await axios.get<musicType[]>("http://192.168.219.101:3000/musicList", { timeout: 5000 });
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
