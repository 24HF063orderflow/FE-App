import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground, Dimensions, TouchableOpacity, Image} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { LineChart } from 'react-native-chart-kit';

interface SaleData {
  id: string;
  date: string;
  amount: number;
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
  const [salesData, setSalesData] = useState<SaleData[]>([
    { id: '1', date: '2024-09-01', amount: 1500 },
    { id: '2', date: '2024-09-02', amount: 2000 },
    { id: '3', date: '2024-09-03', amount: 2500 },
    // 필요한 만큼 더 많은 데이터 추가 가능
  ]);

  // 월별 매출 집계
  const monthlySales: MonthlySalesData = salesData.reduce((acc: MonthlySalesData, sale: SaleData) => {
    const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = 0;
    acc[month] += sale.amount;
    return acc;
  }, {});

  // 매출 목록 렌더링
  const renderSalesList = () => (
    <View style={styles.tabContainer}>
      <ImageBackground
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>매출 목록</Text>
        </View>
        <FlatList
          data={salesData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>날짜: {item.date}</Text>
              <Text style={styles.itemText}>금액: ${item.amount}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );

  // 월별 매출 요약 렌더링
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
            labels: Object.keys(monthlySales),
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
                  source={require('../assets/images/backbutton.png')}  // 뒤로가기 버튼 이미지 사용
                  style={styles.backButtonImage}
              />
          </TouchableOpacity>
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
});

export default Sale;