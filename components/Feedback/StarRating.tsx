import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  maxStars?: number;
  rating: number;
  onRatingChange: (rating: number) => void;
};

export const StarRating = ({ maxStars = 5, rating, onRatingChange }: Props) => {
  const handleStarPress = (star: number) => {
    onRatingChange(star);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
          <Text style={styles.star}>{index < rating ? "⭐" : "☆"}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: scale(10)
  },
  star: {
    fontSize: scale(20),
    marginHorizontal: scale(5)
  }
});

export default StarRating;
