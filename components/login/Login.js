import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";

import logo from "../../assets/plates-up-logo.png";
import PrimaryButton from "../common/PrimaryButton";
import { Dialog, Portal, TextInput } from "react-native-paper";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { PRIMARY_BLUE } from "../../utils/data";
import SecondaryButton from "../common/SecondaryButton";

export default function Login() {
  //#region ------ states ------
  // if user is logged in
  const { user, setUser } = useUser();

  // login modal
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // register modal
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //#endregion

  //#region ------ functions ------
  // login modal
  const startLogin = () => {
    setUsername("");
    setPassword("");
    setIsLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setUsername("");
    setPassword("");
    setIsLoginModalVisible(false);
  };

  // register modal
  const startRegister = () => {
    setNewUsername("");
    setNewPassword("");
    setIsRegisterModalVisible(true);
  };

  const closeRegisterModal = () => {
    setNewUsername("");
    setNewPassword("");
    setIsRegisterModalVisible(false);
  };
  //#endregion

  return (
    <View>
      <View className="h-full w-full flex-col items-center justify-center">
        <Image source={logo} className="object-contain h-32 w-32" />
        <View className="flex-row justify-center items-center">
          <PrimaryButton title="Login" onPress={startLogin} />
          <SecondaryButton title="Register" onPress={startRegister} />
        </View>
      </View>

      {/* Login Modal */}
      <Portal>
        <Dialog
          className="flex-col justify-center items-center bg-white -mt-64"
          visible={isLoginModalVisible}
          onDismiss={closeLoginModal}
        >
          <UserCircleIcon size={30} color={PRIMARY_BLUE} />
          <Dialog.Title className="text-primaryBlue font-semibold">
            Login
          </Dialog.Title>
          <Text className="pb-4 text-lg text-primaryBlue">
            Welcome to Plates-Up
          </Text>
          <Dialog.Content className="w-full">
            <TextInput
              className="bg-white"
              label="Username"
              value={username}
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              className="bg-white"
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </Dialog.Content>
          <View className="flex-row justify-center items-center pb-4">
            <PrimaryButton title="Login" />
            <SecondaryButton title="Cancel" onPress={closeLoginModal} />
          </View>
        </Dialog>
      </Portal>

      {/* Register Modal */}
      <Portal>
        <Dialog
          className="flex-col justify-center items-center bg-white -mt-64"
          visible={isRegisterModalVisible}
          onDismiss={closeRegisterModal}
        >
          <UserCircleIcon size={30} color={PRIMARY_BLUE} />
          <Dialog.Title className="text-primaryBlue font-semibold">
            Register
          </Dialog.Title>
          <Text className="pb-4 text-lg text-primaryBlue">
            Let's be a part of Plates-Up
          </Text>
          <Dialog.Content className="w-full">
            <TextInput
              className="bg-white"
              label="Username"
              value={newUsername}
              onChangeText={(newUsername) => setNewUsername(newUsername)}
            />
            <TextInput
              className="bg-white"
              label="Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(newPassword) => setNewPassword(newPassword)}
            />
          </Dialog.Content>
          <View className="flex-row justify-center items-center pb-4">
            <PrimaryButton title="Register" />
            <SecondaryButton title="Cancel" onPress={closeRegisterModal} />
          </View>
        </Dialog>
      </Portal>
    </View>
  );
}
