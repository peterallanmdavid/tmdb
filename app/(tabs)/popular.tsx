import { StyleSheet, View } from "react-native";

import React from "react";

import { MovieList } from "@/components/MovieList";
import { Frame } from "@/components/Frame";

export default function PopularScreen() {
  return (
    <Frame style={styles.container} withoutBack title="Popular">
      <MovieList category="popular" />
    </Frame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
