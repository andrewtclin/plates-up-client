import React from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/plates-up-logo.png";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

export default function Welcome() {
  //#region ------ states ------
  const navigation = useNavigation();
  //#endregion

  //#region ------ functions -----Welcome-
  const onNavigatePress = (route) => {
    navigation.navigate(route);
  };

  //#endregion

  return (
    <View className="h-full w-full flex-col items-center justify-center">
      <Image source={logo} className="object-contain h-32 w-32" />
      <View className="flex-row justify-center items-center">
        <PrimaryButton title="Login" onPress={() => onNavigatePress("Login")} />
        <SecondaryButton
          title="Register"
          onPress={() => onNavigatePress("Register")}
        />
      </View>
    </View>
  );
}
