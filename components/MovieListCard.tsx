import { MovieListItem } from "@/utils/types";
import { useRouter } from "expo-router";
import React from "react";
import { Card } from "./Card";
import { Text } from "./Text";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Pill } from "./Pill";

interface MovieListCardProps {
  data: MovieListItem;
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
        <View style={styles.detailsContainer}>
          <Text
            weight="bold"
            size={20}
            marginBottom={5}
            textProps={{ numberOfLines: 1 }}
          >
            {data?.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text size={16} weight="bold" color="grey3" marginRight={5}>
              {releasedDate}
            </Text>
            <Entypo name="dot-single" size={18} color={colors.grey3} />
            <Text
              size={16}
              weight="bold"
              color="grey3"
              marginRight={10}
              uppercase
            >
              {data?.original_language}
            </Text>
          </View>
          <View style={styles.bottomDetails}>
            {data?.genres?.map(({ name, id }) => (
              <Pill key={id}>{name}</Pill>
            ))}
          </View>
        </View>
        <View style={styles.rating}>
          <FontAwesome name="star" size={20} color={colors.rating} />
          <Text size={20} marginLeft={10} weight="bold" color="grey3">
            {data?.vote_average?.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
  },
  bottomDetails: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  detailsContainer: { flex: 1 },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    height: 150,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.grey1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    flexDirection: "column",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
});
