import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorageValue = async (item) => {
  try {
    const cookies = await AsyncStorage.getItem(item);
    if (cookies !== null) {
      const value = JSON.parse(cookies);
      return value;
    } else {
      console.log("Key not found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default useStorageValue;
