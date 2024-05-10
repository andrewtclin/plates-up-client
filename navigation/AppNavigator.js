import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Logs from "../screens/Logs";
import Progress from "../screens/Progress";
import History from "../screens/History";
import Settings from "../screens/Settings";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Login from "../components/login/Login";

import { useUser } from "../contexts/UserContext";

// creating bottom tab navigator
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  //#region ------ states ------
  const { user } = useUser();

  //#endregion

  // defining screen components
  return (
    <Tab.Navigator
      tabBar={(props) => (user ? <Footer state={props.state} /> : null)}
      screenOptions={{
        header: user ? () => <Header /> : () => null,
      }}
    >
      <Tab.Screen
        name="Home"
        component={user ? Home : Login}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="Logs"
        component={user ? Logs : Login}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="Progress"
        component={user ? Progress : Login}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="History"
        component={user ? History : Login}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="Settings"
        component={user ? Settings : Login}
        options={{ header: user ? () => <Header /> : () => null }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
