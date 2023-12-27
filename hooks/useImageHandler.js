import useAxiosPrivate from "./useAxiosPrivate";
import * as ImagePicker from "expo-image-picker";
const extensions = ["jpg", "jpeg", "png"];

async function selectImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  });

  if (result.canceled) {
    return { result: "No Image selected" };
  }

  const extension = result.assets[0].uri.split(".").at(-1);

  if (!extensions.includes(extension.toLowerCase())) {
    return {
      result: "You can only upload files with these extensions: jpg, jpeg, png",
    };
  }

  const base64Str = result.assets[0].base64.length * 2;
  var fileSizeInByte = Math.ceil(base64Str / 4) * 3;

  if (fileSizeInByte > 11e5) {
    return { result: "File exceeds maximun size" };
  }

  return { result, extension };
}

export function useAddImage() {
  const axiosPrivate = useAxiosPrivate();
  const addImage = async (userId, setloading) => {
    try {
      const { result, extension } = await selectImage();
      if (typeof result === "string") {
        return { result: result };
      }
      setloading(true);
      if (!result.canceled) {
        const response = await axiosPrivate.put(
          `${process.env.EXPO_PUBLIC_URL}/add-images`,
          {
            params: {
              user_id: userId,
              image: `data:image/${extension?.toLowerCase()};base64,${
                result.assets[0].base64
              }`,
            },
          }
        );
        setloading(false);
        return response.data;
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      return {
        result: error.message,
      };
    }
  };
  return addImage;
}

export function useUpdateImage() {
  const axiosPrivate = useAxiosPrivate();
  const updateImage = async (userId, id, setLoading) => {
    const { result, extension } = await selectImage();
    if (typeof result === "string") {
      return { result: result };
    }
    setLoading(true);
    try {
      if (!result.canceled) {
        const response = await axiosPrivate.put(
          `${process.env.EXPO_PUBLIC_URL}/update-images`,
          {
            params: {
              user_id: userId,
              image: `data:image/${extension.toLowerCase()};base64,${
                result.assets[0].base64
              }`,
              id,
            },
          }
        );
        setLoading(false);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return updateImage;
}

export function useDeleteImage() {
  const axiosPrivate = useAxiosPrivate();
  const deleteImage = async (userId, id, setLoading) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.put(
        `${process.env.EXPO_PUBLIC_URL}/delete-images`,
        {
          params: {
            user_id: userId,
            id,
          },
        }
      );
      setLoading(false);
      return response.data.response.modifiedCount == 1;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
    }
  };
  return deleteImage;
}
