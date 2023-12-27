import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChatDisplay = ({ setSelectedMatch, matches, user, newMssg }) => {
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);

  const getLastMessage = async (userId, match) => {
    try {
      const response = await axiosPrivate.get(`/messages/native`, {
        params: {
          userId: userId,
          correspondingUserId: match.user_id,
        },
      });

      return { match, messageInformation: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLastMessages = async () => {
      try {
        const promises = matches.map((match) =>
          getLastMessage(user.user_id, match)
        );
        const results = await Promise.all(promises);
        const orderedMessages = results.sort((a, b) => {
          const dateA = new Date(a.messageInformation.timestamp);
          const dateB = new Date(b.messageInformation.timestamp);
          return dateB - dateA;
        });
        setMessages(orderedMessages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastMessages();
  }, [matches, user.user_id]);

  useEffect(() => {
    if (newMssg) {
      setMessages((prev) => {
        const updatedMessages = prev.map((message) => {
          if (message.match.user_id === newMssg.from_user_id) {
            return {
              ...message,
              messageInformation: {
                ...newMssg,
                timestamp: new Date().toISOString(),
              },
            };
          } else {
            return message;
          }
        });
        return updatedMessages.sort((a, b) => {
          const dateA = new Date(a.messageInformation.timestamp);
          const dateB = new Date(b.messageInformation.timestamp);
          return dateB - dateA;
        });
      });
    }
  }, [newMssg]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Messages</Text>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
      >
        {messages.map(({ match, messageInformation }) => (
          <TouchableOpacity
            onPress={() => setSelectedMatch(match)}
            style={styles.card}
            key={match.user_id}
          >
            <View>
              <Image
                source={{ uri: match.images[0].url }}
                style={styles.img}
                resizeMode="cover"
              />
              <Text style={styles.name}>{match.pet_name}</Text>
            </View>
            <Text style={styles.message}>{messageInformation.message}</Text>

            {user?.user_matches.find((user) => user.user_id === match.user_id)
              .notification && (
              <FontAwesomeIcon icon={faCircle} size={14} color="green" />
            )}

            <Text
              style={
                messageInformation.from_user_id === match.user_id
                  ? { color: "green" }
                  : { color: "red" }
              }
            >
              {messageInformation.from_user_id === match.user_id ? "In" : "Out"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    backgroundColor: "#F8F8F8",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    paddingHorizontal: 15,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: -15,
  },
  message: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
  },
});

export default ChatDisplay;
