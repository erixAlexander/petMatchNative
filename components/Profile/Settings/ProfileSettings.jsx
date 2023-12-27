import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CustomTextInput from "../../CustomInputs/CustomTextInput";
import CustomDropdown from "../../CustomInputs/CustomDropdown";
import CustomCheckbox from "../../CustomInputs/CustomCheckbox";
import CustomAddressSearch from "../../CustomInputs/CustomAddressSearch";
import CustomSlider from "../../CustomInputs/CustomSlider";
import yearsArray from "../../../utils/yearsArray";
import ReturnBtnMain from "../../GlobalComponents/ReturnBtnMain";

const ProfileSettings = ({ setProfile }) => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [address, setAddress] = useState({
    country: auth.user.address_info.country,
    name: auth.user.address_info.name,
    lat: auth.user.address_info.lat,
    lon: auth.user.address_info.lon,
    full_name: auth.user.address_info.full_name,
  });
  const [distance, setDistance] = useState(40);
  const [petInfo, setPetInfo] = useState({
    user_id: auth.user.user_id,
    pet_name: auth.user.pet_name,
    dob_year: auth.user.dob_year,
    gender_identity: auth.user.gender_identity,
    type_of_pet: auth.user.type_of_pet,
    gender_interest: auth.user.gender_interest,
    about: auth.user.about,
    pedigree: auth.user.pedigree,
  });

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

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.put(
        `${process.env.EXPO_PUBLIC_URL}/profile`,
        {
          formData: {
            ...petInfo,
            address_info: address,
            distance: distance,
          },
        }
      );
      if (response.status === 200) {
        setAuth({ ...auth, user: response.data });
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ReturnBtnMain setProfile={setProfile} profileScreen={"information"} />

        <Text style={styles.title}>Change your information</Text>
        <View style={styles.form}>
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
            initialValue={petInfo.type_of_pet}
          />

          <Text style={styles.label}>Date of birth:</Text>
          <CustomDropdown
            items={yearsArray}
            name={"dob_year"}
            handleChange={onDropdownChange}
            initialValue={petInfo.dob_year}
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

          <View style={styles.marginTop}>
            <CustomAddressSearch
              setAddress={setAddress}
              address={address}
              isUpdate={true}
            />
          </View>
          <CustomSlider distance={distance} setDistance={setDistance} />

          {error && (
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
              {error}
            </Text>
          )}
          {success && (
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>
              {success}
            </Text>
          )}

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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: -10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 40,
    marginBottom: 20,
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  marginTop: {
    marginTop: 20,
  },
  submitBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#fe3072",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
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

export default ProfileSettings;
