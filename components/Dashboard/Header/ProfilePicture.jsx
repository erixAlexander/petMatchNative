import { StyleSheet, Image, TouchableOpacity } from "react-native";
import useAuth from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const ProfilePicture = () => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile")}
      style={styles.pictureContainer}
    >
      <Image
        style={styles.picture}
        source={{
          uri: auth.user?.images[0].url,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ProfilePicture;
