import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";
import ReturnBtnMain from "../../GlobalComponents/ReturnBtnMain";
import useRegexValidation from "../../../hooks/useRegexValidation";
import CustomLoginInput from "../../SignIn/CustomLogInput";
import SecuritySubmitBtn from "./SecuritySubmitBtn";

const ProfileSecurity = ({ setProfile }) => {
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState(null);

  const {
    email,
    setEmail,
    validEmail,
    password,
    setPassword,
    validPassword,
    confirmedPassword,
    setConfirmedPassword,
    validMatch,
  } = useRegexValidation();

  useEffect(() => {
    setEmail(auth?.user.email);
  }, []);

  return (
    <View style={styles.container}>
      <ReturnBtnMain setProfile={setProfile} profileScreen={"information"} />

      <Text style={styles.title}>Change Your Security Information</Text>

      <View style={styles.inputs}>
        <CustomLoginInput
          value={email}
          valid={validEmail}
          setValue={setEmail}
          errorMessage={"Please enter a valid Email"}
          placeholder={" New Email"}
          secure={false}
        />

        <CustomLoginInput
          value={password}
          valid={validPassword}
          setValue={setPassword}
          errorMessage={`Must be 8 to 24 characters long, include uppercase and lowercase letters, a number and a special character .!@#$%`}
          placeholder={"New Password"}
          secure={true}
        />

        <CustomLoginInput
          value={confirmedPassword}
          valid={validMatch}
          setValue={setConfirmedPassword}
          errorMessage={"Passwords must match"}
          placeholder={"Confirm New Password"}
          secure={true}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <SecuritySubmitBtn
          validEmail={validEmail}
          validMatch={validMatch}
          validPassword={validPassword}
          email={email}
          password={password}
          user_id={auth?.user.user_id}
          setError={setError}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  inputs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProfileSecurity;
