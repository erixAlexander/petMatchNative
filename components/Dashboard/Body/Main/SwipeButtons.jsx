import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  faArrowRotateLeft,
  faHeart,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SwipeButtons = ({ swipe, restoreCard }) => {
  return (
    <View style={styles.btns}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => swipe("left")}
        title="Swipe left!"
      >
        <FontAwesomeIcon icon={faX} size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          restoreCard();
        }}
        title="Swipe right!"
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => swipe("right")}
        title="Swipe up!"
      >
        <FontAwesomeIcon icon={faHeart} size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: 60,
    margin: 20,
    zIndex: -100,
  },
  btn: {
    backgroundColor: "#eff0f2",
    width: 60,
    height: 60,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

export default SwipeButtons;
