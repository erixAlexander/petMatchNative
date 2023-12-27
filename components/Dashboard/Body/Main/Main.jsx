import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TinderCard from "./TinderCard";

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", width: "100%" }}>
      <TinderCard />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Main;
