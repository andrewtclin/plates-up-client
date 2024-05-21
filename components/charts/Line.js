import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";

export default function Line({ progressData, selectedExercise }) {
  //#region ------ states ------
  const [dataPoints, setDataPoints] = useState([0]);
  const [dataLabels, setDataLabels] = useState([""]);

  const screenWidth = Dimensions.get("window").width * 0.8;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(36, 62, 98, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: dataLabels,
    datasets: [
      {
        data: dataPoints,
        strokeWidth: 2,
      },
    ],
    legend: ["Weights (kg)"],
  };
  //#endregion

  //#region ------ lifecycle ------
  useEffect(() => {
    let temp_data = progressData.filter(
      (progress) => progress.exercise_id === selectedExercise?.exercise_id
    );
    temp_data_points = temp_data?.map((progress) => progress.weights);
    if (temp_data_points.length === 0) {
      setDataPoints([0]);
    } else {
      setDataPoints(temp_data_points);
    }

    temp_data_labels = temp_data?.map((progress) => {
      let dateString = progress?.created_at;
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}`;
    });
    if (temp_data_labels.length === 0) {
      setDataLabels([""]);
    } else {
      setDataLabels(temp_data_labels);
    }
  }, [selectedExercise, progressData]);
  //#endregion

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
