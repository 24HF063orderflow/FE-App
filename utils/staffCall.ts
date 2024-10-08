import axios from "axios";

export const getStaffMenu = async () => {
  try {
    const response = await axios.get<staffMenuType[]>("http://192.168.219.101:3000/staffMenuList", { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching the staffMenu info", error);
    return [];
  }
};

export const getStaffCart = async () => {
  try {
    const response = await axios.get<staffCartType[]>("http://192.168.219.101:3000/staffCartList", { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching the staffCart list", error);
    return [];
  }
};

export const addStaffCart = async (newItem: staffCartType) => {
  try {
    // 1. 먼저 title을 이용해 항목을 찾습니다.
    const response = await axios.get<staffCartType[]>(`http://192.168.219.101:3000/staffCartList?title=${newItem.title}`);

    // 2. 항목이 존재하는지 확인합니다.
    if (response.data.length > 0) {
      const item = response.data[0];
      const itemId = item.id;

      // 3. PATCH 요청을 통해 count 값을 업데이트합니다.
      await axios.patch(`http://192.168.219.101:3000/staffCartList/${itemId}`, { count: item.count + 1 });

      console.log(`Item with title "${item.title}" updated successfully. New count: ${item.count + 1}`);
    } else {
      await axios.post<cartType[]>("http://192.168.219.101:3000/staffCartList", newItem).then((response) => {
        console.log("Menu item added:", response.data);
      });
    }
  } catch (error) {
    console.error("Error adding menu item:", error);
  }
};

export const modifyStaffCart = async (title: string, count: number) => {
  try {
    const response = await axios.get<staffCartType[]>(`http://192.168.219.101:3000/staffCartList?title=${title}`);

    if (response.data.length > 0) {
      const item = response.data[0];
      const itemId = item.id;

      if (item.count > 1 || count > 0) {
        await axios.patch(`http://192.168.219.101:3000/staffCartList/${itemId}`, { count: item.count + count });
        console.log(`Item with title "${item.title}" updated successfully. New count: ${item.count + count}`);
      } else {
        await axios.delete(`http://192.168.219.101:3000/staffCartList/${itemId}`);
        console.log(`Item with title "${title}" deleted successfully.`);
      }
    } else {
      console.log(`Item with title "${title}" not found.`);
    }
  } catch (error) {
    console.error("Error updating menu item:", error);
  }
};

export const deleteStaffCart = async (title: string) => {
  try {
    const response = await axios.get<staffCartType[]>(`http://192.168.219.101:3000/staffCartList?title=${title}`);

    if (response.data.length > 0) {
      const item = response.data[0];
      const itemId = item.id;

      await axios.delete(`http://192.168.219.101:3000/staffCartList/${itemId}`);
      console.log(`Item with title "${title}" deleted successfully.`);
    } else {
      console.log(`Item with title "${title}" not found.`);
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
  }
};

export const deleteAllStaffCart = async () => {
  try {
    const { data: cartList } = await axios.get<staffCartType[]>(`http://192.168.219.101:3000/staffCartList`);

    for (const item of cartList) {
      await axios.delete(`http://192.168.219.101:3000/staffCartList/${item.id}`);
    }
  } catch (error) {
    console.error("Error deleting cart items:", error);
  }
};
