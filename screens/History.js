import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function History() {
  //#region ------ states ------

  // date settings
  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDay = today.getDate().toString().padStart(2, "0");
  const [selectedDate, setSelectedDate] = useState(
    `${todayYear}-${todayMonth}-${todayDay}`
  );
  //#endregion

  //#region ------ functions ------
  const onDateChange = (date) => {
    setSelectedDate(date);
  };
  //#endregion

  return (
    <View>
      <Calendar
        style={{ borderWidth: 1, borderColor: "#919EB0" }}
        theme={{
          arrowColor: "#919EB0",
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#243E62",
          },
          "2024-05-21": {
            marked: true,
            dotColor: "#919EB0",
          },
          "2024-05-22": {
            marked: true,
            dotColor: "#919EB0",
          },
          "2024-05-23": {
            marked: true,
            dotColor: "#919EB0",
          },
        }}
      />
      <View className="flex-col justify-center items-start p-4">
        <Text>History</Text>
      </View>
    </View>
  );
}
