import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/UserContext";
import AppNavigator from "./navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import logo from "./assets/plates-up-logo.png";
import { Asset } from "expo-asset";
import { LogBox } from "react-native";
import { FontProvider } from "./contexts/fontContext";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Asset.loadAsync([logo]);

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // context api to serve data to app
  return (
    <PaperProvider>
      <FontProvider>
        <UserProvider>
          <NavigationContainer onReady={onLayoutRootView}>
            <AppNavigator />
          </NavigationContainer>
        </UserProvider>
      </FontProvider>
    </PaperProvider>
  );
};

export default App;
