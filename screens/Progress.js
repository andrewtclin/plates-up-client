import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Line from "../components/charts/Line";
import { Button, Dialog, Portal } from "react-native-paper";

export default function Progress() {
  //#region ------ states ------
  const exercises = [
    "Curl",
    "Bench Press",
    "Squat",
    "Deadlift",
    "Shoulder Press",
    "Pull Ups",
    "Leg Press",
    "Lat Pull Down",
    "Bicep Curl",
    "Tricep Extension",
  ];
  // exercise states
  const [selectedExercise, setSelectedExercise] = useState("Curl");
  // modal states
  const [modalVisible, setModalVisible] = useState(false);

  //#endregion

  //#region ------ functions ------
  // modal functions
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  //#endregion

  return (
    <SafeAreaView className="h-full w-full flex-col justify-start items-center gap-y-4 mt-4">
      <Portal>
        <Dialog visible={modalVisible} onDismiss={hideModal}>
          <Dialog.ScrollArea>
            <ScrollView className="h-96">
              {exercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise}
                  className="flex-col justify-center items-center"
                  onPress={() => {
                    setSelectedExercise(exercise);
                    hideModal();
                  }}
                >
                  <View className="w-full rounded-md my-1">
                    <Text className="text-center text-primaryBlue py-3 text-lg">
                      {exercise}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      <Button onPress={showModal}>
        <View className="w-52 flex-col justify-center items-center gap-y-2 border border-primaryBlue pb-2 px-4 rounded-sm ">
          <Text className="font-bold text-primaryBlue">{selectedExercise}</Text>
        </View>
      </Button>
      <View className="bg-white rounded-md p-6">
        <Line />
      </View>
    </SafeAreaView>
  );
}
