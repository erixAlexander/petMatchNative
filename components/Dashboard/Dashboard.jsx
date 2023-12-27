import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useStorageValue from "../../hooks/useStorageValue";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const { setAuth } = useAuth();
  const [bodyView, setBodyView] = useState("main");

  useEffect(() => {
    getUser = async () => {
      try {
        const cookies = await useStorageValue("cookies");
        const userId = cookies.userId;
        const response = await axiosPrivate.get(
          `${process.env.EXPO_PUBLIC_URL}/user`,
          {
            params: { userId },
          }
        );
        setAuth((prev) => ({ ...prev, user: response.data }));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!loading)
    return (
      <View style={styles.container}>
        <Header />
        <Body bodyView={bodyView} />
        <Footer setBodyView={setBodyView} bodyView={bodyView} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Dashboard;
