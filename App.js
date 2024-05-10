import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/UserContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  // context api to serve data to app
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
