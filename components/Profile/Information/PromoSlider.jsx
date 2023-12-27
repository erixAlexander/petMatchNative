import { useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-native-reanimated-carousel";
import promos from "../../../utils/promos";

const PromoSlider = () => {
  const carouselRef = useRef();
  const width = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={width * 0.8}
        height={100}
        autoPlay={false}
        data={promos}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.textContainer}>
            <Text style={styles.promoName}>{item.name}</Text>
            <Text style={styles.promoInfo}>{item.info}</Text>
          </View>
        )}
      />
      <View style={styles.btnsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            carouselRef.current.prev();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} color="#fe3072" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => carouselRef.current.next()}
        >
          <FontAwesomeIcon icon={faArrowRight} color="#fe3072" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  promoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fe3072",
  },
  promoInfo: {
    fontSize: 15,
    textAlign: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    gap: 30,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#f6f7f9",
    gap: 5,
  },
});

export default PromoSlider;
