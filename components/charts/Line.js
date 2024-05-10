import { Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { PRIMARY_BLUE_RGBA } from "../../utils/data";

export default function Line() {
  const screenWidth = Dimensions.get("window").width * 0.8;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(36, 62, 98, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // Optional
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2,
      },
    ],
    legend: ["Worked"],
  };

  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={256}
      verticalLabelRotation={30}
      chartConfig={chartConfig}
      bezier
    />
  );
}
