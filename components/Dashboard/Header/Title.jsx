import { View, StyleSheet, Text } from "react-native";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>PetM@tch</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Title;
