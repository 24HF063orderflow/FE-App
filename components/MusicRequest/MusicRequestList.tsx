import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import MusicRequestCard from "./MusicRequestCard";
import { scale } from "react-native-size-matters";

type Props = {
  musicList: musicType[];
};

const MusicRequestList = ({ musicList }: Props) => {
  return (
    <View style={styles.songItem}>
      <FlatList data={musicList} renderItem={({ item }) => <MusicRequestCard item={item} />} keyExtractor={(v, i) => v.title + i} />
    </View>
  );
};

const styles = StyleSheet.create({
  songItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(10)
  }
});

export default MusicRequestList;
