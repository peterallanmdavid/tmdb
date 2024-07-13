import { StyleSheet, View } from "react-native";

import React from "react";

import { MovieList } from "@/components/MovieList";

export default function PopularScreen() {
  return (
    <View style={styles.container}>
      <MovieList category="popular" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
