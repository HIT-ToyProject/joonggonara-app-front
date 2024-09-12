/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import Icon_Feather from "react-native-vector-icons/Feather";
import Icon_FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import { api, setupApi } from "./Interceptor";
import { FlatList } from "react-native-gesture-handler";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import sampleUserImg from "./image/user-profile-sample.png";
const width = Dimensions.get("window").width;
const Chatting = ({ route, navigation }) => {
  const [chatInput, setChatInput] = useState("");
  const data = route.params;
  const [chatData, setChatData] = useState([]);
  const chatClient = useRef();
  const productClient = useRef();
  const flatListRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [doneDeal, setDoneDeal] = useState("");

  const TextEncodingPolyfill = require("text-encoding");
  Object.assign("global", {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });
  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const getChats = async () => {
    const url = "/chat/all/" + data.roomId;

    try {
      const response = await api.get(url);
      setChatData(response.data);
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const checkIsFirstMessage = () => {
    if (chatData.length < 1) return true;
    const chatDate = new Date(chatData[chatData.length - 1].createdMessageDate);
    const now = new Date();
    if (chatDate.getDate() !== now.getDate()) {
      return true;
    }
    return false;
  };

  const sendChatMessage = async () => {
    if (chatClient.current && chatInput.trim()) {
      const chatRequest = {
        message: chatInput,
        createdMessageDate: new Date().toISOString(),
        senderNickName: data.senderNickName,
        chatRoomStatus: data.chatRoomStatus,
        isFirstMessage: checkIsFirstMessage(),
      };
      chatClient.current?.publish({
        destination: "/pub/chat/" + data.roomId,
        body: JSON.stringify(chatRequest),
      });
    }

    setChatInput("");
  };

  const connectChatHandler = () => {
    const socket = new SockJS("http://localhost:9090/ws/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        stompClient.subscribe("/sub/" + data.roomId, (msg) => {
          const chats = JSON.parse(msg.body);
          setChatData((prevMessages) => [...prevMessages, chats.body]);
        });

        chatClient.current = stompClient;
      },
      onDisconnect: (fram) => {
        console.log("Disconnected from WebSocket server");
      },
    });

    stompClient.activate();
  };

  const connectProductHandler = () => {
    const socket = new SockJS("http://localhost:9090/ws/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        stompClient.subscribe("/sub/product/" + data.product.id, (msg) => {
          const response = JSON.parse(msg.body);

          if (response && response.body) {
            setDoneDeal(doneDealStyle());
          }
        });

        productClient.current = stompClient;
      },
      onDisconnect: (fram) => {
        console.log("Disconnected from WebSocket server");
      },
    });

    stompClient.activate();
  };

  const disconnect = () => {
    if (chatClient.current && chatClient.current.connected) {
      chatClient.current.deactivate();
    }
    if (productClient.current && productClient.current.connected) {
      productClient.current.deactivate();
    }
  };
  const doneDealStyle = () => {
    return (
      <View style={styles.doneDealContainer}>
        <View style={styles.doneDealView}>
          <Image
            source={{
              uri: `${data.product.photos[0].filePath}${data.product.photos[0].fileName}`,
            }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <View style={{ justifyContent: "center", gap: 5 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: "#F0F0F0",
                  shadowColor: "#003",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}
              >
                <Text>거래완료</Text>
              </View>
              <Text>{data.product.title}</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text>{data.product.price}元</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    connectChatHandler();
    setupApi(navigation);
    getChats();
    scrollToEnd();
    connectProductHandler();
    if (data.product.isSoldOut) {
      setDoneDeal(doneDealStyle());
    }
    return () => {
      disconnect();
    };
  }, []);

  const formatDate = (chatDate) => {
    const date = new Date(chatDate);
    const now = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (year === now.getFullYear()) {
      return `${month}월 ${day}일`;
    } else {
      return `${year}년 ${month}월 ${day}일`;
    }
  };

  const getCurrentTime = (chatDate) => {
    const date = new Date(chatDate);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const changeProductStatus = async () => {
    Alert.alert("거래 완료", "거래 완료 하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "확인",
        onPress: () => {
          productClient.current?.publish({
            destination: "/pub/product/" + data.product.id,
          });
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingBottom: 15 }}>
        {item.isFirstMessage ? (
          <View style={styles.date}>
            <Text style={styles.dateText}>
              {formatDate(item.createdMessageDate)}
            </Text>
          </View>
        ) : null}
        <View
          style={
            item.senderNickName === data.senderNickName
              ? styles.myChat
              : styles.otherChat
          }
        >
          {item.senderNickName === data.senderNickName ? null : (
            <Image
              source={data.profile ? { uri: data.profile } : sampleUserImg}
              style={styles.sampleOtherUser}
            />
          )}
          <View
            style={
              item.senderNickName === data.senderNickName
                ? styles.myChatText
                : styles.otherChatText
            }
          >
            <Text>{item.message}</Text>
          </View>
          <Text style={styles.timeText}>
            {getCurrentTime(item.createdMessageDate)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEDB37" }}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon_AntDesign name="left" size={30} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 700,
                color: "#000",
              }}
            >
              {data.roomName}
            </Text>
            {data.withdrawalStatus && (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                (회원탈퇴)
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() =>
              data.chatRoomStatus === "SELLER"
                ? setMenuVisible(!menuVisible)
                : setMenuVisible(false)
            }
          >
            <Icon_Entypo
              name="dots-three-vertical"
              size={20}
              style={{ opacity: data.chatRoomStatus === "SELLER" ? 1 : 0 }}
            />
          </TouchableOpacity>
          <Modal transparent={true} animationType="fade" visible={menuVisible}>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "#00000024",
              }}
              onPress={() => setMenuVisible(false)}
            />
            <View style={styles.modalContainer}>
              <View style={styles.menu}>
                <TouchableOpacity onPress={changeProductStatus}>
                  <Text>거래 완료</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.content}>
        {doneDeal && doneDeal}
        <FlatList
          ref={flatListRef}
          data={chatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.footer}>
          <TouchableOpacity>
            <Icon_Feather name="plus" size={30} />
          </TouchableOpacity>
          <TextInput
            editable
            style={styles.input}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder="메세지 보내기"
            placeholderTextColor={"#CCC"}
          />
          <TouchableOpacity onPress={sendChatMessage}>
            <Icon_FontAwesome name="send" size={25} color={"#FEDB37"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1.5,
    justifyContent: "flex-end",
  },
  content: {
    flex: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#003",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
    elevation: 5,
  },
  date: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  dateText: {
    color: "rgba(158, 161, 169, 1)",
    fontSize: 14,
    fontWeight: 400,
  },
  otherChat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  myChat: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    paddingRight: 10,
  },
  otherChatText: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    padding: 10,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  myChatText: {
    backgroundColor: "rgba(254, 219, 55, 1)",
    padding: 10,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    borderTopRightRadius: 0,
  },
  timeText: {
    fontSize: 10,
    color: "rgba(158, 161, 169, 1)",
    paddingTop: 15,
  },
  sampleOtherUser: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  input: {
    width: 300,
    height: 45,
    borderRadius: 40,
    backgroundColor: "rgba(245, 245, 245, 1)",
    fontSize: 15,
    paddingLeft: 15,
  },
  footer: {
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 15,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(158, 161, 169, 1)",
  },
  modalContainer: {
    position: "absolute",
    right: 15,
    top: 90,
  },
  menu: {
    width: width * 0.3, // 화면 너비의 50%
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
    elevation: 5,
  },
  doneDealContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  doneDealView: {
    width: "90%",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#00300",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Chatting;
