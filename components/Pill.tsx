import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";
import { colors } from "@/constants/Colors";

interface PillProps {}

export const Pill: React.FC<PropsWithChildren<PillProps>> = ({ children }) => {
  return (
    <View style={styles.pill}>
      <Text color="grey3">{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.grey4,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
});
