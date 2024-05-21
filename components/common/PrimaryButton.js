import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useFont } from "../../contexts/fontContext";

const PrimaryButton = ({ title, onPress }) => {
  const { font } = useFont();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="m-4 p-2 px-4 border border-primaryBlue rounded-md"
    >
      <Text
        className={`font-bold text-primaryBlue ${
          font === "standard" ? "text-base" : "text-lg"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
