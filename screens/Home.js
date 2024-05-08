import React, { useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";

import logo from "../assets/plates-up-logo.png";

export default function Home() {
  //#region ------ states ------
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  //#endregion

  //#region ------ functions ------
  const handleLogin = () => {
    setUser({ username: "TC" });
  };
  //#endregion

  //#region ------ lifecycle ------
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !!user,
    });
  }, [user]);
  //#endregion

  return (
    <View>
      {user ? (
        <Text>Welcome back, {user.username}!</Text>
      ) : (
        <View className="h-full w-full flex-col items-center justify-center">
          <Image source={logo} className="object-contain h-32 w-32" />

          <TouchableOpacity
            onPress={handleLogin}
            className="mt-4 p-2 px-4 border border-primaryBlue rounded-md"
          >
            <Text className="font-bold text-primaryBlue ">Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
