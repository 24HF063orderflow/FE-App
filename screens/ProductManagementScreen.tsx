import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as ImagePicker from 'expo-image-picker'; // expo-image-picker 사용
import { Dimensions } from 'react-native';

const initialLayout = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/10,
  };

type CategoryManagementProps = {
  categories: string[];
  handleAddCategory: () => void;
  handleDeleteCategory: (index: number) => void;
  categoryName: string;
  setCategoryName: (text: string) => void;
  editingCategory: number | null;
  setEditingCategory: (index: number | null) => void;
};

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  handleAddCategory,
  handleDeleteCategory,
  categoryName,
  setCategoryName,
  editingCategory,
  setEditingCategory
}) => (
  <View style={styles.tabContainer}>
    <StatusBar hidden={true} />
    <ImageBackground
      source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
      style={styles.fullScreenImage}
      resizeMode="stretch"
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Manage Categories</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item}</Text>
                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      onPress={() => { setCategoryName(item); setEditingCategory(index); }}
                      style={styles.editButton}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteCategory(index)}
                      style={styles.deleteButton}
                    >
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
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
            <Text style={styles.buttonText}>{editingCategory !== null ? 'Update Category' : 'Add Category'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

type Product = {
  name: string;
  description: string;
  price: string;
  image: string | null;
  categoryIndex: number;
};

type ProductManagementProps = {
  products: Product[];
  categories: string[];
  selectedCategoryIndex: number | null;
  handleAddProduct: () => void;
  handleDeleteProduct: (index: number) => void;
  productName: string;
  setProductName: (text: string) => void;
  productDescription: string;
  setProductDescription: (text: string) => void;
  productPrice: string;
  setProductPrice: (text: string) => void;
  productImage: string | null;
  setProductImage: (uri: string | null) => void;
  pickImage: () => void;
  editingProduct: number | null;
  setEditingProduct: (index: number | null) => void;
};

const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  categories,
  selectedCategoryIndex,
  handleAddProduct,
  handleDeleteProduct,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productPrice,
  setProductPrice,
  productImage,
  setProductImage,
  pickImage,
  editingProduct,
  setEditingProduct
}) => {
  const defaultImageUri = 'https://github.com/24HF063orderflow/Image/blob/main/Main/photo.png?raw=true';

  return (
    <View style={styles.tabContainer}>
      <ImageBackground
        source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <View style={{ width: '100%', height: '75%', flexDirection: 'row', backgroundColor: '#767676' }}>
          <View style={{ width: '50%', height: '100%', flexDirection: 'row', borderColor: 'black', borderStyle: 'solid' }}>
            {productImage ? (
              <Image
                source={{ uri: productImage }}
                style={{ width: '98%', height: '94%', marginLeft: '2%', marginTop: '2%' }}
              />
            ) : (
              <TouchableOpacity onPress={pickImage} style={{ width: '98%', height: '94%', marginLeft: '2%', marginTop: '2%' }}>
                <ImageBackground
                  source={{ uri: defaultImageUri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ width: '40%', height: '100%', flexDirection: 'column', marginLeft: '5%' }}>
            <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', marginBottom: '5%' }}>
              상품등록: {categories[selectedCategoryIndex || 0]}
            </Text>
            <TextInput
              style={styles.input2}
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
            <TextInput
              style={styles.input2}
              placeholder="Product Description"
              value={productDescription}
              onChangeText={setProductDescription}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
            <TextInput
              style={styles.input2}
              placeholder="Product Price"
              value={productPrice}
              onChangeText={setProductPrice}
              keyboardType="numeric"
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
            <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
              <Text style={styles.buttonText}>Pick and Crop Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
              <Text style={styles.buttonText}>{editingProduct !== null ? 'Update Product' : 'Add Product'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={products.filter(product => product.categoryIndex === selectedCategoryIndex)}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image || defaultImageUri }} style={styles.image} />
              <Text style={styles.itemText2}>{item.name}</Text>
              <Text style={{ fontSize: 15, width: '35%' }}>{item.description}</Text>
              <Text style={{ fontSize: 15, width: '10%' }}>Price: {item.price}원</Text>
              <TouchableOpacity
                onPress={() => {
                  setProductName(item.name);
                  setProductDescription(item.description);
                  setProductPrice(item.price);
                  setProductImage(item.image);
                  setEditingProduct(index);
                }}
              >
                <Text style={{ backgroundColor: '#ffe071', color: 'white', padding: 10, borderRadius: 5, marginRight: '1%' }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProduct(index)}>
                <Text style={{ backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 5 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ImageBackground>
    </View>
  );
};

type CategorySelectionProps = {
  categories: string[];
  setSelectedCategoryIndex: (index: number) => void;
  setIndex: (index: number) => void;
};

const CategorySelection: React.FC<CategorySelectionProps> = ({ categories, setSelectedCategoryIndex, setIndex }) => (
  <View style={styles.tabContainer}>
    <ImageBackground
      source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
      style={styles.fullScreenImage}
      resizeMode="stretch"
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Select Category</Text>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryIndex(index);
                setIndex(2);
              }}
              style={styles.categoryButton}
            >
              <Text style={styles.categoryItem}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  </View>
);

type screenType = 'ManagerMain';
type Props = {
  screenChange: (screen: screenType) => void;
};

const ProductManagementScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
      screenChange(screenName);
  };
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const handleAddCategory = () => {
    if (categoryName) {
      if (editingCategory !== null) {
        const updatedCategories = categories.map((cat, index) =>
          index === editingCategory ? categoryName : cat
        );
        setCategories(updatedCategories);
        setEditingCategory(null);
      } else {
        setCategories([...categories, categoryName]);
      }
      setCategoryName('');
    } else {
      Alert.alert('Error', 'Category name cannot be empty');
    }
  };

  const handleDeleteCategory = (index: number) => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setCategories(categories.filter((_, i) => i !== index));
            setSelectedCategoryIndex(null);
            setProducts(products.filter(product => product.categoryIndex !== index));
          },
        },
      ]
    );
  };

  const handleAddProduct = () => {
    if (productName && productPrice && selectedCategoryIndex !== null) {
      if (editingProduct !== null) {
        const updatedProducts = products.map((product, index) =>
          index === editingProduct ? { name: productName, description: productDescription, price: productPrice, image: productImage, categoryIndex: selectedCategoryIndex } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      } else {
        setProducts([...products, { name: productName, description: productDescription, price: productPrice, image: productImage, categoryIndex: selectedCategoryIndex }]);
      }
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage(null);
    } else {
      Alert.alert('Error', 'Product name, price, or category cannot be empty');
    }
  };

  const handleDeleteProduct = (index: number) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => setProducts(products.filter((_, i) => i !== index)) },
      ]
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) { // 'canceled'로 수정
      setProductImage(result.assets[0].uri); // 'assets[0].uri'를 통해 이미지 URI 가져오기
    }
  };

  const renderScene = SceneMap({
    categories: () => (
      <CategoryManagement
        categories={categories}
        handleAddCategory={handleAddCategory}
        handleDeleteCategory={handleDeleteCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
    ),
    products: () => (
      selectedCategoryIndex !== null ? (
        <ProductManagement
          products={products}
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          handleAddProduct={handleAddProduct}
          handleDeleteProduct={handleDeleteProduct}
          productName={productName}
          setProductName={setProductName}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productImage={productImage}
          setProductImage={setProductImage}
          pickImage={pickImage}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      ) : (
        <View style={styles.tabContainer}>
          <Text style={styles.title}>Please select a category to manage products.</Text>
        </View>
      )
    ),
    categorySelection: () => (
      <CategorySelection
        categories={categories}
        setSelectedCategoryIndex={setSelectedCategoryIndex}
        setIndex={setIndex}
      />
    ),
  });

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'categories', title: 'Categories' },
    { key: 'categorySelection', title: 'Select Category' },
    { key: 'products', title: 'Products' },
  ]);

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
      height: 70,
    },
    itemText: {
      fontSize: 18,
      color: 'black',
      flex: 1,
    },
    itemText2: {
      fontSize: 48,
      color: 'black',
      width: '30%',
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
    input2: {
      height: 30,
      borderColor: 'white',
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 5,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: '#b5a883',
      padding: 10,
      borderRadius: 5,
    },
    image: {
      width: 50,
      height: 50,
      marginVertical: 10,
      marginRight: '2%',
    },
    categoryItem: {
      padding: 15,
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      textAlign: 'center',
      color: 'white',
    },
    listWrapper: {
      width: '50%',
      alignSelf: 'center',
      marginTop: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    imagePickerButton: {
      backgroundColor: '#b5a883',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      alignItems: 'center',
    },
    // 추가된 categoryButton 스타일
    categoryButton: {
      backgroundColor: '#b5a883',
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      alignItems: 'center',
    },
  });

export default ProductManagementScreen;
