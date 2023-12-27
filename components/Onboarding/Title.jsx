import { StyleSheet } from "react-native";
import CustomText from "../CustomInputs/CustomText";

const Title = ({ text }) => {
  return (
    <>
      <CustomText text={text} customStyles={styles.title} isBold={true} />
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
    width: "100%",
    height: 50,
  },
});

export default Title;
