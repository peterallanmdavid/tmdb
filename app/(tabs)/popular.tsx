import { View, Text, FlatList } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "../../apiClient/index";
import React from "react";

export default function PopularScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovies,
  });

  return (
    <View>
      <FlatList
        data={data?.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.title}</Text>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
