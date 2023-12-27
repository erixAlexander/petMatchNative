import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import useStorageValue from "./useStorageValue";

export default function useLogout() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const logOut = async () => {
    try {
      const jwt = await useStorageValue("cookies");
      await axiosPrivate.get(
        `${process.env.EXPO_PUBLIC_URL}/logout/native-app`,
        {
          headers: {
            jwt: jwt,
          },
        }
      );
      await AsyncStorage.removeItem(
        "cookies",
        (err) => err && console.log("cookies, removeItem", err)
      );
      setAuth((prev) => ({ ...prev, accessToken: null }));
    } catch (error) {
      console.log(error);
    }
  };
  return logOut;
}
