import React, { PropsWithChildren } from "react";

import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors } from "@/constants/Colors";

interface CardProps {
  style: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  style,
  onPress,
}) => {
  const backgroundColor = colors.white;

  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      style={[{ backgroundColor }, styles.container, style]}
      disabled={!onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
});
