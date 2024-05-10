import React from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

const ProgressCircle = () => {
  const screenWidth = Dimensions.get("window").width * 0.8;
  const data = {
    labels: ["Weekly", "Monthly"], // Single label
    data: [0.75, 0.3], // Example: 75% of the weekly goal achieved
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(198, 148, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // Optional
  };
  return (
    <ProgressChart
      data={data}
      width={screenWidth}
      height={220}
      strokeWidth={10}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  );
};

export default ProgressCircle;
