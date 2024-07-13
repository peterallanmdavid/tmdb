import { StyleSheet, View } from "react-native";

import React from "react";

import { MovieList } from "@/components/MovieList";

export default function UpcomingScreen() {
  return (
    <View style={styles.container}>
      <MovieList category="upcoming" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
