import axios from "axios";

export const getMenuInfo = async () => {
  try {
    const response = await axios.get<menuInfoType[]>("http://192.168.219.101:3000/menuInfo", { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching the menu info", error);
    return [];
  }
};
