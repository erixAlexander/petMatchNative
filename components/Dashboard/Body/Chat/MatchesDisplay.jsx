import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const MatchesDisplay = ({ matches, setSelectedMatch }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
        horizontal
      >
        {matches.map((match) => (
          <TouchableOpacity
            onPress={() => setSelectedMatch(match)}
            style={styles.card}
            key={match.user_id}
          >
            <ImageBackground
              source={{ uri: match.images[0].url }}
              style={styles.img}
              imageStyle={{ borderRadius: 5 }}
              resizeMode="cover"
            >
              <Text style={styles.name}>{match.pet_name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MatchesDisplay;
