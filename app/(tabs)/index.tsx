import { StyleSheet, View } from "react-native";

import React from "react";

import { MovieList } from "@/components/MovieList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MovieList category="top_rated" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
