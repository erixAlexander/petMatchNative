import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../components/CustomInputs/CustomText";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://res.cloudinary.com/dhttotcxc/image/upload/v1680999924/karsten-winegeart-7vhqnO-sT88-unsplash_hui2jv.jpg",
        }}
        style={{ flex: 1 }}
      >
        <Navbar />
        <View style={styles.name}>
          <CustomText
            text={"PetM@tch"}
            isBold={true}
            customStyles={{ fontSize: 52 }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  name: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default Home;
