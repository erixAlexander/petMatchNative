import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
const { io } = require("socket.io-client");
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import ChatConversation from "./ChatConversation";
import Loading from "../../../GlobalComponents/Loading/Loading";

const Chat = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newMssg, setNewMssg] = useState(false);
  const socket = useRef(null);

  const getMatches = async (userId) => {
    try {
      const matchesInfo = await axiosPrivate.get(`/user/matches`, {
        params: { userId },
      });
      setAuth({
        ...auth,
        user: { ...auth.user, user_matches: matchesInfo.data },
      });

      const likedUsersIds = matchesInfo.data.map((match) => match.user_id);
      const response = await axiosPrivate.get(`/users`, {
        params: { userIds: JSON.stringify(likedUsersIds), userId },
      });

      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const newMessage = ({ userId, message, notification }) => {
    const updatedMatches = auth.user.user_matches.map((match) => {
      if (match.user_id === userId) {
        return { ...match, notification: notification };
      } else {
        return match;
      }
    });
    setAuth({ ...auth, user: { ...auth.user, user_matches: updatedMatches } });
    setNewMssg({ message, from_user_id: userId });
  };

  useEffect(() => {
    getMatches(auth.user.user_id);
  }, [selectedMatch]);

  useEffect(() => {
    socket.current = io(process.env.EXPO_PUBLIC_SOCKET);
    socket.current?.emit("addUserToSocketArray", auth.user?.user_id);
    socket.current?.on("newMessage", newMessage);
    return () => {
      socket.current.off("newMessage", newMessage);
    };
  }, []);

  if (loading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!selectedMatch && matches.length > 0 && (
        <>
          <MatchesDisplay
            matches={matches}
            setSelectedMatch={setSelectedMatch}
          />
          <ChatDisplay
            user={auth.user}
            matches={matches}
            setSelectedMatch={setSelectedMatch}
            newMssg={newMssg}
          />
        </>
      )}

      {!selectedMatch && matches.length === 0 && (
        <Text>You don't have any matches yet!</Text>
      )}

      {selectedMatch && (
        <ChatConversation
          userId={auth.user.user_id}
          match={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          userImg={auth.user.images[0].url}
          socket={socket.current}
          newMssg={newMssg}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default Chat;
