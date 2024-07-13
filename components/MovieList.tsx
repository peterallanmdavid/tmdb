import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Card } from "./Card";

import { Movie, MovieCategory } from "@/utils/types";
import { useApiClent } from "@/utils/ApiClientProvider";
import { Text } from "./Text";
import { useRouter } from "expo-router";
import { MovieListCard } from "./MovieListCard";

interface MovieListProps {
  category: MovieCategory;
}

export const MovieList: React.FC<MovieListProps> = ({ category }) => {
  const { fetchMovies, configLoading } = useApiClent();

  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
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
      {status === "pending" || configLoading ? (
        <ActivityIndicator size="large" />
      ) : status === "error" ? (
        <Text>Error Fetching Movies</Text>
      ) : (
        <FlatList
          data={data?.pages
            .flatMap((page) => page?.data?.results)
            ?.filter((item): item is Movie => !!item)}
          keyExtractor={(item) => `${item?.id}`}
          renderItem={({ item }) => <MovieListCard data={item} />}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={() => (
            <View style={{ padding: 20 }}>
              {isFetchingNextPage ? (
                <ActivityIndicator size="large" />
              ) : hasNextPage ? (
                <Button title="Load More" onPress={() => fetchNextPage()} />
              ) : (
                <Text>No more data</Text>
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
    marginTop: 20,
    justifyContent: "center",
  },
});
