import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import NavButtons from "./NavButtons";

const Navbar = () => {
  const navigation = useNavigation();
  const { setIsSignUp, auth } = useAuth();
  const logout = useLogout();

  const handleSignUp = () => {
    navigation.navigate("Login");
    setIsSignUp(true);
  };

  const handleLogIn = () => {
    navigation.navigate("Login");
    setIsSignUp(false);
  };

  const goToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../../assets/icon.png")} />
      <View style={styles.btnContainer}>
        {auth.accessToken == null ? (
          <NavButtons
            firstText={"Log In"}
            secondText={"Sign Up"}
            handleFirstButton={handleLogIn}
            handleSecondButton={handleSignUp}
          />
        ) : (
          <NavButtons
            firstText={"Dashboard"}
            secondText={"Log Out"}
            handleFirstButton={goToDashboard}
            handleSecondButton={handleLogout}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  img: {
    width: 65,
    height: 65,
    margin: 0,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Navbar;
