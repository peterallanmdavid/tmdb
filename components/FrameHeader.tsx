import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";
import { colors } from "@/constants/Colors";

export type BackButtonType = "Back" | "Close" | "None";
export interface FrameHeaderProps {
  headerType?: "Search" | "Title" | "None" | "SearchWithBack";
  withoutBack?: boolean;
  title?: string;
  backButtonType?: BackButtonType;
}

export const FrameHeader: React.FC<FrameHeaderProps> = ({
  title,
  backButtonType,
  withoutBack,
}) => {
  const navigation = useNavigation();
  const router = useRouter();
  const backIcon = backButtonType === "Close" ? "cross" : "chevron-left";

  const backgroundColor = colors.primary;

  return (
    <View style={[{ backgroundColor }, styles.headerContainer]}>
      {backButtonType === "None" ? (
        <View
          style={[styles.leftContainer, styles.titleHeaderSideContent]}
        ></View>
      ) : (
        <TouchableOpacity
          style={[styles.leftContainer, styles.titleHeaderSideContent]}
          onPress={() =>
            backButtonType === "Close"
              ? navigation.getParent()?.goBack()
              : router.back()
          }
          disabled={withoutBack}
        >
          {!withoutBack && <Entypo name={backIcon} size={30} color="white" />}
        </TouchableOpacity>
      )}

      <View style={styles.midContainer}>
        <Text textAlign="center" color="white" size={20} weight="bold">
          {title}
        </Text>
      </View>
      <View style={[styles.rightcontainer, styles.titleHeaderSideContent]} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {},
  midContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  leftContainer: {
    alignItems: "flex-start",
  },
  rightcontainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  titleHeaderSideContent: { width: 50 },
});
