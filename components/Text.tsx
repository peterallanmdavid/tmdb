import { Colors, colors } from "@/constants/Colors";
import { type PropsWithChildren } from "react";
import {
  StyleSheet,
  Text as RNText,
  type TextProps,
  type TextStyle,
} from "react-native";

type fontWeight = "regular" | "bold" | "black" | "light" | "thin";

export type MyTextProps = {
  text?: TextProps["children"];
  style?: TextProps["style"];
  weight?: fontWeight;
  textAlign?: TextStyle["textAlign"];
  color?: Colors;
  size?: TextStyle["fontSize"];
  underline?: boolean;
  textProps?: TextProps;
  uppercase?: boolean;
  capitalize?: boolean;
  marginBottom?: TextStyle["marginBottom"];
  marginTop?: TextStyle["marginTop"];
  marginLeft?: TextStyle["marginLeft"];
  marginRight?: TextStyle["marginRight"];
};

export const Text = ({
  text,
  style,
  weight,
  textAlign = "auto",
  color = "default",
  size,
  underline,
  textProps,
  uppercase,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  children,
}: PropsWithChildren<MyTextProps>) => {
  const inlineStyles: TextStyle = {
    textDecorationLine: !!underline ? "underline" : "none",
    color: colors[color],
    textAlign,
    fontSize: size,
    textTransform: uppercase ? "uppercase" : "none",
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    fontWeight: weight,
  };
  return (
    <RNText style={[inlineStyles, style]} {...textProps}>
      {children ? children : text}
    </RNText>
  );
};

const styles = StyleSheet.create({});
