import { View, Text, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/common/PrimaryButton";
import logo from "../assets/plates-up-logo.png";

export default function RegisterSuccess() {
  //#region ------ States ------
  const navigation = useNavigation();
  //#endregion
  return (
    <View className="h-full flex-col justify-center items-center gap-y-2 p-4 px-12 flex-1">
      <Image source={logo} className="object-contain h-32 w-32" />
      <Text className="text-primaryBlue font-semibold text-2xl">
        Registration Success
      </Text>
      <Text className="text-lg text-primaryBlue">
        Thanks for joining Plates-Up!
      </Text>

      <View className="flex-row justify-center items-center pb-4">
        <PrimaryButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
