import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { LineChart } from 'react-native-chart-kit';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface SaleData {
  id: string;
  name: string;
  price: number;
  date: string;
}

interface MonthlySalesData {
  [key: string]: number;
}
type screenType = 'ManagerMain';

type Props = {
  screenChange: (screen: screenType) => void;
};

const Sale = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };

  const [salesData, setSalesData] = useState<SaleData[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');
  

  useEffect(() => {
    // JWT 토큰에서 ownerId를 가져오는 함수
    const getOwnerIdFromJWT = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          const decoded: { id: number } = jwtDecode(token); // 토큰 디코딩
          setOwnerId(decoded.id);
        }
      } catch (error) {
        console.error('JWT 디코딩 에러:', error);
      }
    };
    getOwnerIdFromJWT();
  }, []);
  
  // ownerId가 설정된 후 데이터 로드
  useEffect(() => {
    if (ownerId !== null) {
      const loadData = async () => {
        try {
          const response = await axios.get(`http://192.168.0.191:8080/api/orders/history/${ownerId}`, {
            headers: {
              'Authorization': `Bearer ${await AsyncStorage.getItem('jwtToken')}`,
              'accept': '*/*'
            }
          });
          const data = response.data.map((order: any) => ({
            id: order.id.toString(),
            name: order.food.name,
            price: order.totalAmount,
            date: order.orderTime || 'N/A',
          }));
          setSalesData(data);
          setTotalSales(data.reduce((sum: number, sale: SaleData) => sum + sale.price, 0));
        } catch (error) {
          console.error('API 호출 에러:', error);
        }
      };
      loadData();
    }
  }, [ownerId]);

  // 선택된 기간에 따른 필터링된 매출 데이터 가져오기
  const getFilteredSalesData = () => {
    const today = new Date();
  
    return salesData.filter((sale) => {
      const saleDate = new Date(sale.date);
  
      switch (selectedPeriod) {
        case 'day':
          return saleDate.toDateString() === today.toDateString();
        case 'week':
          const startOfWeek = new Date();
          startOfWeek.setDate(today.getDate() - today.getDay()); // 이번 주 시작일
          return saleDate >= startOfWeek && saleDate <= today;
        case 'month':
          return saleDate.getMonth() === today.getMonth() && saleDate.getFullYear() === today.getFullYear();
        default:
          return false;
      }
    });
  };

  const filteredSalesData = getFilteredSalesData();

  // 매출 목록 렌더링
  const renderSalesList = () => (
    <View style={styles.tabContainer}>
      <ImageBackground
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>매출 목록 ({selectedPeriod === 'day' ? '일별' : selectedPeriod === 'week' ? '주별' : '월별'})</Text>
          <View style={styles.periodSelectorContainer}>
            <TouchableOpacity onPress={() => setSelectedPeriod('day')} style={styles.periodButton}>
              <Text style={styles.periodButtonText}>일</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPeriod('week')} style={styles.periodButton}>
              <Text style={styles.periodButtonText}>주</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPeriod('month')} style={styles.periodButton}>
              <Text style={styles.periodButtonText}>월</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalSalesText}>총 매출: ${totalSales}</Text>
        </View>
        <FlatList
          data={filteredSalesData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>날짜: {item.date}</Text>
              <Text style={styles.itemText}>금액: ${item.price}</Text>
              <Text style={styles.itemText}>상품명: {item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );

  // 월별 매출 요약 렌더링
  const monthlySales = salesData.reduce((acc: MonthlySalesData, sale: SaleData) => {
    const saleDate = new Date(sale.date);
    const monthYear = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}`; // 년-월 형태로 비교 (월을 1부터 시작하도록 변경)
  
    if (!acc[monthYear]) acc[monthYear] = 0;
    acc[monthYear] += isFinite(sale.price) && !isNaN(sale.price) ? sale.price : 0;
  
    return acc;
  }, {});

  const renderMonthlySummary = () => (
    <View style={styles.tabContainer}>
      <ImageBackground
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>월별 매출 요약</Text>
        </View>
        <LineChart
  data={{
    labels: Object.keys(monthlySales), // '2024-9', '2024-10' 등으로 표시
    datasets: [{
      data: Object.values(monthlySales),
    }],
  }}
  width={Dimensions.get('window').width - 32} // 화면 너비에 맞춤
  height={220}
  yAxisLabel="$"
  chartConfig={{
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  }}
  style={styles.chart}
/>
      </ImageBackground>
    </View>
  );

  // 기발한 기능 추가: 매출 목표 설정 및 목표 달성 여부 확인
  const [salesTarget, setSalesTarget] = useState<number>(50000); // 기본 매출 목표 설정
  const renderSalesTarget = () => (
    <View style={styles.salesTargetContainer}>
      <Text style={styles.salesTargetText}>매출 목표: ${salesTarget}</Text>
      <Text style={styles.salesTargetText}>
        목표 달성 여부: {totalSales >= salesTarget ? '달성 완료 🎉' : '목표 미달성'}
      </Text>
    </View>
  );

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'salesList', title: '매출 목록' },
    { key: 'monthlySummary', title: '월별 매출 요약' },
  ]);

  const renderScene = SceneMap({
    salesList: renderSalesList,
    monthlySummary: renderMonthlySummary,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handlePress('ManagerMain')}
        style={styles.backBtn}
      >
        <Image
          source={require('../assets/images/backbutton.png')} // 뒤로가기 버튼 이미지 사용
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      {renderSalesTarget()}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#ffe25e' }}
            style={{ backgroundColor: 'black' }}
            labelStyle={{ color: 'white' }}
          />
        )}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  backBtn: {
    position: 'absolute', // 버튼을 고정 위치로 설정
    top: 30, // 화면 상단에서 30px 떨어지게 설정
    right: 20, // 화면 오른쪽에서 20px 떨어지게 설정
    zIndex: 1, // 버튼이 다른 컴포넌트 위에 나타나도록 설정
  },
  backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain', // 이미지를 적절히 크기에 맞춰 조정
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  item: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  totalSalesText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  salesTargetContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  salesTargetText: {
    fontSize: 18,
    color: 'black',
  },
  periodSelectorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  periodButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#ffe25e',
    borderRadius: 5,
  },
  periodButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Sale;