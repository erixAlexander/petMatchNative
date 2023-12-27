import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";

const CustomDropdown = ({ items, handleChange, name, initialValue }) => {
  const [selecting, setSelecting] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => {
            setSelecting(!selecting);
            setTextColor(true);
          }}
        >
          <Text
            style={[
              styles.text,
              !selectedItem ? { color: "gray" } : { color: "black" },
            ]}
          >{`${selectedItem ? selectedItem : initialValue || "Select"}`}</Text>
          {selecting ? (
            <FontAwesomeIcon icon={faArrowUp} color="gray" />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} color="gray" />
          )}
        </TouchableOpacity>
      </View>

      {selecting && (
        <ScrollView style={styles.scrollView}>
          {items.map((item) => {
            return (
              <View key={item} style={styles.option}>
                <TouchableHighlight
                  onPressIn={() => {
                    setTextColor(false);
                  }}
                  onPressOut={() => {
                    setTextColor(true);
                  }}
                  style={styles.btn}
                  underlayColor="gray"
                  onPress={() => {
                    setSelecting(false);
                    setSelectedItem(item);
                    handleChange(name, item);
                  }}
                >
                  <Text
                    style={!textColor ? { color: "white" } : { color: "gray" }}
                  >
                    {typeof item == "string"
                      ? item.charAt(0).toUpperCase() + item.slice(1)
                      : item}
                  </Text>
                </TouchableHighlight>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    width: "100%",
    maxHeight: 150,
    top: 55,
    left: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  container: {
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  dropdown: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginTop: 10,
    height: 50,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  text: {
    fontSize: 15,
  },

  option: {
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  btn: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
export default CustomDropdown;
