import { StyleSheet } from "react-native";
import { TouchableOpacity, Text } from "react-native";

const CustomCheckbox = ({ name, handleCheck, value, selected, width = 24 }) => {
  return (
    <TouchableOpacity
      onPress={() => handleCheck(name, value)}
      style={[
        styles.container,
        { width:`${width}%` },
        selected === value && {
          backgroundColor: "#fe3072",
          borderColor: "#fe3072",
        },
      ]}
    >
      <Text style={[styles.text, selected === value && { color: "#fff" }]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderStyle: "solid",
    borderColor: "#c4c4c4",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 5,
  },
  text: {
    fontSize: 16,

    color: "gray",
  },
});

export default CustomCheckbox;
