import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Alert, StyleSheet, Image } from 'react-native';

// 주문 데이터의 타입 정의
interface Order {
  id: string;
  table: string;
  items: string;
  status: 'Pending' | 'Completed';
  createdAt: number;
}

// 초기 주문 목록
const initialOrders: Order[] = [
  { id: '1', table: 'Table 1', items: 'Pizza, Salad', status: 'Pending', createdAt: Date.now() - 600000 },
  { id: '2', table: 'Table 2', items: 'Burger, Fries', status: 'Completed', createdAt: Date.now() - 3600000 },
  { id: '3', table: 'Table 3', items: 'Pasta', status: 'Pending', createdAt: Date.now() - 1800000 },
];

type screenType = 'ManagerMain';

type Props = {
  screenChange: (screen: screenType) => void;
};

const OrderManagementScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedTab, setSelectedTab] = useState<'Pending' | 'Completed'>('Pending');

  const handleMarkAsCompleted = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'Completed' } : order
    ));
  };

  const handleCancelOrder = (orderId: string) => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => {
        setOrders(orders.filter(order => order.id !== orderId));
      }},
    ]);
  };

  const renderOrderItem = ({ item }: { item: Order }) => {
    const elapsedTime = Math.floor((Date.now() - item.createdAt) / 60000); // 경과 시간 (분 단위)
    return (
      <View style={styles.orderItem}>
        <Text style={styles.table}>Table: {item.table}</Text>
        <Text style={styles.items}>Items: {item.items}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        <Text style={styles.elapsedTime}>Elapsed Time: {elapsedTime} mins</Text>
        <View style={styles.buttonsContainer}>
          {item.status === 'Pending' && (
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

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/LoginBack.png?raw=true' }} 
        style={styles.fullScreenImage}
        resizeMode="cover"
      >
                        <TouchableOpacity
                    onPress={() => handlePress('ManagerMain')}
                    style={styles.backBtn}
                >
                    <Image
                        source={require('../assets/images/backbutton.png')}  // 뒤로가기 버튼 이미지 사용
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Pending' && styles.activeTab]}
          onPress={() => setSelectedTab('Pending')}
        >
          <Text style={styles.tabText}>Pending Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Completed' && styles.activeTab]}
          onPress={() => setSelectedTab('Completed')}
        >
          <Text style={styles.tabText}>Completed Orders</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders.filter(order => order.status === selectedTab)}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContentContainer} // 스크롤 가능하도록 추가
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // 스크롤 가능하도록 수정
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 20,
  },
  backBtn: {
    position: 'absolute',  // 버튼을 고정 위치로 설정
    top: 30,  // 화면 상단에서 30px 떨어지게 설정
    right: 20,  // 화면 오른쪽에서 20px 떨어지게 설정
    zIndex: 1,  // 버튼이 다른 컴포넌트 위에 나타나도록 설정
},
backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',  // 이미지를 적절히 크기에 맞춰 조정
},
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#ffe071',
  },
  tabText: {
    color: '#000',
  },
  orderItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  table: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  items: {
    fontSize: 16,
    marginVertical: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  elapsedTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ffe071',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  scrollContentContainer: {
    paddingBottom: 100,  // 스크롤 가능 영역 추가
  },
});

export default OrderManagementScreen;
