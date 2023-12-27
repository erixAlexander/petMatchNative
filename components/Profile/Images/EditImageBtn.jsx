import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDeleteImage, useUpdateImage } from "../../../hooks/useImageHandler";
import useAuth from "../../../hooks/useAuth";

const EditImageBtn = ({ small, setLoading, imageId, setError, index }) => {
  const { auth, setAuth } = useAuth();
  const updateImage = useUpdateImage();
  const deleteImage = useDeleteImage();

  const handleDeleteImage = async () => {
    try {
      setError(false);
      const deleted = await deleteImage(auth.user.user_id, imageId, setLoading);
      if (!deleted) {
        setError("Something went wrong");
        return;
      }
      setAuth((prev) => {
        return {
          ...prev,
          user: {
            ...prev.user,
            images: prev.user.images.filter((img) => img.id !== imageId),
          },
        };
      });
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  const handleUpdateImage = async () => {
    try {
      setError(false);
      const { response, image } = await updateImage(
        auth.user.user_id,
        imageId,
        setLoading
      );
      if (response.modifiedCount !== 1) {
        setError("Something went wrong");
        return;
      }
      setAuth((prev) => {
        prev.user.images.splice(index, 1, image);
        return {
          ...prev,
          user: {
            ...prev.user,
            images: prev.user.images,
          },
        };
      });
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <View style={small ? styles.editBtnsSmall : styles.editBtns}>
      <TouchableOpacity
        onPress={() => handleUpdateImage()}
        style={small ? styles.editBtnSmall : styles.editBtn}
      >
        <FontAwesomeIcon icon={faPencil} color="white" size={small ? 16 : 20} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteImage()}
        style={small ? styles.editBtnSmall : styles.editBtn}
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          color="white"
          size={small ? 16 : 20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  editBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 100,
    gap: 20,
  },
  editBtn: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  editBtnsSmall: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    gap: 20,
  },
  editBtnSmall: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
});

export default EditImageBtn;
