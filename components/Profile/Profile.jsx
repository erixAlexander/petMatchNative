import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ProfileInformation from "./Information/ProfileInformation";
import ProfileImages from "./Images/ProfileImages";
import ProfileSettings from "./Settings/ProfileSettings";
import ProfileSecurity from "./Security/ProfileSecurity";

const Profile = () => {
  const [profile, setProfile] = useState("information");
  return (
    <View style={styles.container}>
      {profile === "information" && (
        <ProfileInformation setProfile={setProfile} />
      )}
      {profile === "images" && <ProfileImages setProfile={setProfile} />}
      {profile === "settings" && <ProfileSettings setProfile={setProfile} />}
      {profile === "security" && <ProfileSecurity setProfile={setProfile} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
