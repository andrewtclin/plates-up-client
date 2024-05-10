import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";

import logo from "../../assets/plates-up-logo.png";
import PrimaryButton from "../common/PrimaryButton";

export default function Login() {
  //#region ------ states ------
  const { user, setUser } = useUser();
  //#endregion

  //#region ------ functions ------
  const handleLogin = () => {
    setUser({ username: "TC" });
  };
  //#endregion

  return (
    <View>
      <View className="h-full w-full flex-col items-center justify-center">
        <Image source={logo} className="object-contain h-32 w-32" />
        <PrimaryButton title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}
