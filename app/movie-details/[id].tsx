import { Frame } from "@/components/Frame";
import { Text } from "@/components/Text";
import { colors } from "@/constants/Colors";
import { useApiClent } from "@/utils/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { FontAwesome } from "@expo/vector-icons";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const convertMinutesToHoursMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}min`;
};

const convertToReadableFormat = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export default function MovieDetails() {
  const { id = "" } = useLocalSearchParams();
  const { fetchMovieDetails } = useApiClent();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchMovieDetail", id],
    queryFn: () => fetchMovieDetails(id as string),
  });

  const releasedDate = new Date(data?.release_date as string).getFullYear();
  return (
    <Frame title={data?.original_title} style={{ paddingHorizontal: 0 }}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={data?.backdrop_path}
              contentFit="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text size={24} weight="bold" marginTop={20} marginBottom={5}>
              {data?.original_title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text size={18} weight="bold" color="grey3">
                {releasedDate}
              </Text>
              <Entypo name="dot-single" size={18} color="black" />
              <Text size={18} weight="bold" color="grey3">
                {convertMinutesToHoursMinutes(data?.runtime || 0)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {data?.genres?.map(({ name }) => (
                <View style={styles.pill}>
                  <Text color="white">{name}</Text>
                </View>
              ))}
            </View>

            <Text
              marginTop={20}
              marginBottom={10}
              size={16}
              style={{ overflow: "hidden" }}
              textProps={{ ellipsizeMode: "tail", numberOfLines: 6 }}
            >
              {data?.overview}
            </Text>

            <View style={styles.rating}>
              <FontAwesome name="star" size={20} color={colors.rating} />
              <Text
                size={16}
                marginLeft={8}
                weight="bold"
                color="grey3"
                marginRight={20}
              >
                {data?.vote_average?.toFixed(1)} / 10
              </Text>

              <FontAwesome6
                name="sack-dollar"
                size={20}
                color={colors.rating}
              />
              <Text size={16} marginLeft={8} weight="bold" color="grey3">
                {convertToReadableFormat(data?.revenue || 0)}
              </Text>
            </View>
            {!!data?.tagline && (
              <Text
                marginTop={30}
                size={25}
                marginLeft={8}
                color="grey3"
                marginRight={20}
                textAlign="center"
                style={{ fontStyle: "italic" }}
              >
                "{data?.tagline}"
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </Frame>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.grey3,
    borderRadius: 20,
    marginRight: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: {
    padding: 10,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    height: 300,

    backgroundColor: colors.grey1,
  },
  posterContainer: {
    height: 150,
    width: 100,
    backgroundColor: colors.grey1,
  },
});
