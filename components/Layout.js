import { View } from "react-native";
import React from "react";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <Footer />
    </View>
  );
}
