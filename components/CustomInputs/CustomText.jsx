import { Text } from "react-native";
import { useFonts } from "expo-font";

export default function CustomText({ text, isBold, customStyles }) {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text
      style={{
        fontFamily: `${isBold ? "Nunito-Bold" : "Nunito-Regular"}`,
        ...customStyles,
      }}
    >
      {text}
    </Text>
  );
}
