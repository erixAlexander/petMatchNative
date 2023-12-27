import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ChatInput from "./ChatInput";

const ChatConversation = ({
  userId,
  match,
  setSelectedMatch,
  userImg,
  socket,
  newMssg,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  const getAllMessages = async (userId, match) => {
    const sentMessages = await axiosPrivate.get(`/messages`, {
      params: {
        fromUserId: userId,
        toUserId: match.user_id,
      },
    });

    const receivedMessages = await axiosPrivate.get(`/messages`, {
      params: {
        fromUserId: match.user_id,
        toUserId: userId,
      },
    });

    setMessages(
      [...sentMessages.data, ...receivedMessages.data].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateA - dateB;
      })
    );
  };

  const readMessage = async (match_id, userId) => {
    try {
      await axiosPrivate.put(`/read-message`, {
        match_id,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages(userId, match);
    readMessage(match.user_id, userId);
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, newMssg]);

  useEffect(() => {
    if (newMssg.from_user_id === match.user_id) {
      const id = uuid.v4();
      setMessages([...messages, { ...newMssg, _id: id }]);
    }
  }, [newMssg]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => setSelectedMatch(null)}
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{match.pet_name}</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
      >
        <View style={styles.chatView}>
          {messages.map((message) => {
            return (
              <View
                key={message._id}
                style={
                  message.from_user_id === userId
                    ? styles.userMessage
                    : styles.matchMessage
                }
              >
                {message.from_user_id === userId ? (
                  <>
                    <Text style={styles.userBubble}>{message.message}</Text>
                    <Image source={{ uri: userImg }} style={styles.img} />
                  </>
                ) : (
                  <>
                    <Image
                      source={{ uri: match.images[0].url }}
                      style={styles.img}
                    />
                    <Text style={styles.matchBubble}>{message.message}</Text>
                  </>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <ChatInput
        setMessages={setMessages}
        userId={userId}
        matchId={match.user_id}
        socket={socket}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    padding: 5,
  },
  chatView: {
    width: "100%",
    flex: 1,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  userBubble: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    color: "white",
    flex: 1,
    marginRight: 10,
    maxWidth: "75%",
  },
  matchMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  matchBubble: {
    backgroundColor: "#fe3072",
    padding: 10,
    borderRadius: 10,
    color: "white",
    flex: 1,
    marginLeft: 10,
    maxWidth: "75%",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  goBackBtn: {
    position: "absolute",
    left: 10,
  },
  header: {
    width: "100%",
    height: 40,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ChatConversation;
