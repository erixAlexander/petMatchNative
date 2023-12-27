import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import uuid from "react-native-uuid";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ChatInput = ({ setMessages, userId, matchId, socket }) => {
  const [text, setText] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const sendMessage = async () => {
    const id = uuid.v4();
    const message = {
      timestamp: new Date().toISOString(),
      from_user_id: userId,
      to_user_id: matchId,
      message: text.trim(),
    };
    if (message.message === "") {
      setText("");
      return;
    }

    try {
      setText("");
      const response = await axiosPrivate.post(`/message`, {
        message,
      });

      if (response.status == 200) {
        await axiosPrivate.put(`/write-message`, {
          myUserId: userId,
          clickedUserId: matchId,
        });
        setMessages((prev) => [...prev, { ...message, _id: id }]);
        socket?.emit("sendMessage", {
          userId: userId,
          receiverId: matchId,
          message: message.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.chatInput}>
      <TextInput
        multiline={true}
        numberOfLines={3}
        onChangeText={(text) => setText(text)}
        value={text}
        style={styles.textArea}
      />
      <TouchableOpacity onPress={() => sendMessage()} style={styles.btn}>
        <Text style={styles.btnText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    width: "76%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderColor: "#fe3072",
    borderWidth: 1,
  },
  btn: {
    width: "20%",
    height: "100%",
    backgroundColor: "#fe3072",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  chatInput: {
    width: "100%",
    height: "12%",
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default ChatInput;
