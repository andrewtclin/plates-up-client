import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import licenses from "../utils/openSourceLicenses.json";

export default function About() {
  const [licenseList, setLicenseList] = useState([]);

  useEffect(() => {
    const formattedLicenses = Object.entries(licenses).map(
      ([packageName, details]) => ({
        packageName,
        ...details,
      })
    );
    setLicenseList(formattedLicenses);
  }, []);

  return (
    <View className="flex flex-col justify-center items-center p-4 px-12 gap-y-4">
      <Text className="text-xl text-primaryBlue">About Plates-Up</Text>
      <View className="bg-white w-full p-4 flex flex-col justify-start items-center gap-y-2">
        <Text className="font-semibold text-primaryBlue">Our Vision</Text>
        <Text className="text-primaryBlue text-justify">
          Going to the gym has become a common practice for many people, and
          many of us have a goal when working out. Whether it's to lose weight,
          gain muscle, or just to stay healthy, we all have a goal in mind. But
          how do we know if we're making progress?
        </Text>
        <Text className="text-primaryBlue text-justify">
          The team at Plates-Up is commited to make progress visible for our
          users, making progress tracking at the gym easy and available for
          everyone.
        </Text>
      </View>

      <View className="bg-white w-full p-4 flex flex-col justify-start items-center gap-y-2">
        <Text className="font-semibold text-primaryBlue">
          Open Source Licenses
        </Text>
        <Text className="text-primaryBlue text-justify">
          Plates-Up is MIT licensed. However, the followings are the list of
          open source licenses used in this application.
        </Text>
        <ScrollView className="h-60 py-2">
          {licenseList?.map((license) => (
            <View key={license?.packageName}>
              <Text>
                {license?.packageName}: {license?.licenses}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
