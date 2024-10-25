import axios from "axios";
import { getData } from "./storeData";

export const getCategoryList = async () => {
  try {
    const token = await getData("token");
    const response = await axios.get<categoryType[]>("http://13.124.22.36:8080/api/food-management/1/categories", {
      timeout: 5000,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the menu list", error);
    return [];
  }
};
