import { StyleSheet, View } from "react-native";

import React from "react";

import { MovieList } from "@/components/MovieList";
import { Frame } from "@/components/Frame";

export default function UpcomingScreen() {
  return (
    <Frame style={styles.container} withoutBack title="Upcoming Movies">
      <MovieList category="upcoming" />
    </Frame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
