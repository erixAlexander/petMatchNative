import { StyleSheet, Text, TouchableOpacity } from "react-native";

const NavButtons = ({
  firstText,
  secondText,
  handleFirstButton,
  handleSecondButton,
}) => {
  return (
    <>
      <TouchableOpacity onPress={handleFirstButton} style={styles.button}>
        <Text style={styles.text}>{firstText}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSecondButton} style={styles.button}>
        <Text style={styles.text}>{secondText}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fe3072",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12.5,
    textAlign: "center",
  },
});

export default NavButtons;
