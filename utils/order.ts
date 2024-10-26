import axios from "axios";
import { getData } from "./storeData";

export const postCartOrder = async (paymentMethod: string, orderList: cartType[]) => {
  try {
    const token = await getData("token");
    const tableNumber = await getData("tableNumber");
    const order = orderList.map((v) => ({ foodName: v.name, quantity: v.count }));
    console.log("order", order);
    console.log(`http://13.124.22.36:8080/api/orders/place-food-orders?ownerId=1&tableId=${tableNumber}&paymentMethod=${paymentMethod}`);
    const response = await axios.post(
      `http://13.124.22.36:8080/api/orders/place-food-orders?ownerId=1&tableId=${tableNumber}&paymentMethod=${paymentMethod}`,
      order,
      {
        timeout: 5000,
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error order ", error);
    return [];
  }
};

export const postStaffOrder = async (orderList: staffCartType[]) => {
  try {
    const token = await getData("token");
    const tableNumber = await getData("tableNumber");
    const order = orderList.map((v) => ({ optionId: v.id, quantity: v.count }));
    console.log("order", order);
    console.log(`http://13.124.22.36:8080/api/option-orders/place-option-orders?ownerId=1&tableId=${tableNumber}`);
    const response = await axios.post(
      `http://13.124.22.36:8080/api/option-orders/place-option-orders?ownerId=1&tableId=${tableNumber}`,
      order,
      {
        timeout: 5000,
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error order ", error);
    return [];
  }
};
