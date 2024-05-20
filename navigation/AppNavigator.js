import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Logs from "../screens/Logs";
import Progress from "../screens/Progress";
import History from "../screens/History";
import Settings from "../screens/Settings";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RegisterSuccess from "../screens/RegisterSuccess";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Welcome from "../components/welcome/Welcome";

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
        component={user ? Home : Welcome}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="Logs"
        component={user ? Logs : Welcome}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="Progress"
        component={user ? Progress : Welcome}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen
        name="History"
        component={user ? History : Welcome}
        options={{ header: user ? () => <Header /> : () => null }}
      />
      <Tab.Screen name="Welcome" component={user ? Home : Welcome} />
      <Tab.Screen name="Register" component={user ? Home : Register} />
      <Tab.Screen
        name="RegisterSuccess"
        component={user ? Home : RegisterSuccess}
      />
      <Tab.Screen name="Login" component={user ? Home : Login} />

      <Tab.Screen
        name="Settings"
        component={user ? Settings : Welcome}
        options={{ header: user ? () => <Header /> : () => null }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
