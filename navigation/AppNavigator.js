import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Unauthorized from "../components/Unauthorized";
import { useUser } from "../contexts/UserContext";

// creating bottom tab navigator
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  //#region ------ states ------
  const { user } = useUser();

  //#endregion

  // defining screen components
  return (
    <Tab.Navigator tabBar={user ? () => <Footer /> : () => null}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ header: () => <Header /> }}
      />
      <Tab.Screen name="Settings" component={user ? Settings : Unauthorized} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
