import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useLogout from "../../../hooks/useLogout";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../CustomInputs/CustomText";

const SecuritySubmitBtn = ({
  email,
  password,
  user_id,
  validEmail,
  validMatch,
  validPassword,
  setError,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const logOut = useLogout();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (!validEmail) {
        setError("You need to enter a valid Email address");
        return;
      }
      if (!validPassword) {
        setError(
          `Password must be 8 to 24 characters long. Must include uppercase and lowercase letters, a number and a special character .!@#$%`
        );
        return;
      }
      if (!validMatch) {
        setError("Passwords need to match");
        return;
      }

      const response = await axiosPrivate.put(
        `${process.env.EXPO_PUBLIC_URL}/profile`,
        {
          formData: { user_id, email, password },
        }
      );

      response.status == 200 && (await logOut()) && navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <CustomText
          text={"Submit"}
          customStyles={{ color: "white", fontSize: 15 }}
          isBold={true}
        />
      </TouchableOpacity>

      <View>
        <CustomText
          text={"PetM@tch"}
          isBold={true}
          customStyles={{ fontSize: 34 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitBtn: {
    backgroundColor: "#fe3072",
    borderRadius: 10,
    paddingHorizontal: 42,
    paddingVertical: 16,
  },
});

export default SecuritySubmitBtn;
