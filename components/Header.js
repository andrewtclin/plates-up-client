import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CogIcon } from "react-native-heroicons/solid";
import { USER_ID, THEME_HEX } from "../utils/data";

export default function Header() {
  const navigation = useNavigation();

  const onSettingsClick = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView className="pt-5 bg-white">
      {/* Header */}
      <View className="flex-row items-center space-x-2 pb-3 mx-4 ">
        <View className="flex justify-center items-center h-8 w-8 p-2 rounded-full bg-primaryBlue">
          <Text className="font-bold text-white">{USER_ID.charAt(0)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs font-bold text-primaryBlueLight">
            Welcome Back.
          </Text>
          <Text className="text-xl font-bold text-primaryBlue">{USER_ID}</Text>
        </View>
        <TouchableOpacity onPress={onSettingsClick}>
          <CogIcon size={30} color={THEME_HEX} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
