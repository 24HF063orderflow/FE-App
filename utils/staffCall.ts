import axios from "axios";
import { getData, removeData, storeData } from "./storeData";

export const getStaffMenu = async () => {
  try {
    const token = await getData("token");
    const response = await axios.get<staffMenuType[]>("http://13.124.22.36:8080/api/options/list/1", {
      timeout: 5000,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching the staffMenu info", error);
    return [];
  }
};

export const getStaffCart = async () => {
  try {
    const data = await getData("staffCart");
    const staffCart: staffCartType[] = JSON.parse(data || "[]");
    return staffCart;
  } catch (error) {
    console.error("Error fetching the staffCart list", error);
    return [];
  }
};

export const addStaffCart = async (newItem: staffCartType) => {
  try {
    // 1. 먼저 title을 이용해 항목을 찾습니다.
    const data = await getData("staffCart");
    const staffCart: staffCartType[] = JSON.parse(data || "[]");
    let newData;
    // 2. 항목이 존재하는지 확인합니다.
    if (!data || !staffCart.some((item: staffCartType) => item.optionName === newItem.optionName)) {
      newData = [...staffCart, newItem];
    } else if (staffCart.some((item: staffCartType) => item.optionName === newItem.optionName)) {
      const idx = staffCart.findIndex((item: staffCartType) => item.optionName === newItem.optionName);
      staffCart[idx].count += 1;
      newData = [...staffCart];
    }
    storeData("staffCart", JSON.stringify(newData));
  } catch (error) {
    console.error("Error adding menu item:", error);
  }
};

export const modifyStaffCart = async (title: string, count: number) => {
  try {
    const data = await getData("staffCart");
    const staffCart: staffCartType[] = JSON.parse(data || "[]");
    const item = staffCart.find((item) => item.optionName === title);
    if (item) {
      let newData;
      if (item.count > 1 || count > 0) {
        item.count += count;
        newData = staffCart;
      } else {
        newData = staffCart.filter((item) => item.optionName !== title);
      }
      storeData("staffCart", JSON.stringify(newData));
    } else {
      console.log(`Item with title "${title}" not found.`);
    }
  } catch (error) {
    console.error("Error updating menu item:", error);
  }
};

export const deleteStaffCart = async (title: string) => {
  try {
    const data = await getData("staffCart");
    const staffCart: staffCartType[] = JSON.parse(data || "[]");
    const item = staffCart.find((item) => item.optionName === title);

    if (item) {
      const newData = staffCart.filter((item) => item.optionName !== title);
      storeData("staffCart", JSON.stringify(newData));
    } else {
      console.log(`Item with title "${title}" not found.`);
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
  }
};

export const deleteAllStaffCart = async () => {
  try {
    storeData("staffCart", JSON.stringify([]));
  } catch (error) {
    console.error("Error deleting cart items:", error);
  }
};
