import { StyleSheet } from "react-native";
import CustomText from "../CustomInputs/CustomText";

const Title = ({ isSignUp }) => {
  return (
    <>
      <CustomText
        text={isSignUp ? "Create an Account" : "Log In"}
        customStyles={styles.title}
        isBold={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 50,
  },
});

export default Title;
