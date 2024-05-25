import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SecondaryButton = ({ title, onPress, font, isDisabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`m-4 p-2 px-4 ${
        isDisabled ? "bg-primaryBlueLight" : "bg-primaryBlue"
      } rounded-md`}
      disabled={isDisabled}
    >
      <Text
        className={`font-bold text-white ${
          font === "standard" ? "text-base" : "text-lg"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
