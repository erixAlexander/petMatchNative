import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import useStorageValue from "../../hooks/useStorageValue";
import ReturnBtn from "./ReturnBtn";
import Title from "./Title";
import CustomTextInput from "../CustomInputs/CustomTextInput";
import CustomDropdown from "../CustomInputs/CustomDropdown";
import CustomCheckbox from "../CustomInputs/CustomCheckbox";
import CustomImageInput from "../CustomInputs/CustomImageInput";
import CustomAddressSearch from "../CustomInputs/CustomAddressSearch";
import CustomSlider from "../CustomInputs/CustomSlider";
import yearsArray from "../../utils/yearsArray";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Onboarding = () => {
  const navigation = useNavigation();
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState(null);

  const [petInfo, setPetInfo] = useState({
    user_id: "",
    pet_name: "",
    dob_year: "",
    gender_identity: "",
    type_of_pet: "",
    gender_interest: "",
    about: "",
    pedigree: false,
  });

  const [lookingFor, setLookingFor] = useState({
    mate: { selected: false, value: "" },
    friend: { selected: false, value: "" },
    adopt: { selected: false, value: "" },
    give_for_adoption: { selected: false, value: "" },
  });

  const [images, setImages] = useState([]);

  const [address, setAddress] = useState({
    country: "",
    name: "",
    lat: "",
    lon: "",
    full_name: "",
  });
  const [distance, setDistance] = useState(40);

  const onChangeText = (name, val) => {
    setPetInfo({ ...petInfo, [name]: val });
  };

  const onDropdownChange = (name, val) => {
    if (name === "pedigree") {
      val === "Yes"
        ? setPetInfo({ ...petInfo, [name]: true })
        : setPetInfo({ ...petInfo, [name]: false });
      return;
    }
    setPetInfo({ ...petInfo, [name]: val });
  };

  const onCheckboxChange = (name, val) => {
    if (petInfo[name] === val) {
      setPetInfo({ ...petInfo, [name]: "" });
      return;
    }
    setPetInfo({ ...petInfo, [name]: val });
  };

  const onCheckboxChangeMultiple = (name, val) => {
    if (lookingFor[name].value === val) {
      setLookingFor({ ...lookingFor, [name]: { selected: false, value: "" } });
      return;
    }
    setLookingFor({ ...lookingFor, [name]: { selected: true, value: val } });
  };

  const handleSubmit = async () => {
    const stringFields = Object.keys(petInfo).filter(
      (key) => typeof petInfo[key] === "string"
    );

    const emptyFields = stringFields.filter((key) => petInfo[key] === "");

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields.");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image.");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    if (!address.name) {
      setError("Please enter your location.");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    try {
      const lookingForObj = {
        mate: lookingFor.mate.selected,
        friend: lookingFor.friend.selected,
        adopt: lookingFor.adopt.selected,
        give_for_adoption: lookingFor.give_for_adoption.selected,
      };

      const base64Images = images.map((image) => image.base64);

      const response = await axiosPrivate.put(
        `${process.env.EXPO_PUBLIC_URL}/user`,
        {
          formData: {
            ...petInfo,
            lookingForObj,
            images: base64Images,
            address_info: address,
            distance,
            activity: "",
            user_matches: [],
          },
        }
      );
      if (response.status == 200) {
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const cookies = await useStorageValue("cookies");
      setPetInfo({ ...petInfo, user_id: cookies.userId });
    })();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ReturnBtn />

        <View style={styles.form}>
          <Title text={"Create Your Account"} />

          <Text style={styles.label}>Name:</Text>
          <CustomTextInput
            placeholder={"Pet Name"}
            name={"pet_name"}
            value={petInfo.pet_name}
            onChangeText={onChangeText}
          />

          <Text style={styles.label}>About:</Text>
          <CustomTextInput
            placeholder={"About My Pet"}
            name={"about"}
            value={petInfo.about}
            onChangeText={onChangeText}
          />

          <Text style={styles.label}>My pet is a:</Text>
          <CustomDropdown
            items={["dog", "cat"]}
            name={"type_of_pet"}
            handleChange={onDropdownChange}
          />

          <Text style={styles.label}>Date of birth:</Text>
          <CustomDropdown
            items={yearsArray}
            name={"dob_year"}
            handleChange={onDropdownChange}
          />

          <Text style={styles.label}>Pedigree:</Text>
          <CustomDropdown
            items={["Yes", "No"]}
            name={"pedigree"}
            handleChange={onDropdownChange}
          />

          <Text style={styles.label}>My pet's gender is:</Text>
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              name={"gender_identity"}
              value={"male"}
              selected={petInfo.gender_identity}
              handleCheck={onCheckboxChange}
            />
            <CustomCheckbox
              name={"gender_identity"}
              value={"female"}
              selected={petInfo.gender_identity}
              handleCheck={onCheckboxChange}
            />
          </View>

          <Text style={styles.label}>We would like to see:</Text>
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              name={"gender_interest"}
              value={"male"}
              selected={petInfo.gender_interest}
              handleCheck={onCheckboxChange}
            />
            <CustomCheckbox
              name={"gender_interest"}
              value={"female"}
              selected={petInfo.gender_interest}
              handleCheck={onCheckboxChange}
            />
            <CustomCheckbox
              name={"gender_interest"}
              value={"any"}
              selected={petInfo.gender_interest}
              handleCheck={onCheckboxChange}
            />
          </View>

          <Text style={styles.label}>I am looking for:</Text>
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              name={"mate"}
              value={"mate"}
              selected={lookingFor.mate.value}
              handleCheck={onCheckboxChangeMultiple}
              width={45}
            />
            <CustomCheckbox
              name={"friend"}
              value={"friend"}
              selected={lookingFor.friend.value}
              handleCheck={onCheckboxChangeMultiple}
              width={45}
            />
            <CustomCheckbox
              name={"adopt"}
              value={"adopt"}
              selected={lookingFor.adopt.value}
              handleCheck={onCheckboxChangeMultiple}
              width={45}
            />
            <CustomCheckbox
              name={"give_for_adoption"}
              value={"give for adoption"}
              selected={lookingFor.give_for_adoption.value}
              handleCheck={onCheckboxChangeMultiple}
              width={45}
            />
          </View>

          <Text style={styles.label}>Upload you images:</Text>
          <CustomImageInput images={images} setImages={setImages} />

          <CustomAddressSearch setAddress={setAddress} address={address} />

          <CustomSlider distance={distance} setDistance={setDistance} />

          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
  },
  form: {
    width: "80%",
    height: "100%",
    alignItems: "start",
    justifyContent: "flex-start",
    position: "relative",
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginTop: 10,
  },
  submitBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#fe3072",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fe3072",
    borderRadius: 10,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Onboarding;
