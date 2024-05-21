import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterItem from "./FooterItem";

import {
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  HomeIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";

const Footer = ({ state }) => {
  const routes = state.routes.map((route) => route.name);
  const activeRoute = state.index;
  //#region ------ states ------
  const menuItems = [
    {
      title: "Home",
      icon: HomeIcon,
      route: "Home",
    },
    {
      title: "Logs",
      icon: PencilSquareIcon,
      route: "Logs",
    },
    {
      title: "Progress",
      icon: ArrowTrendingUpIcon,
      route: "Progress",
    },
    {
      title: "History",
      icon: CalendarDaysIcon,
      route: "History",
    },
  ];
  const navigation = useNavigation();

  //#endregion

  //#region  ------ functions ------
  const navigateScreen = (route) => {
    navigation.navigate(route);
  };
  //#endregion

  return (
    <SafeAreaView className="flex-row justify-around items-center h-20 bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0">
      {menuItems?.map((item, index) => (
        <FooterItem
          key={index}
          item={item}
          isActive={activeRoute === index}
          onPress={() => navigateScreen(item["route"])}
        />
      ))}
    </SafeAreaView>
  );
};

export default Footer;
