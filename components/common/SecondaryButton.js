import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SecondaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="m-4 p-2 px-4 bg-primaryBlue rounded-md"
    >
      <Text className="font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
