import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { useUser } from "../contexts/UserContext";

import PrimaryButton from "../components/common/PrimaryButton";
import ProgressCircle from "../components/charts/ProgressCircle";

export default function Home() {
  //#region ------ states ------
  const { user } = useUser();
  const [timeFrame, setTimeFrame] = useState("This Week");
  //#endregion

  //#region ------ functions ------
  const onTimeFramePress = () => {
    console.log({ timeFrame });
  };
  //#endregion

  //#region ------ lifecycle ------

  //#endregion

  return (
    <SafeAreaView className="w-full h-full flex-col justify-center items-center gap-y-4">
      <PrimaryButton title={timeFrame} onPress={onTimeFramePress} />
      <View className="flex-col justify-center items-center gap-y-2">
        <Text className="text-center">
          This week, you have completed 5 workouts.
        </Text>
        <Text className="text-center">Let's keep the momentum going!</Text>
        <ProgressCircle />
      </View>
    </SafeAreaView>
  );
}
