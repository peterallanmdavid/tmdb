import { StyleSheet, View } from "react-native";

import React from "react";

import { MovieList } from "@/components/MovieList";
import { Frame } from "@/components/Frame";

export default function HomeScreen() {
  return (
    <Frame style={styles.container} withoutBack title="Top Rated Movies">
      <MovieList category="top_rated" />
    </Frame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
