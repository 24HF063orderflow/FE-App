import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

type screenType = 'ManagerMain' ;

// 타입 정의
interface Feedback {
  id: string;
  feedback: string;
  rating: number;
  response: string;
}

// 예시 데이터 (Mock Data)
const mockFeedbackList: Feedback[] = [
  { id: '1', feedback: 'App is great!', rating: 5, response: '' },
  { id: '2', feedback: 'Needs improvement.', rating: 3, response: '' },
  { id: '3', feedback: 'Could be better.', rating: 4, response: '' },
];

// 예시 함수 (데이터 가져오기)
const getFeedbackList = async (): Promise<Feedback[]> => {
  // 실제 애플리케이션에서는 API 호출이나 데이터베이스 쿼리로 교체 필요
  return mockFeedbackList;
};

// 예시 함수 (답변 추가)
const addFeedbackResponse = async (id: string, response: string): Promise<void> => {
  // 실제 애플리케이션에서는 API 호출이나 데이터베이스 쿼리로 교체 필요
  console.log(`Adding response to feedback ${id}: ${response}`);
};

type Props = {
    screenChange: (screen: screenType) => void;
  };
  
  const Suggestions = ({ screenChange }: Props) => {
    const handlePress = (screenName: screenType) => {
      screenChange(screenName);
    };


  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [responseText, setResponseText] = useState<string>('');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const list = await getFeedbackList();
      setFeedbackList(list);
    })();
  }, []);

  const handleAddResponse = async () => {
    if (selectedFeedbackId && responseText.trim()) {
      try {
        await addFeedbackResponse(selectedFeedbackId, responseText);
        setFeedbackList(feedbackList.map(feedback =>
          feedback.id === selectedFeedbackId
            ? { ...feedback, response: responseText }
            : feedback
        ));
        setResponseText('');
        setSelectedFeedbackId(null);
      } catch (error) {
        console.error('Error adding response', error);
      }
    } else {
      Alert.alert('입력 오류', '답변을 입력해주세요.');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <Text key={index} style={index < rating ? styles.starFilled : styles.starEmpty}>★</Text>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }: { item: Feedback }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.feedback}</Text>
      {renderStars(item.rating)}
      {item.response ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>답변:</Text>
          <Text style={styles.responseText}>{item.response}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedFeedbackId(item.id);
          }}
        >
          <Text style={styles.addButtonText}>답변 달기</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>건의사항 리스트</Text>
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
        data={feedbackList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {selectedFeedbackId && (
        <View style={styles.responseForm}>
          <TextInput
            style={styles.input}
            placeholder="답변을 입력하세요..."
            value={responseText}
            onChangeText={setResponseText}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddResponse}
          >
            <Text style={styles.addButtonText}>답변 추가</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  title: {
    color: '#FFD700',
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#555',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  itemText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  starFilled: {
    color: '#FFD700',
    fontSize: 16,
  },
  starEmpty: {
    color: '#888',
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 10,
  },
  responseTitle: {
    color: '#FFD700',
    fontSize: 16,
  },
  responseText: {
    color: '#FFF',
    fontSize: 16,
  },
  responseForm: {
    marginTop: 20,
    backgroundColor: '#C3A36A',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
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
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Suggestions;
