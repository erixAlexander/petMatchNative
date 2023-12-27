import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ActivitiesCardSelection from "./ActivitiesCardSelection";
import ActivitiesUsersDisplay from "./ActivitiesUsersDisplay";

const Activities = () => {
  const [activity, setActivity] = useState(null);

  return (
    <View style={styles.container}>
      {!activity && <ActivitiesCardSelection setActivity={setActivity} />}
      {activity && (
        <ActivitiesUsersDisplay activity={activity} setActivity={setActivity} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Activities;
