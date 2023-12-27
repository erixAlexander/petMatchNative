import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, TouchableOpacity } from "react-native";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const ReturnBtn = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.btn}
      >
        <FontAwesomeIcon icon={faXmarkCircle} size={30} color="black" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    top: 30,
    left: 6,
    backgroundColor: "white",
    borderRadius: 50,
    zIndex: 1,
  },
});

export default ReturnBtn;
