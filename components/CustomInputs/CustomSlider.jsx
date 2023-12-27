import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { StyleSheet } from "react-native";

const CustomSlider = ({ setDistance, distance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Only pets in this range:
        <Text style={styles.distance}> {distance}</Text>Km
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={20}
        maximumValue={180}
        minimumTrackTintColor="#fe3072"
        maximumTrackTintColor="#000000"
        thumbTintColor="#fe3072"
        onValueChange={(val) => setDistance(val)}
        step={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "start",
    justifyContent: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  distance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fe3072",
  },
});

export default CustomSlider;
