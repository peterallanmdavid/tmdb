import { fetchMovies } from "@/utils/apiClient";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Card } from "./Card";
import { ThemedView } from "./ThemedView";
import { Movie, MovieCategory, MoviesResponse } from "@/utils/types";
import { useApiClent } from "@/utils/ApiClientProvider";
import { ThemedText } from "./ThemedText";

interface MovieListProps {
  category: MovieCategory;
}

export const MovieList: React.FC<MovieListProps> = ({ category }) => {
  const { fetchMovies, configLoading } = useApiClent();

  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    enabled: !configLoading,
    queryKey: ["movies", category],
    queryFn: ({ pageParam = 1 }) => {
      return fetchMovies(category, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({
      queryKey: ["movies", category],
    });
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {status === "pending" ? (
        <ActivityIndicator size="large" />
      ) : status === "error" ? (
        <ThemedText>Error Fetching Movies</ThemedText>
      ) : (
        <FlatList
          data={data?.pages.flatMap((page) => page?.data?.results)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 10 }}>
              <ThemedText>{item?.title}</ThemedText>
            </Card>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={() => (
            <View style={{ padding: 20 }}>
              {isFetchingNextPage ? (
                <ActivityIndicator size="large" />
              ) : hasNextPage ? (
                <Button title="Load More" onPress={() => fetchNextPage()} />
              ) : (
                <ThemedText>No more data</ThemedText>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
