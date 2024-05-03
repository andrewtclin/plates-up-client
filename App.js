import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/Header";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Layout from "./components/Layout";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home */}
        <Stack.Screen name="Home" options={{ header: () => <Header /> }}>
          {() => (
            <Layout>
              <Home />
            </Layout>
          )}
        </Stack.Screen>

        {/* Settings */}
        <Stack.Screen name="Settings">
          {() => (
            <Layout>
              <Settings />
            </Layout>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
