import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TinderCardComponent from "../Main/TinderCard";

const ActivitiesUsersDisplay = ({ activity, setActivity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setActivity(null)}
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} size={50} color="#fe3072"/>
        </TouchableOpacity>

        <Text style={styles.title}>{activity}</Text>
      </View>

      <TinderCardComponent activity={activity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  titleHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    left: 8,
    top: 14,
    zIndex: 2,
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default ActivitiesUsersDisplay;
