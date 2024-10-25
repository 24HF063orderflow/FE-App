import { getData, storeData } from "./storeData";

export const getCart = async () => {
  try {
    const data = await getData("cart");
    const cart: categoryType[] = JSON.parse(data || "[]");
    return cart;
  } catch (error) {
    console.error("Error fetching the cart list", error);
    return [];
  }
};

export const addCart = async (newItem: cartType) => {
  try {
    // 1. 먼저 title을 이용해 항목을 찾습니다.
    const cart = await getData("cart");
    let newData;
    const data: cartType[] = JSON.parse(cart || "[]");
    if (!cart || !data.some((item: cartType) => item.name === newItem.name)) {
      newData = [...data, newItem];
    }
    // 2. 항목이 존재하는지 확인합니다.
    else if (data.some((item: cartType) => item.name === newItem.name)) {
      const idx = data.findIndex((item: cartType) => item.name === newItem.name);
      data[idx].count += 1;
      newData = [...data];
    }
    storeData("cart", JSON.stringify(newData));
  } catch (error) {
    console.error("Error adding menu item:", error);
  }
};

export const modifyCart = async (title: string, count: number) => {
  try {
    const data = await getData("cart");
    const cart: cartType[] = JSON.parse(data || "[]");
    const item = cart.find((item) => item.name === title);

    if (item) {
      let newData;
      if (item.count > 1 || count > 0) {
        item.count += count;
        newData = cart;
      } else {
        newData = cart.filter((item) => item.name !== title);
      }
      storeData("cart", JSON.stringify(newData));
    } else {
      console.log(`Item with title "${title}" not found.`);
    }
  } catch (error) {
    console.error("Error updating menu item:", error);
  }
};

export const deleteCart = async (title: string) => {
  try {
    const data = await getData("cart");
    const cart: cartType[] = JSON.parse(data || "[]");
    const item = cart.find((item) => item.name === title);

    if (item) {
      const newData = cart.filter((item) => item.name !== title);
      storeData("cart", JSON.stringify(newData));
    } else {
      console.log(`Item with title "${title}" not found.`);
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
  }
};

export const deleteAllCart = async () => {
  try {
    storeData("cart", JSON.stringify([]));
  } catch (error) {
    console.error("Error deleting cart items:", error);
  }
};
