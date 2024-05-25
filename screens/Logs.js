import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  BookOpenIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "react-native-heroicons/solid";
import { PRIMARY_BLUE } from "../utils/data";
import { Dialog, Portal, TextInput } from "react-native-paper";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import { exerciseApi } from "../apis/apis";
import { useUser } from "../contexts/UserContext";
import { useFont } from "../contexts/fontContext";

export default function Logs() {
  //#region ------ states ------
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  const { font, setFont } = useFont();
  console.log(font);

  const [exercises, setExercises] = useState([]);
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

  const handleDeleteExercise = async (exerciseId) => {
    try {
      const response = await fetch(exerciseApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseId: exerciseId,
          userId: user.userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      if (data.code == 200) {
        Alert.alert(
          "Exercise Deleted",
          "Exercise has been deleted successfully."
        );
        getExerciseInfo();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Delete failed", error);
      Alert.alert("Delete Failed", error.toString());
    }
  };

  const handleUpdateExercise = (exerciseId) => {
    Alert.prompt(
      "New Exercise Name",
      "Enter a new exercise name to update the exercise.",
      [
        {
          text: "OK",
          onPress: (name) => updateExerciseName(exerciseId, name),
        },
      ]
    );
  };

  const updateExerciseName = async (exerciseId, exerciseName) => {
    try {
      const response = await fetch(exerciseApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseId: exerciseId,
          userId: user.userId,
          exerciseName: exerciseName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      if (data.code == 200) {
        Alert.alert(
          "Exercise Updated",
          "Exercise has been updated successfully."
        );
        getExerciseInfo();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Update failed", error);
      Alert.alert("Update Failed", error.toString());
    }
  };

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
      setExercises(data.result);
    } catch (error) {
      console.error("Retrieved Exercise Failed", error);
      Alert.alert("Retrieved Exercise Failed", error.toString());
    }
  };

  //#endregion

  //#region ------ lifecycle ------
  useEffect(() => {
    getExerciseInfo();
  }, [showNewExerciseModal]);
  //#endregion

  return (
    <View className="flex-col justify-center items-center p-4">
      <TouchableOpacity
        className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4"
        onPress={() => navigation.navigate("Progress")}
      >
        <View className="border border-primaryBlue rounded-full p-2">
          <PencilIcon size={16} color={PRIMARY_BLUE} />
        </View>
        <Text
          className={`text-primaryBlue pl-4 ${
            font === "standard" ? "text-base" : "text-lg"
          }`}
        >
          Start New Log
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4 mt-10">
        <View className="border border-primaryBlue rounded-full p-2">
          <SquaresPlusIcon size={16} color={PRIMARY_BLUE} />
        </View>
        <TouchableOpacity onPress={() => setShowNewExerciseModal(true)}>
          <Text
            className={`text-primaryBlue pl-4 ${
              font === "standard" ? "text-base" : "text-lg"
            }`}
          >
            Add New Exercise
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View className="w-full border-b border-primaryBlueLight py-1" />
      <ScrollView className="w-full h-[450px]">
        {exercises?.map((exercise, idx) => (
          <View key={idx}>
            <View className="w-full flex-row justify-start items-center border border-white rounded-md bg-white p-4 mt-2">
              <View className="border border-primaryBlue rounded-full p-2">
                <BookOpenIcon size={16} color={PRIMARY_BLUE} />
              </View>
              <Text
                className={`text-primaryBlue pl-4 ${
                  font === "standard" ? "text-base" : "text-lg"
                }`}
              >
                {exercise?.exercise_name}
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center -mt-3 -mb-2">
              <PrimaryButton
                title="Update"
                onPress={() => handleUpdateExercise(exercise.exercise_id)}
              />
              <SecondaryButton
                title="Delete"
                onPress={() => handleDeleteExercise(exercise.exercise_id)}
              />
            </View>
          </View>
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
          <SecondaryButton
            title="Confirm"
            onPress={handleNewExerciseAdd}
            font={font}
          />
        </Dialog>
      </Portal>
    </View>
  );
}
