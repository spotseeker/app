import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
type ScreenProp = {
  children: ReactNode;
};
function Screen({ children }: ScreenProp) {
  return (
    <View
      className="w-full flex justify-center h-full px-4 my-6"
      style={{
        minHeight: Dimensions.get("window").height - 100,
      }}
    >
      {children}
    </View>
  );
}

export default Screen;
