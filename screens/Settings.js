import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import SecondaryButton from "../components/common/SecondaryButton";
import PrimaryButton from "../components/common/PrimaryButton";
import { useFont } from "../contexts/fontContext";
import { useUser } from "../contexts/UserContext";
import { TextInput } from "react-native-paper";
import { userApi } from "../apis/apis";

export default function Settings() {
  const { font, setFont } = useFont();
  const { user, setUser } = useUser();
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState();

  const updateProfile = async () => {
    try {
      const response = await fetch(userApi + "/testuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: newPassword,
          email: newEmail,
          lastname: user.lastname,
          firstname: user.firstname,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      if (data.code == 200) {
        Alert.alert(
          "Profile Updated",
          "Profile has been updated successfully."
        );
        setUser({ ...user, email: newEmail });
        setNewPassword();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Update failed", error);
      Alert.alert("Update Failed", error.toString());
    }
  };

  return (
    <View className="flex flex-col justify-start items-center p-4 px-12">
      <Text
        className={`${
          font === "standard" ? "text-xl" : "text-2xl"
        } text-primaryBlue text-center`}
      >
        Settings
      </Text>
      <View className="flex flex-col justify-center items-center bg-white rounded-md p-4 mt-6">
        <Text
          className={`text-center ${
            font === "standard" ? "text-lg" : "text-xl"
          }  mb-2`}
        >
          Font Size
        </Text>
        <View className="flex flex-row justify-center items-center gap-x-2">
          <SecondaryButton
            title="Standard"
            isDisabled={font === "standard" ? true : false}
            onPress={() => setFont("standard")}
          />
          <SecondaryButton
            title="Large"
            isDisabled={font === "large" ? true : false}
            onPress={() => setFont("large")}
          />
        </View>
      </View>
      <View className="w-full flex flex-col justify-center items-center bg-white rounded-md p-4 mt-6">
        <Text
          className={`text-center ${
            font === "standard" ? "text-lg" : "text-xl"
          }  mb-2`}
        >
          Update Profile
        </Text>
        <View className="w-full flex flex-col justify-center items-center">
          <TextInput
            className="w-full bg-white"
            mode="outlined"
            label="New Email"
            placeholder="New Email"
            value={newEmail}
            onChangeText={(email) => setNewEmail(email)}
          />
          <TextInput
            className="w-full bg-white"
            mode="outlined"
            label="New Password"
            placeholder="New Password"
            value={newPassword}
            onChangeText={(password) => setNewPassword(password)}
            secureTextEntry={true}
          />
        </View>
        <PrimaryButton title="Update" onPress={updateProfile} />
      </View>
      <SecondaryButton title="Log Out" onPress={() => setUser()} />
    </View>
  );
}
