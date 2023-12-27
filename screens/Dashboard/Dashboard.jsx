import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardComponent from "../../components/Dashboard/Dashboard";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DashboardComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
});

export default Dashboard;
