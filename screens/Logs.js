import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BookOpenIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "react-native-heroicons/solid";
import { PRIMARY_BLUE } from "../utils/data";
import { Dialog, Portal, TextInput } from "react-native-paper";
import SecondaryButton from "../components/common/SecondaryButton";
import { exerciseApi } from "../apis/apis";
import { useUser } from "../contexts/UserContext";

export default function Logs() {
  //#region ------ states ------
  const { user, setUser } = useUser();
  const [exercises, setExercises] = useState([
    "Bicep Curls",
    "Pushups",
    "Squats",
    "Planks",
    "Deadlifts",
    "Bench Press",
    "Shoulder Press",
    "Leg Press",
    "Leg Curls",
    "Leg Extensions",
    "Lat Pulldowns",
  ]);
  const [newExercise, setNewExercise] = useState("");

  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false);
  //#endregion

  //#region ------ functions ------
  const handleNewExerciseModalClose = () => {
    setNewExercise("");
    setShowNewExerciseModal(false);
  };

  const handleNewExerciseAdd = async () => {
    if (!newExercise) {
      Alert.alert("Error", "Exercise name is required.");
      return;
    }
    try {
      const response = await fetch(exerciseApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseName: newExercise,
          userId: user.userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      if (data.code == 200) {
        Alert.alert("Exercise Added", "Exercise has been added successfully.");
        handleNewExerciseModalClose();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      Alert.alert("Registration Failed", error.toString());
    }
  };
  //#endregion

  //#region ------ lifecycle ------
  useEffect(() => {
    const getExerciseInfo = async () => {
      try {
        const response = await fetch(
          exerciseApi + `?userId=${encodeURIComponent(user.userId)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setExercises(data.result);
      } catch (error) {
        console.error("Retrieved Exercise Failed", error);
        Alert.alert("Retrieved Exercise Failed", error.toString());
      }
    };
    getExerciseInfo();
  }, [showNewExerciseModal]);
  //#endregion

  return (
    <View className="flex-col justify-center items-center p-4">
      <TouchableOpacity className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4">
        <View className="border border-primaryBlue rounded-full p-2">
          <PencilIcon size={16} color={PRIMARY_BLUE} />
        </View>
        <Text className="text-primaryBlue pl-4">Start Diary</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4 mt-10">
        <View className="border border-primaryBlue rounded-full p-2">
          <SquaresPlusIcon size={16} color={PRIMARY_BLUE} />
        </View>
        <TouchableOpacity onPress={() => setShowNewExerciseModal(true)}>
          <Text className="text-primaryBlue pl-4">Add New Exercise</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View className="w-full border-b border-primaryBlueLight py-1" />
      <ScrollView className="w-full h-[450px]">
        {exercises?.map((exercise, idx) => (
          <TouchableOpacity
            key={idx}
            className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4 mt-2"
          >
            <View className="border border-primaryBlue rounded-full p-2">
              <BookOpenIcon size={16} color={PRIMARY_BLUE} />
            </View>
            <Text className="text-primaryBlue pl-4">
              {exercise?.exercise_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Portal>
        <Dialog
          className="flex-col justify-center items-center bg-white -mt-12"
          visible={showNewExerciseModal}
          onDismiss={handleNewExerciseModalClose}
        >
          <Dialog.Content className="flex-col justify-center items-center w-full">
            <Dialog.Title>Add an Exercise</Dialog.Title>
            <Dialog.Content className="pb-0 w-full">
              <TextInput
                className="bg-white w-full"
                label="New Exercise"
                value={newExercise}
                onChangeText={(text) => setNewExercise(text)}
              />
            </Dialog.Content>
          </Dialog.Content>
          <SecondaryButton title="Confirm" onPress={handleNewExerciseAdd} />
        </Dialog>
      </Portal>
    </View>
  );
}
