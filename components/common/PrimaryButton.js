import React from "react";
import { TouchableOpacity, Text } from "react-native";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="m-4 p-2 px-4 border border-primaryBlue rounded-md"
    >
      <Text className="font-bold text-primaryBlue ">{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
