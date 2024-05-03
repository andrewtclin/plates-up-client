import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { HomeIcon } from "react-native-heroicons/outline";
import { THEME_HEX } from "../utils/data";

const FooterButton = ({ title, onPress }) => (
  <TouchableOpacity
    className="flex-1 items-center justify-center"
    onPress={onPress}
  >
    {title === "Home" ? (
      <View className="flex-col justify-center items-center pt-4">
        <HomeIcon size={25} color={THEME_HEX} />
        <Text className="text-xs text-primaryBlue">Home</Text>
      </View>
    ) : (
      <Text className="flex-row justify-center items-center text-sm font-semibold text-primaryBlue">
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const Footer = () => {
  const navigation = useNavigation();

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="flex-row justify-around items-center h-20 bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0">
      <FooterButton onPress={navigateHome} title="Home" />
      <FooterButton title="Logs" />
      <FooterButton title="Plans" />
    </SafeAreaView>
  );
};

export default Footer;
