import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home/Home";
import Dashboard from "./screens/Dashboard/Dashboard";
import Login from "./screens/Login/Login";
import Onboarding from "./screens/Onboarding/Onboarding";
import Profile from "./screens/Profile/Profile";
import TestScreen from "./screens/TestScreen";
import useAuth from "./hooks/useAuth";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const { auth } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      {auth.accessToken ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      )}
    </Stack.Navigator>
  );
}
