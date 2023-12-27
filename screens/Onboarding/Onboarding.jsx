import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingComponent from "../../components/Onboarding/Onboarding";

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    justifyContent: "flex-end",
    bacgroundColor: "#fff",
  },
});

export default Onboarding;
