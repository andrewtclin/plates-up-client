import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import logo from "../assets/plates-up-logo.png";
import { userApi } from "../apis/apis";

export default function Register() {
  //#region ------ states ------
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");

  //#endregion

  //#region ------ functions ------
  const onCancelPress = () => {
    navigation.navigate("Welcome");
  };

  // register
  const handleRegister = async () => {
    if (
      !newUsername ||
      !newPassword ||
      !newEmail ||
      !newLastName ||
      !newFirstName
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch(userApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          email: newEmail,
          lastname: newLastName,
          firstname: newFirstName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      if (data.code == 200) {
        navigation.navigate("RegisterSuccess");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      Alert.alert("Registration Failed", error.toString());
    }
  };
  //#endregion

  //#region ------ Lifecycle ------

  //#endregion

  return (
    <KeyboardAvoidingView
      className="h-full flex-col justify-center items-center gap-y-2 p-4 px-12 flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={logo} className="object-contain h-32 w-32" />
      <Text className="text-primaryBlue font-semibold text-2xl">Register</Text>
      <Text className="text-lg text-primaryBlue">
        Let's be a part of Plates-Up
      </Text>
      <View className="w-full flex-col justify-center items-center gap-y-2">
        <View className="w-full flex-row">
          <TextInput
            mode="outlined"
            className="bg-white flex-[0.5] mr-1"
            label="First Name"
            value={newFirstName}
            onChangeText={(newFirstName) => setNewFirstName(newFirstName)}
          />
          <TextInput
            mode="outlined"
            className="bg-white flex-[0.5] ml-1"
            label="Last Name"
            value={newLastName}
            onChangeText={(newLastName) => setNewLastName(newLastName)}
          />
        </View>
        <TextInput
          mode="outlined"
          className="w-full bg-white"
          label="Email Address"
          value={newEmail}
          onChangeText={(newEmail) => setNewEmail(newEmail)}
        />
        <TextInput
          mode="outlined"
          className="w-full bg-white"
          label="Username"
          value={newUsername}
          onChangeText={(newUsername) => setNewUsername(newUsername)}
        />
        <TextInput
          mode="outlined"
          className="w-full bg-white"
          label="Password"
          secureTextEntry
          value={newPassword}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
        />
      </View>
      <View className="flex-row justify-center items-center pb-4">
        <PrimaryButton title="Register" onPress={handleRegister} />
        <SecondaryButton title="Cancel" onPress={onCancelPress} />
      </View>
    </KeyboardAvoidingView>
  );
}
