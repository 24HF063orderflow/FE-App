import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MusicRequestList from "../components/MusicRequest/MusicRequestList";
import { addMusicList, getMusicList } from "../utils/musicRequest";
import { scale } from "react-native-size-matters";
import CallButton from "../components/CallButton";

type Props = {
  screenChange: (screen: screenType) => void;
};

const MusicRequestScreen = ({ screenChange }: Props) => {
  const [musicList, setMusicList] = useState<musicType[]>([]);
  const [musicTitle, setMusicTitle] = useState("");
  const [musicArtist, setMusicArtist] = useState("");

  const handleAddToMusicList = async (item: musicType) => {
    try {
      await addMusicList(item);
      setMusicList(await getMusicList());
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  useEffect(() => {
    (async () => {
      setMusicList(await getMusicList());
    })();
  }, []);

  return (
    <>
      <TopBar homeButtonVisible={true} screenChange={screenChange} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.songList}>
            <Text style={styles.sectionTitle}>노래신청</Text>
            <MusicRequestList musicList={musicList} />
          </View>

          <View style={styles.requestForm}>
            <TextInput style={styles.input} placeholder="제목" value={musicTitle} onChangeText={setMusicTitle} />
            <TextInput style={styles.input} placeholder="가수" value={musicArtist} onChangeText={setMusicArtist} />
            <CallButton
              color="black"
              onPress={() => {
                if (musicTitle && musicArtist) {
                  handleAddToMusicList({ title: musicTitle, artist: musicArtist });
                } else {
                  alert("제목과 가수를 모두 입력해주세요");
                }
              }}
            >
              요청하기
            </CallButton>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    padding: scale(10)
  },
  songList: {
    flex: 2,
    backgroundColor: "#555",
    padding: scale(10),
    marginRight: scale(10),
    borderRadius: scale(10)
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: scale(16),
    marginBottom: scale(10)
  },
  requestForm: {
    flex: 1,
    backgroundColor: "#C3A36A",
    padding: scale(20),
    borderRadius: scale(10),
    justifyContent: "center"
  },
  input: {
    backgroundColor: "#FFF",
    padding: scale(5),
    marginBottom: scale(10),
    borderRadius: scale(5),
    fontSize: scale(10)
  }
});

export default MusicRequestScreen;
