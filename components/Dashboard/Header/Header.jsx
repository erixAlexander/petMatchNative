import { View, StyleSheet } from "react-native";
import Logout from "./Logout";
import Title from "./Title";
import ProfilePicture from "./ProfilePicture";

const Header = () => {
  return (
    <View style={styles.header}>
      <ProfilePicture />
      <Title />
      <Logout />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Header;
