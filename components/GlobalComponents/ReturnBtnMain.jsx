import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const ReturnBtnMain = ({ setProfile, profileScreen }) => {
  return (
    <View style={styles.goBackBtn}>
      <TouchableOpacity onPress={() => setProfile(profileScreen)}>
        <FontAwesomeIcon icon={faCircleChevronLeft} size={35} color="#fe3072" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackBtn: {
    position: "absolute",
    left: 12,
    top: 20,
    zIndex: 2,
  },
});

export default ReturnBtnMain;
