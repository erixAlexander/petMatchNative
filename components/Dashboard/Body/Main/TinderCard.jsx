import React, { useState, useMemo, useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import useGetCardUsers from "../../../../hooks/useGetCardUsers";
import useAuth from "../../../../hooks/useAuth";
import useAddMatchedUser from "../../../../hooks/useAddMatchedUser";
import TinderCard from "react-tinder-card";
import SwipeButtons from "./SwipeButtons";
import Loading from "../../../GlobalComponents/Loading/Loading";

const TinderCardComponent = ({ activity }) => {
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const cardUsers = useGetCardUsers(auth.user, activity);
  const addMatchedUser = useAddMatchedUser();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiped = async (dir, matchId) => {
    if (dir === "right") {
      const updatedUser = await addMatchedUser(auth.user.user_id, matchId);
      setAuth({ ...auth, user: updatedUser });
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const swipe = (dir) => {
    if (currentIndex > -1) {
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  const restoreCard = () => {
    if (currentIndex >= profiles.length - 1) return;
    childRefs[currentIndex + 1].current.restoreCard();
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      let users = await cardUsers();

      for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
      }

      setProfiles(users);
      setCurrentIndex(users.length - 1);
    })();
  }, []);

  const childRefs = useMemo(() => {
    setLoading(false);
    if (profiles.length === 0) return;
    return Array(profiles.length)
      .fill(0)
      .map((i) => React.createRef());
  }, [profiles]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
  if (!loading && profiles.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPets}>
          No more pets to swipe on at the moment!
        </Text>
        <Text style={styles.comeBack}>Come back in a few minutes :)</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {profiles.map((profile, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={profile.user_id}
            onSwipe={(dir) => swiped(dir, profile.user_id)}
          >
            <View style={styles.card}>
              <ImageBackground
                style={styles.cardImage}
                source={{ uri: profile.images[0].url }}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                >
                  <Text style={styles.gender}>{profile.gender_identity}</Text>
                  <View style={styles.country}>
                    <FontAwesomeIcon
                      icon={faMapMarked}
                      size={14}
                      color="white"
                    />
                    <Text style={styles.countryText}>
                      {profile.address_info.country}
                    </Text>
                  </View>
                  <View style={styles.city}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size={14}
                      color="white"
                    />
                    <Text style={styles.cityText}>
                      {profile.address_info.full_name}
                    </Text>
                  </View>
                  <Text style={styles.name}>{profile.pet_name}</Text>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TinderCard>
        ))}
      </View>

      <SwipeButtons swipe={swipe} restoreCard={restoreCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: "90%",
    maxWidth: 330,
    height: 480,
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 330,
    height: 480,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
    resizeMode: "cover",
  },
  name: {
    position: "absolute",
    bottom: 0,
    left: 4,
    margin: 10,
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  city: {
    position: "absolute",
    bottom: 40,
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  cityText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  country: {
    position: "absolute",
    bottom: 70,
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  countryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
  comeBack: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  noPets: {
    fontSize: 16,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  gender: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#000",
  },
});

export default TinderCardComponent;
