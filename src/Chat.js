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
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import Icon_MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { api, setupApi } from "./assets/Interceptor";
import { getStorage } from "./assets/TokenStorage";
import { RefreshControl } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import sampleUserImg from "./assets/image/user-profile-sample.png";

const Chat = ({ navigation }) => {
  const [headerChangeBtn, setHeaderChagebtn] = useState(true);
  const [chatRooms, setChatRooms] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const client = useRef();
  const TextEncodingPolyfill = require("text-encoding");
  Object.assign("global", {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });

  const connectHandler = (items) => {
    if (client.current && client.current.active) {
      console.log("Already connected");
      return;
    }

    const socket = new SockJS("http://localhost:9090/ws/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        items.forEach((room) => {
          stompClient.subscribe(`/sub/${room.roomId}`, () => {
            getChatList(); // 새로운 메시지가 오면 채팅 목록을 갱신
          });
        });
        client.current = stompClient;
      },
      onDisconnect: (fram) => {
        console.log("Disconnected from WebSocket server");
      },
    });

    stompClient.activate();
  };

  const disconnect = () => {
    if (client.current) client.current.deactivate();
  };

  const getProduct = async (roomId) => {
    const url = "/chat/product/" + roomId;

    try {
      const response = await api.get(url);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
    return null;
  };

  const headerChangeBtnToggle = async (chatRoom) => {
    setHeaderChagebtn(!headerChangeBtn);
    const product = await getProduct(chatRoom.roomId);
    navigation.navigate(
      "Chatting",
      {
        roomId: chatRoom.roomId,
        roomName: chatRoom.roomName,
        senderNickName: userInfo.nickName,
        chatRoomStatus: chatRoom.chatRoomStatus,
        product: product,
        profile: chatRoom.profile,
        withdrawalStatus: chatRoom.withdrawalStatus,
      },
      { screen: "Chatting" }
    );
  };

  const getChatList = async () => {
    const url = "/chat/room";
    try {
      const member = await getStorage("userInfo");
      const response = await api.get(url, {
        params: { nickName: member.nickName },
      });
      if (response && response.data) {
        room = response.data.filter((room) => room != null);
        setChatRooms(room);
        setRefreshing(false);
        setUserInfo(member);
        connectHandler(room);
      } else {
        setChatRooms([]);
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setupApi(navigation);
      getChatList();

      return () => {
        disconnect();
      };
    }, [navigation])
  );

  const formatDate = (chatDate) => {
    const date = new Date(chatDate);
    const now = new Date();

    const diffInMilliseconds = now - date;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const diffInYears = now.getFullYear() - date.getFullYear();
    const diffInMonths =
      now.getMonth() + 1 - (date.getMonth() + 1) + diffInYears * 12;
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInYears >= 1) {
      return `${diffInYears}년 전`;
    } else if (diffInMonths >= 1) {
      return `${diffInMonths}달 전`;
    } else if (diffInWeeks >= 1) {
      return `${diffInWeeks}주 전`;
    } else if (diffInDays >= 1) {
      return `${diffInDays}일 전`;
    } else if (diffInHours >= 1) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInMinutes}분 전`;
    }
  };

  const onRefresh = () => {
    getChatList();
  };

  const deleteChatRoom = async (roomId, chatRoomStatus) => {
    const url = "/chat/room/delete/" + roomId;

    try {
      const response = await api.delete(url, {
        params: { chatRoomStatus: chatRoomStatus },
      });
      if (response && response.data) {
        getChatList();
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };
  const renderHiddenItem = (data) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert("채팅방 삭제", "채팅방을 나가시겠습니까?", [
                {
                  text: "취소",
                },
                {
                  text: "확인",
                  onPress: () =>
                    deleteChatRoom(data.item.roomId, data.item.chatRoomStatus),
                },
              ])
            }
          >
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => headerChangeBtnToggle(item)}
          activeOpacity={1}
        >
          <View
            style={[
              styles.content_item,
              item.withdrawalStatus && { backgroundColor: "#d3d3d3" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View>
                <Image
                  source={item.profile ? { uri: item.profile } : sampleUserImg}
                  style={styles.sampleOtherUser}
                />
              </View>
              <View style={{ gap: 7 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      color: "#000",
                    }}
                  >
                    {item.roomName}
                  </Text>
                  {item.withdrawalStatus && <Text>(회원탈퇴)</Text>}
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "rgba(158, 161, 169, 1)",
                  }}
                >
                  {item.message}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              <Icon_MaterialCommunityIcons name="circle" color={"#FEDB37"} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(158, 161, 169, 1)",
                }}
              >
                {formatDate(item.lastChatTime)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEDB37" }}>
      <View style={styles.header}>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 700,
              color: "#000",
              marginLeft: 20,
              marginBottom: 20,
            }}
          >
            채팅
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <SwipeListView
          data={chatRooms}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderHiddenItem={(data) => renderHiddenItem(data)}
          rightOpenValue={-75}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
  },
  content_item: {
    width: "90%",
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#00300",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
  },
  sampleOtherUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  rowBack: {
    width: "88%",
    height: 80,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Chat;
