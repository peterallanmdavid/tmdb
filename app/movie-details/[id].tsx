import { Frame } from "@/components/Frame";
import { Text } from "@/components/Text";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function MovieDetails() {
  const { id = "" } = useLocalSearchParams();

  return (
    <Frame>
      <Text>This is a Moviedetails {id}</Text>
    </Frame>
  );
}
