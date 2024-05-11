import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  BookOpenIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "react-native-heroicons/solid";
import { PRIMARY_BLUE } from "../utils/data";

export default function Logs() {
  //#region ------ states ------
  const [plans, workoutPlans] = useState([
    "Chest Day",
    "Back Day",
    "Leg Day",
    "Shoulder Day",
    "Arm Day",
    "Pull Day",
    "Push Day",
  ]);
  //#endregion

  return (
    <View className="flex-col justify-center items-center p-4">
      <TouchableOpacity className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4">
        <View className="border border-primaryBlue rounded-full p-2">
          <PencilIcon size={16} color={PRIMARY_BLUE} />
        </View>
        <Text className="text-primaryBlue pl-4">Quick Start</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4 mt-10">
        <View className="border border-primaryBlue rounded-full p-2">
          <SquaresPlusIcon size={16} color={PRIMARY_BLUE} />
        </View>
        <Text className="text-primaryBlue pl-4">Add New Plan</Text>
      </TouchableOpacity>
      <View className="w-full border-b border-primaryBlueLight py-1" />
      <ScrollView className="w-full h-96">
        {plans?.map((plan) => (
          <TouchableOpacity
            key={plan}
            className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4 mt-2"
          >
            <View className="border border-primaryBlue rounded-full p-2">
              <BookOpenIcon size={16} color={PRIMARY_BLUE} />
            </View>
            <Text className="text-primaryBlue pl-4">{plan}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
