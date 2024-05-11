import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import logo from "../assets/plates-up-logo.png";
import { loginApi, userApi } from "../apis/apis";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  //#region ------ states ------
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  //#endregion

  //#region ------ functions ------
  const onCancelPress = () => {
    setUsername("");
    setPassword("");
    navigation.navigate("Welcome");
  };

  // login
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Both username and password are required.");
      return;
    }

    try {
      const response = await fetch(loginApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      setIsLoginSuccess(data.result.success);
    } catch (error) {
      console.error("Login failed", error);
      Alert.alert("Login Failed", error.toString());
    }
  };

  //#endregion

  //#region ------ lifecycle ------
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          userApi + `?username=${encodeURIComponent(username)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();
        setUser(data.result);
      } catch (error) {
        console.error("Login failed", error);
        Alert.alert("Login Failed", error.toString());
      }
    };
    if (isLoginSuccess) {
      getUserInfo();
      navigation.navigate("Home");
    }
  }, [isLoginSuccess]);
  //#endregion

  return (
    <KeyboardAvoidingView
      className="h-full flex-col justify-center items-center gap-y-2 p-4 px-12 flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={logo} className="object-contain h-32 w-32" />
      <Text className="text-primaryBlue font-semibold text-2xl">Login</Text>
      <Text className="text-lg text-primaryBlue">Keep the momentum going!</Text>
      <View className="w-full flex-col justify-center items-center gap-y-2">
        <TextInput
          mode="outlined"
          className="w-full bg-white"
          label="Username"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          mode="outlined"
          className="w-full bg-white"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View className="flex-row justify-center items-center pb-4">
        <PrimaryButton title="Login" onPress={handleLogin} />
        <SecondaryButton title="Cancel" onPress={onCancelPress} />
      </View>
    </KeyboardAvoidingView>
  );
}
