import { Movie } from "@/utils/types";
import { useRouter } from "expo-router";
import React from "react";
import { Card } from "./Card";
import { Text } from "./Text";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
interface MovieListCardProps {
  data: Movie;
}

export const MovieListCard: React.FC<MovieListCardProps> = ({ data }) => {
  const router = useRouter();
  const releasedDate = new Date(data?.release_date).getFullYear();
  return (
    <Card
      style={styles.container}
      onPress={() => router.push(`/movie-details/${data?.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={data?.poster_path}
          contentFit="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <View style={{ flex: 1 }}>
          <Text
            weight="bold"
            size={20}
            marginBottom={15}
            textProps={{ numberOfLines: 1 }}
          >
            {data?.title}
          </Text>
          <Text size={16} marginBottom={5}>
            Year: {releasedDate}
          </Text>

          <Text size={16}>
            Genre: {data?.genres?.map((gr) => gr.name)?.join(", ")}
          </Text>
        </View>

        <View style={styles.rating}>
          <FontAwesome name="star" size={16} color={colors.rating} />
          <Text size={16} marginLeft={10}>
            {data?.vote_average?.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    width: "100%",
    height: "100%",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  details: {
    flexDirection: "column",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  imageContainer: {
    height: 150,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.grey1,
  },
});
