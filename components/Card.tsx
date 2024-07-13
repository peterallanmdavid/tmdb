import React, { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";
import { StyleSheet, ViewStyle, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface CardProps {
  style: ViewStyle;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  style,
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  return (
    <ThemedView style={[{ backgroundColor }, styles.container, style]}>
      {children}
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});
