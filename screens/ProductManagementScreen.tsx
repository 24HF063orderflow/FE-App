import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Image, ImageBackground } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { scale } from "react-native-size-matters";

const initialLayout = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height / 10
};

const CATEGORIES = ["BEST", "SIGNATURE", "MAIN", "SIDE", "DRINK"];

type Product = {
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  categoryIndex: number;
  categoryName: string;
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
  const defaultImageUri = "https://github.com/24HF063orderflow/Image/blob/main/Main/photo.png?raw=true";

  return (
    <View style={styles.tabContainer}>
      <ImageBackground
        source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true" }}
        style={styles.fullScreenImage}
        resizeMode="stretch"
      >
        <View style={{ width: "100%", height: "75%", flexDirection: "row", backgroundColor: "#767676" }}>
          <View style={{ width: "50%", height: "100%", flexDirection: "row", borderColor: "black", borderStyle: "solid" }}>
            {productImage ? (
              <Image source={{ uri: productImage }} style={{ width: "98%", height: "94%", marginLeft: "2%", marginTop: "2%" }} />
            ) : (
              <TouchableOpacity onPress={pickImage} style={{ width: "98%", height: "94%", marginLeft: "2%", marginTop: "2%" }}>
                <ImageBackground source={{ uri: defaultImageUri }} style={{ width: "100%", height: "100%" }} resizeMode="stretch" />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ width: "40%", height: "100%", flexDirection: "column", marginLeft: "5%" }}>
            <Text style={{ fontSize: scale(20), color: "black", textAlign: "center", marginBottom: "5%" }}>
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
              <Text style={styles.buttonText}>{editingProduct !== null ? "Update Product" : "Add Product"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.imageUrl || defaultImageUri }} style={styles.image} />
              <Text style={styles.itemText2}>{item.name}</Text>
              <Text style={{ fontSize: 15, width: "35%" }}>{item.description}</Text>
              <Text style={{ fontSize: 15, width: "10%" }}>Price: {item.price}원</Text>
              <TouchableOpacity
                onPress={() => {
                  setProductName(item.name);
                  setProductDescription(item.description);
                  setProductPrice(item.price);
                  setProductImage(item.imageUrl);
                  setEditingProduct(index);
                }}
              >
                <Text style={{ backgroundColor: "#ffe071", color: "white", padding: 10, borderRadius: 5, marginRight: "1%" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProduct(index)}>
                <Text style={{ backgroundColor: "red", color: "white", padding: 10, borderRadius: 5 }}>Delete</Text>
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
      source={{ uri: "https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true" }}
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
                setIndex(1);
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

type screenType = "ManagerMain";
type Props = {
  screenChange: (screen: screenType) => void;
};

const ProductManagementScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };
  const [categories, setCategories] = useState<string[]>(CATEGORIES);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem("jwtToken");
      if (savedToken) {
        setToken(savedToken);
        const decodedToken: any = jwtDecode(savedToken);
        setUserId(decodedToken.id);
      }
    };
    fetchToken();
  }, []);

  const handleAddProduct = async () => {
    if (productName && productPrice && selectedCategoryIndex !== null && userId) {
      if (editingProduct !== null) {
        const updatedProducts = products.map((product, index) =>
          index === editingProduct
            ? {
                name: productName,
                description: productDescription,
                price: productPrice,
                imageUrl: productImage,
                categoryIndex: selectedCategoryIndex,
                categoryName: categories[selectedCategoryIndex]
              }
            : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      } else {
        try {
          const formData = new FormData();
          formData.append("name", productName);
          formData.append("description", productDescription);
          formData.append("price", productPrice);
          formData.append("categoryName", categories[selectedCategoryIndex]);
          if (productImage) {
            formData.append("image", {
              uri: productImage,
              type: "image/jpeg",
              name: "product.jpg"
            } as any);
          }

          const response = await axios.post(`http://13.124.22.36:8080/api/food-management/${userId}/foodRegister`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            Alert.alert("Success", "Product added successfully");
            setProducts([
              ...products,
              {
                name: productName,
                description: productDescription,
                price: productPrice,
                imageUrl: productImage,
                categoryIndex: selectedCategoryIndex,
                categoryName: categories[selectedCategoryIndex]
              }
            ]);
          }
        } catch (error) {
          Alert.alert("Error", "Failed to add product");
        }
      }
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductImage(null);
    } else {
      Alert.alert("Error", "Product name, price, or category cannot be empty");
    }
  };

  const handleDeleteProduct = (index: number) => {
    Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setProducts(products.filter((_, i) => i !== index)) }
    ]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };

  const fetchProducts = async () => {
    if (userId && selectedCategoryIndex !== null) {
      try {
        const response = await axios.get(`http://13.124.22.36:8080/api/food-management/${userId}/foods`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const filteredProducts = response.data.filter((product: Product) => product.categoryName === categories[selectedCategoryIndex]);
          setProducts(filteredProducts);
          setProducts(filteredProducts);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch products");
      }
    }
  };

  useEffect(() => {
    if (selectedCategoryIndex !== null) {
      fetchProducts();
    }
  }, [selectedCategoryIndex]);

  const renderScene = SceneMap({
    products: () =>
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
      ),
    categorySelection: () => (
      <CategorySelection categories={categories} setSelectedCategoryIndex={setSelectedCategoryIndex} setIndex={setIndex} />
    )
  });

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "categorySelection", title: "Select Category" },
    { key: "products", title: "Products" }
  ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress("ManagerMain")} style={styles.backBtn}>
        <Image source={require("../assets/images/backbutton.png")} style={styles.backButtonImage} />
      </TouchableOpacity>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#ffe25e" }}
            style={{ backgroundColor: "black" }}
            labelStyle={{ color: "white" }}
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
    backgroundColor: "#fff"
  },
  backBtn: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1
  },
  backButtonImage: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  fullScreenImage: {
    width: "100%",
    height: "100%"
  },
  tabContainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontSize: 24
  },
  item: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 70
  },
  itemText2: {
    fontSize: 48,
    color: "black",
    width: "30%"
  },
  image: {
    width: 50,
    height: 50,
    marginVertical: 10,
    marginRight: "2%"
  },
  categoryItem: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    textAlign: "center",
    color: "white"
  },
  listWrapper: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },
  input2: {
    height: scale(30),
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  imagePickerButton: {
    backgroundColor: "#b5a883",
    padding: 10,
    height: scale(30),
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: scale(16)
  },
  button: {
    backgroundColor: "#b5a883",
    padding: 10,
    borderRadius: 5,
    height: scale(30)
  },
  categoryButton: {
    backgroundColor: "#b5a883",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center"
  }
});

export default ProductManagementScreen;
