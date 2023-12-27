import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import CustomText from "../CustomInputs/CustomText";

const CustomLoginInput = ({
  value,
  setValue,
  valid,
  errorMessage,
  placeholder,
  secure,
}) => {
  return (
    <View style={[styles.section, value && !valid && { height: 120 }]}>
      <View style={valid ? styles.valid : styles.hidden}>
        <FontAwesomeIcon size={20} color="green" icon={faCheck} />
      </View>
      <View style={valid || !value ? styles.hidden : styles.error}>
        <View style={styles.errorMessage}>
          <FontAwesomeIcon icon={faInfoCircle} />
          <CustomText
            text={errorMessage}
            customStyles={value && !valid ? styles.errorMargin : styles.hidden}
          />
        </View>
        <FontAwesomeIcon size={20} color="red" icon={faTimes} />
      </View>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={(val) => setValue(val)}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    height: 80,
    width: "85%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  valid: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  hidden: {
    display: "none",
  },
  error: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  errorMessage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  errorMargin: {
    marginLeft: 8,
    textAlign: "left",
    width: "90%",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
});

export default CustomLoginInput;
