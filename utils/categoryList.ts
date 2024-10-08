import axios from "axios";

export const getCategoryList = async () => {
  try {
    const response = await axios.get<categoryType[]>("http://192.168.219.101:3000/categoryList", { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching the menu list", error);
    return [];
  }
};
