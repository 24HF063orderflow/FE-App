import React, { useState } from 'react';
import { StyleSheet, StatusBar, Image, Text, View, TextInput, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions } from 'react-native';


type screenType = 'ManagerMain';

interface SaleItem {
  name: string;
  amount: string;
}

const initialLayout = { width: Dimensions.get('window').width };

type Props = {
    screenChange: (screen: screenType) => void;
  };

interface SaleProps {
  sales: SaleItem[];
  handleAddSale: () => void;
  handleDeleteSale: (index: number) => void;
  saleName: string;
  setSaleName: React.Dispatch<React.SetStateAction<string>>;
  saleAmount: string;
  setSaleAmount: React.Dispatch<React.SetStateAction<string>>;
  editingSale: number | null;
  setEditingSale: React.Dispatch<React.SetStateAction<number | null>>;
}

// 매출 관리 탭
const Sale: React.FC<SaleProps> = ({ sales, handleAddSale, handleDeleteSale, saleName, setSaleName, saleAmount, setSaleAmount, editingSale, setEditingSale }) => (
  <View style={styles.tabContainer}>
    
    <StatusBar hidden={true} />
    <ImageBackground
      source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
      style={styles.fullScreenImage}
      resizeMode="stretch"
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Manage Sales</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={sales}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>Amount: {item.amount}</Text>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => { setSaleName(item.name); setSaleAmount(item.amount); setEditingSale(index); }} style={styles.editButton}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteSale(index)} style={styles.deleteButton}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sale Name"
            value={saleName}
            onChangeText={setSaleName}
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Sale Amount"
            value={saleAmount}
            onChangeText={setSaleAmount}
            keyboardType="numeric"
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddSale}>
            <Text style={styles.buttonText}>{editingSale !== null ? 'Update Sale' : 'Add Sale'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const CategoryFoodManagementScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
      screenChange(screenName);
  };

  const [sales, setSales] = useState<SaleItem[]>([]);
  const [saleName, setSaleName] = useState<string>('');
  const [saleAmount, setSaleAmount] = useState<string>('');
  const [editingSale, setEditingSale] = useState<number | null>(null);

  const handleAddSale = () => {
      if (saleName && saleAmount) {
          if (editingSale !== null) {
              const updatedSales = sales.map((sale, index) =>
                  index === editingSale ? { name: saleName, amount: saleAmount } : sale
              );
              setSales(updatedSales);
              setEditingSale(null);
          } else {
              setSales([...sales, { name: saleName, amount: saleAmount }]);
          }
          setSaleName('');
          setSaleAmount('');
      } else {
          Alert.alert('Error', 'Sale name or amount cannot be empty');
      }
  };

  const handleDeleteSale = (index: number) => {
      Alert.alert(
          'Delete Sale',
          'Are you sure you want to delete this sale?',
          [
              { text: 'Cancel', style: 'cancel' },
              {
                  text: 'Delete',
                  onPress: () => setSales(sales.filter((_, i) => i !== index)),
              },
          ]
      );
  };

  const renderScene = SceneMap({
      sales: () => (
          <Sale
              sales={sales}
              handleAddSale={handleAddSale}
              handleDeleteSale={handleDeleteSale}
              saleName={saleName}
              setSaleName={setSaleName}
              saleAmount={saleAmount}
              setSaleAmount={setSaleAmount}
              editingSale={editingSale}
              setEditingSale={setEditingSale}
          />
      ),
  });

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([{ key: 'sales', title: 'Sales' }]);

  return (
      <View style={styles.container}>
          {/* 뒤로가기 버튼 추가 */}
          <TouchableOpacity
              onPress={() => handlePress('ManagerMain')}
              style={styles.backBtn}
          >
              <Image
                  source={require('../assets/images/backbutton.png')}  // 뒤로가기 버튼 이미지 사용
                  style={styles.backButtonImage}
              />
          </TouchableOpacity>

          {/* TabView 구성 */}
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
              initialLayout={initialLayout}
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
  fullScreenImage: {
    width: '100%',
    height: '100%',
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
  contentContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'row',
  },
  listContainer: {
    width: '60%',
    height: '100%',
  },
  itemContainer: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#b5a883',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  formContainer: {
    width: '40%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#b5a883',
    padding: 10,
    borderRadius: 5,
  },    backBtn: {
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
});

export default CategoryFoodManagementScreen;
