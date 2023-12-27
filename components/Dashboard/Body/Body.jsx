import { View, StyleSheet } from "react-native";
import Main from "./Main/Main";
import Chat from "./Chat/Chat";
import Activities from "./Activities/Activities";

const Body = ({ bodyView }) => {

  return (
    <View style={styles.body}>
      {bodyView === "main" && <Main />}
      {bodyView === "chat" && <Chat />}
      {bodyView === "activities" && <Activities />}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Body;
