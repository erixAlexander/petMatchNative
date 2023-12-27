import {
  faFireAlt,
  faList,
  faMessage,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const Footer = ({ setBodyView, bodyView }) => {
  return (
    <View style={styles.footer}>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setBodyView("main")}
        >
          <FontAwesomeIcon
            color={bodyView === "main" ? "#fff" : "#000"}
            icon={faFireAlt}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setBodyView("activities")}
        >
          <FontAwesomeIcon
            color={bodyView === "activities" ? "#fff" : "#000"}
            icon={faList}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setBodyView("search")}
        >
          <FontAwesomeIcon
            color={bodyView === "search" ? "#fff" : "#000"}
            icon={faSearch}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setBodyView("chat")}
        >
          <FontAwesomeIcon
            color={bodyView === "chat" ? "#fff" : "#000"}
            icon={faMessage}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fe3072",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Footer;
