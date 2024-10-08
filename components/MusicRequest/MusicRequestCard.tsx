import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  item: musicType;
};

const MusicRequestCard = ({ item }: Props) => {
  return (
    <Pressable style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e094", marginBottom: scale(5) }}>
      <View>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songDetails}>{item.artist}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  songTitle: {
    color: "#FFF",
    fontSize: scale(16)
  },
  songDetails: {
    color: "#CCC",
    fontSize: scale(12)
  }
});

export default MusicRequestCard;
