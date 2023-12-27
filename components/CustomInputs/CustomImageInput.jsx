import { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CustomImageInput({ images, setImages }) {
  const [getNewImage, setGetNewImage] = useState("first");
  const [error, setError] = useState(null);
  const extensions = ["jpg", "jpeg", "png"];

  const pickImage = async () => {
    setError(null);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      const extension = result.assets[0].uri.split(".").at(-1);

      if (!extensions.includes(extension.toLowerCase())) {
        setError(
          "You can only upload files with these extensions: jpg, jpeg, png"
        );
        return;
      }

      const base64Str = result.assets[0].base64.length * 2;

      var fileSizeInByte = Math.ceil(base64Str / 4) * 3;

      if (fileSizeInByte > 11e5) {
        setError("File exceeds maximun size");
        return;
      }

      if (!result.canceled) {
        setImages((prev) => [
          ...prev,
          {
            uri: result.assets[0].uri,
            base64: `data:image/${extension.toLowerCase()};base64,${
              result.assets[0].base64
            }`,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (images.length < 4 && images.length > 0) {
      setGetNewImage("another");
      return;
    }
    if (images.length > 3) {
      setGetNewImage("maxed");
      return;
    }
  }, [images]);

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 2 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={
            getNewImage !== "maxed"
              ? pickImage
              : () => {
                  setImages([]);
                  setGetNewImage("first");
                }
          }
        >
          <Text style={styles.text}>
            {getNewImage === "first"
              ? `Upload an image of your pet`
              : getNewImage === "another"
              ? "Upload another image?"
              : "Clear Images and upload again?"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.secondaryText}>
          {getNewImage === "maxed"
            ? "You already uploaded 4 images"
            : "You can upload up to 4 images"}
        </Text>
      </View>
      <View>{error && <Text style={styles.error}>{error}</Text>}</View>
      <View style={styles.imgContainer}>
        {images &&
          images.map((image, i) => (
            <Image key={i} source={{ uri: image.uri }} style={styles.img} />
          ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100",
    alignItems: "start",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  secondaryText: {
    color: "gray",
    fontWeight: "bold",
    marginVertical: 5,
    fontSize: 13,
  },
  btn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderStyle: "solid",
    borderColor: "#fe3072",
    backgroundColor: "#fe3072",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  imgContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  img: {
    width: "40%",
    height: 100,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
