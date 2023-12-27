import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useAddImage } from "../../../hooks/useImageHandler";
import useAuth from "../../../hooks/useAuth";
import EditImagesbtn from "./EditImageBtn";
import Loading from "../../GlobalComponents/Loading/Loading";
import ReturnBtnMain from "../../GlobalComponents/ReturnBtnMain";

const ProfileImages = ({ setProfile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [images, setImages] = useState([]);
  const { auth, setAuth } = useAuth();
  const [mainImage, setMainImage] = useState(auth.user.images[0].url);
  const addImage = useAddImage();

  useEffect(() => {
    setImages(auth.user.images);
  }, [auth.user.images]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <>
      <ReturnBtnMain setProfile={setProfile} profileScreen={"information"} />
      <View style={styles.mainImageContainer}>
        <Image style={styles.img} source={{ uri: mainImage }} />
        {/* {mainImage !== auth.user.images[0].url && (
          <TouchableOpacity style={styles.setDefault}>
            <Text style={styles.setDefaultText}>Set as Profile Image</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            onPress={() =>
              editImages || editImages === 0
                ? (setEditImages(false),
                  setError(false),
                  setMainImage(auth.user.images[0].url))
                : (setEditImages(index),
                  setError(false),
                  setMainImage(image.url))
            }
            key={index}
            style={styles.imageContainer}
          >
            <Image source={{ uri: image.url }} style={styles.image} />
            {editImages === index && (
              <EditImagesbtn
                small={true}
                setLoading={setLoading}
                imageId={image.id}
                setError={setError}
                index={index}
              />
            )}
          </TouchableOpacity>
        ))}
        {images.length < 4 && (
          <TouchableOpacity
            onPress={async () => {
              setEditImages(false);
              setError(false);
              const { response, image, result } = await addImage(
                auth.user.user_id,
                setLoading
              );
              if (response?.modifiedCount === 1) {
                setAuth((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    images: [...prev.user.images, image],
                  },
                }));
              } else {
                setError(result || "Something went wrong");
              }
            }}
            style={styles.imageContainer}
          >
            <FontAwesomeIcon icon={faCamera} size={50} style={styles.image} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorMessage}>
          {typeof error === "string" ? error : "Something Went Wrong"}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainImageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    flex: 2,
    width: "90%",
  },
  img: {
    width: "80%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  imageBtn: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
    position: "absolute",
  },
  imageContainer: {
    width: "45%",
    height: 150,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
  },

  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    bottom: 50,
  },
  setDefault: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fe3072",
    padding: 10,
    width: "80%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  setDefaultText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ProfileImages;
