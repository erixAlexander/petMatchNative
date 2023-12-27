import { SafeAreaView } from "react-native-safe-area-context";
import SignIn from "../../components/SignIn/SignIn";

const Login = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <SignIn />
    </SafeAreaView>
  );
};

export default Login;
