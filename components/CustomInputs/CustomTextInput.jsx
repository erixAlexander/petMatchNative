import { TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({ value, onChangeText, name, placeholder }) => {
  return (
    <TextInput
      value={value}
      onChangeText={(val) => onChangeText(name, val)}
      placeholder={placeholder}
      style={styles.textInput}
      placeholderTextColor="gray" 
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    width: "100%",
    marginTop: 10,
    height: 50,
  },
});

export default CustomTextInput;
