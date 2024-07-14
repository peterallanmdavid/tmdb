import { StyleSheet, View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FrameHeader } from "./FrameHeader";
import { PropsWithChildren } from "react";

export type BackButtonType = "Back" | "Close" | "None";
type FrameProps = {
  title?: string;
  backButtonType?: BackButtonType;
  style?: ViewProps["style"];
  noHeader?: boolean;
  withoutBack?: boolean;
};

export const Frame: React.FC<PropsWithChildren<FrameProps>> = ({
  children,
  style,
  title,
  backButtonType,
  noHeader,
  withoutBack,
}) => {
  return (
    <SafeAreaView style={[styles.container]} edges={["top"]}>
      {!noHeader && (
        <FrameHeader
          title={title}
          backButtonType={backButtonType}
          withoutBack={withoutBack}
        />
      )}
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,

    paddingHorizontal: 10,
  },
});
