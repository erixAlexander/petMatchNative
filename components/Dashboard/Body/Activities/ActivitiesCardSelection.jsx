import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import activities, { mainActivity } from "../../../../utils/activities";

const ActivitiesCardSelection = ({ setActivity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => setActivity(mainActivity.name)}
          style={styles.mainActivity}
        >
          <Text style={styles.mainText}>Main Activity</Text>
          <View style={styles.overlay}></View>
          <Image style={styles.img} source={{ uri: activities[0].img }} />
        </TouchableOpacity>
      </View>
      <View style={styles.secondaryContainer}>
        {activities.map((activity) => (
          <TouchableOpacity
            onPress={() => setActivity(activity.name)}
            key={activity.name}
            style={styles.activity}
          >
            <Text style={styles.text}>{activity.name}</Text>
            <View style={styles.overlay}></View>
            <Image style={styles.img} source={{ uri: activity.img }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  mainContainer: {
    flex: 1,
    width: "90%",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainActivity: {
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 20,
  },
  mainText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    zIndex: 10,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 20,
    zIndex: 5,
  },
  secondaryContainer: {
    flex: 2,
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activity: {
    backgroundColor: "white",
    width: "45%",
    height: 140,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 10,
  },
});

export default ActivitiesCardSelection;
