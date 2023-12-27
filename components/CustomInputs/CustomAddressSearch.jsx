import { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import CustomTextInput from "./CustomTextInput";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function CustomAddressSearch({ address, setAddress, isUpdate }) {
  const [update, setUpdate] = useState(isUpdate); // [1
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(false);

  const changeQuery = (name, value) => {
    setSelected(false);
    setQuery(value);
  };

  const getNearbyPlaces = async (
    query,
    lat,
    long,
    API_KEY,
    limit = 100,
    radius = 60000
  ) => {
    try {
      const baseUrl = "https://api.tomtom.com/search/2/poiSearch";
      let queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${API_KEY}`;
      let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
      setPlaces(response.data.results);
      console.log(response.data.results.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (query != "" && location?.lat != null && !selected) {
      getNearbyPlaces(
        query,
        location.lat,
        location.long,
        process.env.EXPO_PUBLIC_TOMTOM
      );
    }
    if (query == "") {
      setPlaces([]);
      !update && setAddress("");
      update && setUpdate(false);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.locationTitle}>Closest location: </Text>
      {address != "" ? (
        <Text style={styles.location}>{address.full_name}</Text>
      ) : (
        <Text style={styles.location}>{"No location selected"}</Text>
      )}

      {errorMsg && <Text>{errorMsg}</Text>}

      <CustomTextInput
        value={query}
        onChangeText={changeQuery}
        placeholder={"Select Closest Location"}
        name={null}
      />
      {places?.length > 0 && (
        <View className="border w-2/3">
          <ScrollView
            scrollEnabled={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            style={styles.scrollView}
          >
            {places?.slice(0, 10).map((place, i) => {
              const addressInfo = {
                country: place.address.country,
                name: place.address.localName,
                lat: place.position.lat,
                lon: place.position.lon,
                full_name: place.poi.name,
              };
              return (
                <TouchableHighlight
                  style={styles.locationBtn}
                  key={i}
                  underlayColor="gray"
                  onPress={() => {
                    setSelected(true);
                    setQuery(place.poi.name + " " + place.address.localName);
                    setAddress(addressInfo);
                    setPlaces([]);
                  }}
                >
                  <Text style={styles.locationItem}>
                    {place.poi.name + " " + place.address.localName}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  location: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  scrollView: {
    width: "100%",
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
  },
  locationItem: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
    color: "gray",
  },
  locationBtn: {
    width: "100%",
  },
});
