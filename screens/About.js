import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import licenses from "../utils/openSourceLicenses.json";
import { useFont } from "../contexts/fontContext";

export default function About() {
  //#region ------ states ------
  const { font } = useFont();
  const [licenseList, setLicenseList] = useState([]);
  //#endregion

  //#region ------ lifecycle ------
  useEffect(() => {
    const formattedLicenses = Object.entries(licenses).map(
      ([packageName, details]) => ({
        packageName,
        ...details,
      })
    );
    setLicenseList(formattedLicenses);
  }, []);
  //#endregion

  return (
    <View className="flex flex-col justify-center items-center p-4 px-12 gap-y-4">
      <Text
        className={`${
          font === "standard" ? "text-xl" : "text-2xl"
        } text-primaryBlue`}
      >
        About Plates-Up
      </Text>
      <View className="bg-white w-full p-4 flex flex-col justify-start items-center gap-y-2">
        <ScrollView className="h-56">
          <View className="flex-row justify-center items-center">
            <Text
              className={`font-semibold text-primaryBlue ${
                font === "standard" ? "text-base" : "text-lg"
              }`}
            >
              Our Vision
            </Text>
          </View>
          <Text
            className={`text-primaryBlue text-justify ${
              font === "standard" ? "text-base" : "text-lg"
            }`}
          >
            Going to the gym has become a common practice for many people, and
            many of us have a goal when working out. Whether it's to lose
            weight, gain muscle, or just to stay healthy, we all have a goal in
            mind. But how do we know if we're making progress?
          </Text>
          <Text
            className={`text-primaryBlue text-justify ${
              font === "standard" ? "text-base" : "text-lg"
            }`}
          >
            The team at Plates-Up is commited to make progress visible for our
            users, making progress tracking at the gym easy and available for
            everyone.
          </Text>
        </ScrollView>
      </View>

      <View className="bg-white w-full p-4 flex flex-col justify-start items-center gap-y-2">
        <Text
          className={`font-semibold text-primaryBlue ${
            font === "standard" ? "text-base" : "text-lg"
          }`}
        >
          Open Source Licenses
        </Text>
        <Text
          className={`text-primaryBlue text-justify ${
            font === "standard" ? "text-base" : "text-lg"
          }`}
        >
          Plates-Up is MIT licensed. However, the followings are the list of
          open source licenses used in this application.
        </Text>
        <ScrollView className="h-40 py-2">
          {licenseList?.map((license) => (
            <View key={license?.packageName}>
              <Text
                className={`${font === "standard" ? "text-base" : "text-lg"}`}
              >
                {license?.packageName}: {license?.licenses}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
