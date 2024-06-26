import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { PRIMARY_BLUE_LIGHT, PRIMARY_BLUE } from "../../utils/data";
import { useFont } from "../../contexts/fontContext";

export default function FooterItem({ item, onPress, isActive }) {
  const { font, setFont } = useFont();
  const FooterIconComponent = item["icon"];
  return (
    <TouchableOpacity
      className="flex-1 items-center justify-center"
      onPress={onPress}
    >
      <View className="flex-col justify-center items-center pt-4">
        <FooterIconComponent
          size={24}
          color={isActive ? PRIMARY_BLUE : PRIMARY_BLUE_LIGHT}
        />
        <Text
          className={`${font === "standard" ? "text-xs" : "text-lg"} ${
            isActive ? "text-primaryBlue" : "text-primaryBlueLight"
          }`}
        >
          {item["title"]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
