import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Line from "../components/charts/Line";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { exerciseApi, progressApi } from "../apis/apis";
import { useUser } from "../contexts/UserContext";
import PrimaryButton from "../components/common/PrimaryButton";
import { useFont } from "../contexts/fontContext";

export default function Progress() {
  //#region ------ states ------
  const { user } = useUser();
  const { font } = useFont();
  const [exercises, setExercises] = useState([]);
  // exercise states
  const [selectedExercise, setSelectedExercise] = useState();
  // modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [inputWeights, setInputWeights] = useState("");
  const [progressHistory, setProgressHistory] = useState([]);
  //#endregion

  //#region ------ functions ------
  // modal functions
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

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

  const getProgressHistory = async () => {
    try {
      const response = await fetch(
        progressApi + `?userId=${encodeURIComponent(user.userId)}`,
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
      setProgressHistory(data.result);
    } catch (error) {
      console.error("Retrieved Progress Failed", error);
      Alert.alert("Retrieved Progress Failed", error.toString());
    }
  };

  const onLogPress = async () => {
    if (!inputWeights) {
      Alert.alert("Error", "Enter weights.");
      return;
    }
    try {
      const response = await fetch(progressApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseId: selectedExercise?.exercise_id,
          userId: user.userId,
          weights: inputWeights,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      if (data.code == 200) {
        Alert.alert("Progress Added", "Progress has been added successfully.");
        setInputWeights("");
        getProgressHistory();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      Alert.alert("Registration Failed", error.toString());
    }
  };
  //#endregion

  //#region ------ Lifecycle ------
  useEffect(() => {
    getExerciseInfo();
    getProgressHistory();
  }, [modalVisible]);

  //#endregion

  return (
    <SafeAreaView className="h-full w-full flex-col justify-start items-center gap-y-4 mt-4">
      <Portal>
        <Dialog visible={modalVisible} onDismiss={hideModal}>
          <Dialog.ScrollArea>
            <ScrollView className="h-96">
              {exercises?.map((exercise, idx) => (
                <TouchableOpacity
                  key={idx}
                  className="flex-col justify-center items-center"
                  onPress={() => {
                    setSelectedExercise(exercise);
                    hideModal();
                  }}
                >
                  <View className="w-full rounded-md my-1">
                    <Text
                      className={`text-center text-primaryBlue py-3 ${
                        font === "standard" ? "text-lg" : "text-xl"
                      }`}
                    >
                      {exercise.exercise_name}
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
          <Text
            className={`font-bold text-primaryBlue ${
              font === "standard" ? "text-base" : "text-lg"
            }`}
          >
            {selectedExercise?.exercise_name}
          </Text>
        </View>
      </Button>
      <View className="bg-white rounded-md p-6">
        <Line
          progressData={progressHistory}
          selectedExercise={selectedExercise}
        />
      </View>
      <View className="flex flex-col justify-center items-center">
        <Text
          className={`text-lg text-primaryBlue pb-2 ${
            font === "standard" ? "text-base" : "text-lg"
          }`}
        >
          Weights
        </Text>
        <TextInput
          className="bg-white w-52"
          label="Weights"
          value={inputWeights}
          onChangeText={(text) => setInputWeights(text)}
        />
        <PrimaryButton title="Log" onPress={onLogPress} />
      </View>
    </SafeAreaView>
  );
}
