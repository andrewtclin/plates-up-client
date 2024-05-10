import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/UserContext";
import AppNavigator from "./navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";

const App = () => {
  // context api to serve data to app
  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
