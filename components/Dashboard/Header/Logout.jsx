import { StyleSheet, TouchableOpacity } from "react-native";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useLogout from "../../../hooks/useLogout";

const Logout = () => {
  const logout = useLogout();
  return (
    <TouchableOpacity onPress={() => logout() } style={styles.signOut}>
      <FontAwesomeIcon icon={faSignOut} style={styles.icon} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOut: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#000",
  },
});

export default Logout;
