import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet, ImageBackground } from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Order 타입 정의
interface Order {
  id: string;
  tableId: number; // tableId가 존재합니다.
  foodName: string;
  orderOption?: string | null;
  orderStatus?: "PENDING" | "COMPLETED" | null; // orderStatus는 optional로 처리
  orderTime?: string | null; // orderTime도 optional로 설정
  ownerId: number;
  paymentMethod: "CASH" | "CARD";
  quantity: number;
  totalAmount: number;
  food: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    tableManagementId: number;
    category: { id: number; name: string };
  };
}

// OptionOrder 타입 정의
interface OptionOrder {
  id: string;
  itemOption: {
    id: number;
    optionName: string;
    ownerId: number;
  };
  orderStatus?: "PENDING" | "COMPLETED" | null;
  orderTime?: string | null;
  ownerId: number;
  quantity: number;
  tableId: number;
}
type screenType = "ManagerMain";

type Props = {
  screenChange: (screen: screenType) => void;
};

const OrderManagementScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };
  const [orders, setOrders] = useState<Order[]>([]);
  const [optionOrders, setOptionOrders] = useState<OptionOrder[]>([]);
  const [selectedTab, setSelectedTab] = useState<"Pending" | "Completed">("Pending");
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndOrders = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      console.log("토큰", token);
      if (token) {
        setJwtToken(token);
        const decoded: any = jwtDecode(token);
        setOwnerId(decoded.id); // JWT에서 ownerId 추출
        await fetchOrders(decoded.id, token);
        await fetchOptionOrders(decoded.id, token);
      }
    };
    fetchTokenAndOrders();
  }, []);

  // Order 데이터를 가져오는 함수
  const fetchOrders = async (ownerId: string, token: string) => {
    try {
      const response = await axios.get(`http://13.124.22.36:8080/api/orders/history/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Order Response:", response.data); // 확인용 콘솔 로그
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // OptionOrder 데이터를 가져오는 함수
  const fetchOptionOrders = async (ownerId: string, token: string) => {
    try {
      const response = await axios.get(`http://13.124.22.36:8080/api/option-orders/history/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Option Order Response:", response.data); // 확인용 콘솔 로그
      setOptionOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Order 완료 처리 함수
  const handleMarkAsCompleted = async (orderId: string) => {
    if (!jwtToken) return;
    try {
      await axios.put(`http://13.124.22.36:8080/api/orders/complete-order/${orderId}`, null, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "COMPLETED" } : order)));
    } catch (error) {
      console.error(error);
    }
  };

  // Order 취소 처리 함수
  const handleCancelOrder = async (orderId: string) => {
    if (!jwtToken) return;
    Alert.alert("Cancel Order", "Are you sure you want to cancel this order?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await axios.delete(`http://13.124.22.36:8080/api/orders/delete-food-order/${orderId}`, {
              headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setOrders(orders.filter((order) => order.id !== orderId));
          } catch (error) {
            console.error(error);
          }
        }
      }
    ]);
  };

  // OptionOrder 완료 처리 함수
  const handleOptionMarkAsCompleted = async (optionOrderId: string) => {
    if (!jwtToken) return;
    try {
      await axios.put(`http://13.124.22.36:8080/api/option-orders/complete-option-order/${optionOrderId}`, null, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      setOptionOrders(
        optionOrders.map((optionOrder) => (optionOrder.id === optionOrderId ? { ...optionOrder, status: "COMPLETED" } : optionOrder))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // OptionOrder 취소 처리 함수
  const handleCancelOptionOrder = async (optionOrderId: string) => {
    if (!jwtToken) return;
    Alert.alert("Cancel Option Order", "Are you sure you want to cancel this option order?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await axios.delete(`http://13.124.22.36:8080/api/option-orders/delete-option-order/${optionOrderId}`, {
              headers: { Authorization: `Bearer ${jwtToken}` }
            });
            setOptionOrders(optionOrders.filter((optionOrder) => optionOrder.id !== optionOrderId));
          } catch (error) {
            console.error(error);
          }
        }
      }
    ]);
  };

  // Order 렌더링 함수
  const renderOrderItem = ({ item }: { item: Order }) => {
    const elapsedTime = item.orderTime ? Math.floor((Date.now() - new Date(item.orderTime).getTime()) / 60000) : "Unknown"; // orderTime이 없는 경우 처리

    return (
      <View style={styles.orderItem}>
        <Text style={styles.table}>Table ID: {item.tableId}</Text>
        <Text style={styles.items}>Items: {item.foodName}</Text>
        <Text style={styles.status}>Status: {item.orderStatus || "Unknown"}</Text>
        <Text style={styles.elapsedTime}>Elapsed Time: {elapsedTime} mins</Text>
        <View style={styles.buttonsContainer}>
          {item.orderStatus === "PENDING" && (
            <TouchableOpacity style={styles.button} onPress={() => handleMarkAsCompleted(item.id)}>
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => handleCancelOrder(item.id)}>
            <Text style={styles.buttonText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // OptionOrder 렌더링 함수
  const renderOptionOrderItem = ({ item }: { item: OptionOrder }) => {
    const elapsedTime = item.orderTime ? Math.floor((Date.now() - new Date(item.orderTime).getTime()) / 60000) : "Unknown"; // orderTime이 없는 경우 처리

    return (
      <View style={styles.orderItem}>
        <Text style={styles.items}>Option: {item.tableId}</Text>
        <Text style={styles.items}>Option: {item.itemOption.optionName}</Text>
        <Text style={styles.items}>Quantity: {item.quantity}</Text>
        <Text style={styles.status}>Status: {item.orderStatus || "Unknown"}</Text>
        <Text style={styles.elapsedTime}>Elapsed Time: {elapsedTime} mins</Text>
        <View style={styles.buttonsContainer}>
          {item.orderStatus === "PENDING" && (
            <TouchableOpacity style={styles.button} onPress={() => handleOptionMarkAsCompleted(item.id)}>
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => handleCancelOptionOrder(item.id)}>
            <Text style={styles.buttonText}>Cancel Option Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true" }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <TouchableOpacity onPress={() => handlePress("ManagerMain")} style={styles.backBtn}>
          <Image
            source={require("../assets/images/backbutton.png")} // 뒤로가기 버튼 이미지 사용
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, selectedTab === "Pending" && styles.activeTab]} onPress={() => setSelectedTab("Pending")}>
            <Text style={styles.tabText}>Pending Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "Completed" && styles.activeTab]}
            onPress={() => setSelectedTab("Completed")}
          >
            <Text style={styles.tabText}>Completed Orders</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={orders.filter((order) => order.orderStatus === selectedTab.toUpperCase())}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <FlatList
          data={optionOrders.filter((optionOrder) => optionOrder.orderStatus === selectedTab.toUpperCase())}
          renderItem={renderOptionOrderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  fullScreenImage: {
    width: "100%",
    height: "100%"
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginHorizontal: 4
  },
  activeTab: {
    backgroundColor: "#ffe071"
  },
  tabText: {
    color: "#000"
  },
  backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  orderItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1
  },
  table: {
    fontSize: 18,
    fontWeight: "bold"
  },
  items: {
    fontSize: 16,
    marginVertical: 8
  },
  status: {
    fontSize: 16,
    marginBottom: 8
  },
  elapsedTime: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#ffe071",
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "black",
    fontSize: 16
  },
  backBtn: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1
  }
});

export default OrderManagementScreen;
