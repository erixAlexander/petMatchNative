import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  faCamera,
  faPencil,
  faShield,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useAuth from "../../../hooks/useAuth";
import PromoSlider from "./PromoSlider";
import { useNavigation } from "@react-navigation/native";

const ProfileInformation = ({ setProfile }) => {
  const { auth } = useAuth();
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.profileImageContainer}>
        <View style={styles.goBackBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size={35}
              color="#fe3072"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}>
          <Image source={{ uri: auth.user.images[0].url }} style={styles.img} />
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => {
              setProfile("settings");
            }}
          >
            <FontAwesomeIcon icon={faPencil} size={17} />
            <Text style={styles.btnText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBtn, { marginTop: 25 }]}
            onPress={() => {
              setProfile("security");
            }}
          >
            <FontAwesomeIcon icon={faShield} size={17} />
            <Text style={styles.btnText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => {
              setProfile("images");
            }}
          >
            <FontAwesomeIcon icon={faCamera} size={17} />
            <Text style={styles.btnText}>Images</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.petName}>{auth.user.pet_name}</Text>
        <View style={styles.aboutContainer}>
          <Text style={styles.pet_info}>
            Year of birth {auth.user.dob_year}
          </Text>
          <Text>About</Text>
          <View style={styles.aboutBox}>
            <Text style={styles.pet_info}>{auth.user.about}</Text>
          </View>
        </View>
      </View>
      <View style={styles.promoContainer}>
        <PromoSlider />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    justifyContent: "space-between",
    flex: 3,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    gap: 5,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 20,
  },
  imgContainer: {
    width: "100%",
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  promoContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  optionBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#f6f7f9",
    gap: 5,
  },
  btnText: {
    fontSize: 12,
  },
  petName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pet_info: {
    fontSize: 16,
  },
  aboutBox: {
    width: "100%",
    alignItems: "start",
    justifyContent: "flex-start",
    backgroundColor: "#f6f7f9",
    padding: 10,
    maxHeight: 100,
    height: 100,
    borderRadius: 10,
  },
  aboutContainer: {
    width: "80%",
    alignItems: "start",
    justifyContent: "center",
    marginTop: 20,
  },
  goBackBtn: {
    position: "absolute",
    left: 12,
    top: 20,
    zIndex: 2,
  },
});

export default ProfileInformation;
