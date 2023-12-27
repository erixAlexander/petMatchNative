import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useRegexValidation from "../../hooks/useRegexValidation";
import useAuth from "../../hooks/useAuth";
import Title from "./Title";
import ReturnBtn from "./ReturnBtn";
import CustomLoginInput from "./CustomLogInput";
import SubmitBtn from "./SubmitBtn";

const SignIn = () => {
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

  const { isSignUp, setIsSignUp, setAuth } = useAuth();
  const navigation = useNavigation();

  return (
    <>
      <ReturnBtn navigation={navigation} />

      <Title isSignUp={isSignUp} />
      
      <View style={styles.inputs}>
        <CustomLoginInput
          value={email}
          valid={validEmail}
          setValue={setEmail}
          errorMessage={"Please enter a valid Email"}
          placeholder={"Email"}
          secure={false}
        />

        <CustomLoginInput
          value={password}
          valid={validPassword}
          setValue={setPassword}
          errorMessage={`Must be 8 to 24 characters long, include uppercase and lowercase letters, a number and a special character .!@#$%`}
          placeholder={"Password"}
          secure={true}
        />

        {isSignUp && (
          <CustomLoginInput
            value={confirmedPassword}
            valid={validMatch}
            setValue={setConfirmedPassword}
            errorMessage={"Passwords must match"}
            placeholder={"Confirm Password"}
            secure={true}
          />
        )}
      </View>
      
      <SubmitBtn
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        email={email}
        password={password}
        validEmail={validEmail}
        validPassword={validPassword}
        validMatch={validMatch}
        navigation={navigation}
        setAuth={setAuth}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignIn;
