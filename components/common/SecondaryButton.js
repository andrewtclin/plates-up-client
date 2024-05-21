import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useFont } from "../../contexts/fontContext";

const SecondaryButton = ({ title, onPress, isDisabled = false }) => {
  const { font } = useFont();
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
