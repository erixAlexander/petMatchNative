import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../CustomInputs/CustomText";
import axios from "axios";

const SubmitBtn = ({
  isSignUp,
  setIsSignUp,
  validEmail,
  validMatch,
  validPassword,
  email,
  password,
  setAuth,
  navigation,
}) => {
  const [error, setError] = useState("");

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(error);
    }
  };

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
      if (isSignUp && !validMatch) {
        setError("Passwords need to match");
        return;
      }

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_URL}/${
          isSignUp ? "signup" : "login"
        }/native-app`,
        { email, password },
        { withCredentials: true }
      );

      if (!response) console.log("No response from server");
      storeData(
        "cookies",
        JSON.stringify({
          userId: response.data.userId,
          jwt: response.data.jwt,
          accessToken: response.data.token,
          date: new Date(Date.now() + 3600 * 1000 * 24),
        })
      );

      setAuth((prev) => ({ ...prev, accessToken: response.data.token }));

      const success = response.status === 201;
      if (success && isSignUp) navigation.navigate("Onboarding");
      if (success && !isSignUp) navigation.navigate("Dashboard");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      setError(error.response.data);
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

      <View style={styles.isSignUp}>
        {isSignUp ? (
          <TouchableOpacity onPress={() => setIsSignUp(false)}>
            <CustomText
              text={"Already have an account?"}
              isBold={true}
              customStyles={{ fontSize: 16 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsSignUp(true)}>
            <CustomText
              text={"Don't have an account yet?"}
              isBold={true}
              customStyles={{ fontSize: 16 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.appName}>
        <Text style={styles.error}>{error}</Text>
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
  isSignUp: {
    marginTop: 20,
  },
  appName: {
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SubmitBtn;
