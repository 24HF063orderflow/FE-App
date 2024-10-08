import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

type AdItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};
type Props = {
    screenChange: (screen: screenType) => void;
  };

type screenType = 'ManagerMain';
// 예시 데이터 (Mock Data)
const mockAdList: AdItem[] = [
  { id: '1', title: 'Ad 1', description: 'Description for Ad 1', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Ad 2', description: 'Description for Ad 2', image: 'https://via.placeholder.com/150' },
];

// 예시 함수 (광고 추가)
const addAd = async (ad: AdItem): Promise<void> => {
  console.log('Adding ad:', ad);
};

// 예시 함수 (광고 삭제)
const deleteAd = async (id: string): Promise<void> => {
  console.log('Deleting ad with id:', id);
};

const Ad = ({ screenChange }: Props) => {
    const handlePress = (screenName: screenType) => {
      screenChange(screenName);
    };
  const [adList, setAdList] = useState<AdItem[]>(mockAdList);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newImage, setNewImage] = useState<string>('');

  const handleAddAd = async () => {
    if (newTitle && newDescription && newImage) {
      const newAd: AdItem = {
        id: Date.now().toString(),
        title: newTitle,
        description: newDescription,
        image: newImage,
      };
      try {
        await addAd(newAd);
        setAdList([...adList, newAd]);
        setNewTitle('');
        setNewDescription('');
        setNewImage('');
      } catch (error) {
        console.error('Error adding ad', error);
      }
    } else {
      Alert.alert('입력 오류', '제목, 설명, 이미지 URL을 모두 입력해주세요.');
    }
  };

  const handleDeleteAd = async (id: string) => {
    try {
      await deleteAd(id);
      setAdList(adList.filter(ad => ad.id !== id));
    } catch (error) {
      console.error('Error deleting ad', error);
    }
  };

  const renderItem = ({ item }: { item: AdItem }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteAd(item.id)}
      >
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>광고 관리</Text>
      <TouchableOpacity
                    onPress={() => handlePress('ManagerMain')}
                    style={styles.backBtn}
                >
                    <Image
                        source={require('../assets/images/backbutton.png')}  // 뒤로가기 버튼 이미지 사용
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
      <FlatList
        data={adList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addForm}>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="설명"
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="이미지 URL"
          value={newImage}
          onChangeText={setNewImage}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddAd}
        >
          <Text style={styles.addButtonText}>광고 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  pageTitle: {
    color: '#FFD700',
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#555',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#FFF',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  addForm: {
    marginTop: 20,
    backgroundColor: '#C3A36A',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 4,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
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
});

export default Ad;