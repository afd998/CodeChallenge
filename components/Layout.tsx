import React, {
  ChildContextProvider,
  ReactChild,
  ReactChildren,
  useState,
} from "react";
const BG_IMG =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F264%2F902%2Foriginal%2Fvector-scifi-space-background-for-ui-game.jpg&f=1&nofb=1";

import { View, Text, Image, StyleSheet } from "react-native";
function Layout({ children }: { children: JSX.Element[] }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={{
          uri: BG_IMG,
        }}
      ></Image>

      <Text style={styles.title}> Near Earth Objects</Text>
      {children}
    </View>
  );
}

export default Layout;

const styles = StyleSheet.create({
  title: {
    marginVertical: 50,
    textAlign: "center",
    elevation: 30,
    color: "#FFFFFF",
    fontSize: 40,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  container: {
    backgroundColor: "#CCDDEE",
    minHeight: "100%",
    maxHeight: "100%",
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 1,
  },
});
