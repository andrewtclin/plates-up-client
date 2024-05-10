import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useUser } from "../../contexts/UserContext";

import { CogIcon } from "react-native-heroicons/solid";
import { PRIMARY_BLUE } from "../../utils/data";

export default function Header() {
  //#region ------ States ------
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser();
  //#endregion

  const onSettingsClick = () => {
    navigation.navigate("Settings");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="pt-5 bg-white">
        {/* Header */}
        <View className="flex-row items-center space-x-2 pb-3 mx-4 ">
          <View className="flex justify-center items-center h-8 w-8 p-2 rounded-full bg-primaryBlue">
            <Text className="font-bold text-white">
              {user["username"].charAt(0)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold text-primaryBlueLight">
              Welcome Back.
            </Text>
            <Text className="text-xl font-bold text-primaryBlue">
              {user["username"]}
            </Text>
          </View>
          {route?.name === "Settings" ? (
            ""
          ) : (
            <TouchableOpacity onPress={onSettingsClick}>
              <CogIcon size={30} color={PRIMARY_BLUE} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
