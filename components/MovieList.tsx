import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import { MovieListItem, MovieCategory } from "@/utils/types";
import { useApiClent } from "@/utils/ApiClientProvider";
import { Text } from "./Text";
import { MovieListCard } from "./MovieListCard";
import { colors } from "@/constants/Colors";

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
          showsVerticalScrollIndicator={false}
          data={data?.pages
            .flatMap((page) => page?.data?.results)
            ?.filter((item): item is MovieListItem => !!item)}
          keyExtractor={(item) => `${item?.id}`}
          renderItem={({ item }) => <MovieListCard data={item} />}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={() => (
            <View>
              {hasNextPage ? (
                <TouchableOpacity
                  onPress={() => fetchNextPage()}
                  style={styles.button}
                >
                  {isFetchingNextPage ? (
                    <ActivityIndicator size="large" color={colors.white} />
                  ) : (
                    <Text color="white" size={20}>
                      Load More
                    </Text>
                  )}
                </TouchableOpacity>
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

    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
