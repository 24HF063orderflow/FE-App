import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';

type MusicItem = {
  title: string;
  artist: string;
};

type screenType = 'ManagerMain';

const mockMusicList: MusicItem[] = [
  { title: 'Song 1', artist: 'Artist 1' },
  { title: 'Song 2', artist: 'Artist 2' },
];

const getMusicList = async (): Promise<MusicItem[]> => {
  return mockMusicList;
};

const addMusicList = async (item: MusicItem): Promise<void> => {
  console.log('Adding music:', item);
};

const deleteMusicList = async (item: MusicItem): Promise<void> => {
  console.log('Deleting music:', item);
};


type Props = {
  screenChange: (screen: screenType) => void;
};

const MusicRequestListScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };
  const [musicList, setMusicList] = useState<MusicItem[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newArtist, setNewArtist] = useState<string>('');

  useEffect(() => {
    (async () => {
      const list = await getMusicList();
      setMusicList(list);
    })();
  }, []);

  const handleAddMusic = async () => {
    if (newTitle && newArtist) {
      const newMusic: MusicItem = { title: newTitle, artist: newArtist };
      try {
        await addMusicList(newMusic);
        setMusicList([...musicList, newMusic]);
        setNewTitle('');
        setNewArtist('');
      } catch (error) {
        console.error('Error adding music', error);
      }
    } else {
      Alert.alert('입력 오류', '제목과 가수를 모두 입력해주세요.');
    }
  };

  const handleDeleteMusic = async (item: MusicItem) => {
    try {
      await deleteMusicList(item);
      setMusicList(musicList.filter((music) => music.title !== item.title || music.artist !== item.artist));
    } catch (error) {
      console.error('Error deleting music', error);
    }
  };

  const renderItem = ({ item }: { item: MusicItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemText}>{item.artist}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMusic(item)}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>음악 신청 리스트</Text>
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
        data={musicList}
        renderItem={renderItem}
        keyExtractor={(item) => item.title + item.artist}
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
          placeholder="가수"
          value={newArtist}
          onChangeText={setNewArtist}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddMusic}>
          <Text style={styles.addButtonText}>음악 추가</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#FFF',
    fontSize: 16,
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
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default MusicRequestListScreen;