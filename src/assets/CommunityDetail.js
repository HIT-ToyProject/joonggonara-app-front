/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import Icon_Feather from "react-native-vector-icons/FontAwesome";
import Icon_MaterialIcons from "react-native-vector-icons/MaterialIcons";
import sampleUserImg from "./image/user-profile-sample.png";
import Swiper from "react-native-web-swiper";
import { api, setupApi } from "./Interceptor";
import { getStorage } from "./TokenStorage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const width = Dimensions.get("window").width;
const CommunityDetail = ({ route, navigation }) => {
  const post = route.params.data;
  const [thumbs, setThumbs] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [comments, setComments] = useState([]);
  const [childCommentInput, setChildCommentInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteComment, setDeleteComment] = useState("");
  const [isCommunitySetting, setCommunitySetting] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getStorage("userInfo");
      setUserInfo(user);
    };

    const getComments = async () => {
      const url = `/community/comment/all/${post.id}`;
      try {
        const response = await api.get(url);
        if (response && response.data) {
          setComments(response.data);
        }
      } catch (error) {
        Alert.alert("에러", error.response.data.message);
      }
    };
    getUserInfo();
    getComments();
    setupApi(navigation);
  }, []);

  useEffect(() => {
    if (userInfo.id && post.id) {
      const checkLike = async () => {
        const url = `/community/like/exist/${userInfo.id}/${post.id}`;
        try {
          const response = await api.get(url);
          setIsLike(response.data);
        } catch (error) {
          Alert.alert("에러", error.response.data.message);
        }
      };

      checkLike(); // userInfo와 post.id가 설정된 후에 호출
    }
  }, [userInfo, post]); // userInfo와 post가 변경될 때마다 실행

  const likeThumbsToggle = async () => {
    try {
      let response = "";
      if (!isLike) {
        const url = `/community/like/increase/${userInfo.id}/${post.id}`;
        response = await api.put(url);
      } else {
        const url = `/community/like/decrease/${userInfo.id}/${post.id}`;
        response = await api.put(url);
      }
      if (response && response.data) {
        setIsLike(!isLike);
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const commentToggle = () => {
    setIsComment(!isComment);
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = now - postDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  };

  const submitComment = async (commentId = null) => {
    if (commentId == null && !commentInput) {
      return;
    }

    if (commentId != null && !childCommentInput) {
      return;
    }
    const url = `/community/comment/create/${post.id}/${userInfo.id}`;
    const commentRequest = {
      commentId: commentId || null,
      content: commentId ? childCommentInput : commentInput,
    };

    try {
      const response = await api.post(url, commentRequest);
      if (response && response.data) {
        if (commentId != null) {
          setComments((prevComments) => {
            return prevComments.map((comment) => {
              if (comment.id === response.data.id) {
                // 기존 댓글의 다른 필드는 유지하고 childComments만 업데이트
                return {
                  ...comment, // 기존 댓글의 다른 속성들을 복사
                  childComments: response.data.childComments, // childComments만 업데이트
                  parentId: response.data.parentId,
                };
              }
              // id가 일치하지 않으면 기존 comment를 그대로 반환
              return comment;
            });
          });
        } else {
          setComments((prevComments) => [response.data, ...prevComments]);
        }

        setIsComment(true);
        setCommentInput("");
        setChildCommentInput("");
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const submitDeleteComment = async (commentId) => {
    if (commentId === null) {
      return;
    }
    Alert.alert("삭제", "댓글을 삭제 하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "삭제",
        onPress: async () => {
          const url = `/community/comment/delete/${commentId}`;

          try {
            const response = await api.delete(url);
            if (response && response.data) {
              setDeleteComment("");
              setIsModalVisible(false);
              setComments((prevComments) => {
                return prevComments.map((comment) => {
                  if (commentId === response.data.id) {
                    // 기존 댓글의 다른 필드는 유지하고 childComments만 업데이트
                    return {
                      ...comment, // 기존 댓글의 다른 속성들을 복사
                      isDeleted: response.data.isDeleted, // childComments만 업데이트
                      content: response.data.content,
                    };
                  }
                  // id가 일치하지 않으면 기존 comment를 그대로 반환
                  return comment;
                });
              });
            }
          } catch (error) {
            Alert.alert("에러", error.response.data.message);
          }
        },
      },
    ]);
  };
  const moveUpdateCommunity = async () => {
    setIsModalVisible(false);
    navigation.navigate("CommunityCreate", {
      communityData: post,
      updateStatus: true,
    });
  };

  const submitDeleteCommunity = async () => {
    const url = `/community/delete/${post.id}`;

    try {
      const response = await api.delete(url);

      if (response && response.data) {
        Alert.alert("삭제", "삭제 되었습니다.");
        navigation.navigate("Community");
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}
        >
          <Icon_AntDesign name="left" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View style={{ paddingBottom: 30 }}>
            <View style={styles.contentLocation}>
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingVertical: 5,
                  }}
                >
                  <Image
                    style={styles.userImg}
                    source={
                      post.profile ? { uri: post.profile } : sampleUserImg
                    }
                  />
                  <View style={{ gap: 5 }}>
                    <Text
                      style={{ fontSize: 15, fontWeight: 700, color: "#000" }}
                    >
                      {post.nickName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "rgba(158, 161, 169, 1)",
                      }}
                    >
                      {getRelativeTime(post.createdDate)}
                    </Text>
                  </View>
                </View>
                {post.nickName === userInfo.nickName && (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(true);
                        setCommunitySetting(true);
                        setDeleteComment();
                      }}
                    >
                      <Icon name="dots-vertical" size={20}></Icon>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={{ gap: 20 }}>
              <View style={styles.contentLocation}>
                <View
                  style={{
                    width: "90%",
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ color: "#000", fontSize: 16 }}>
                    {post.content}
                  </Text>
                </View>
              </View>
              <View style={styles.contentLocation}>
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    shadowColor: "#00300",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  {post.photos.length > 0 ? (
                    <Swiper
                      containerStyle={{ height: 350 }}
                      loop={false}
                      showsButtons={false}
                    >
                      {post.photos.map((photo, index) => (
                        <View key={index} style={{ flex: 1 }}>
                          <Image
                            source={{ uri: photo.filePath + photo.fileName }}
                            style={styles.BuyingImg}
                          />
                        </View>
                      ))}
                    </Swiper>
                  ) : null}
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      borderWidth: 1,
                      borderColor: "#DADADA",
                      width: 90,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 7,
                      borderRadius: 20,
                    }}
                    onPress={likeThumbsToggle}
                  >
                    <Icon_Feather
                      name={isLike ? "thumbs-up" : "thumbs-o-up"}
                      size={18}
                      color={"rgba(158, 161, 169, 1)"}
                    />
                    <Text
                      style={{
                        color: "rgba(158, 161, 169, 1)",
                        fontSize: 16,
                      }}
                    >
                      좋아요
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      borderWidth: 1,
                      borderColor: "#DADADA",
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 7,
                      borderRadius: 20,
                    }}
                    onPress={commentToggle}
                  >
                    <Icon_Ionicons
                      name={
                        isComment
                          ? "chatbubble-ellipses-sharp"
                          : "chatbubble-ellipses-outline"
                      }
                      size={18}
                      color={"rgba(158, 161, 169, 1)"}
                    />
                    <Text
                      style={{
                        color: "rgba(158, 161, 169, 1)",
                        fontSize: 16,
                      }}
                    >
                      답글쓰기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              {comments != null
                ? comments.map((comment, index) =>
                    comment.parentId === null ? (
                      <View key={index} style={styles.commentContainer}>
                        <View style={styles.commentContent}>
                          <Image
                            style={styles.userImg}
                            source={
                              comment.profile
                                ? { uri: comment.profile }
                                : sampleUserImg
                            }
                          />

                          <View style={{ gap: 5, paddingTop: 5, width: "90%" }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#000",
                              }}
                            >
                              {comment.nickName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "rgba(158, 161, 169, 1)",
                              }}
                            >
                              {getRelativeTime(comment.createdDate)}
                            </Text>
                            <Text style={{ fontSize: 16, color: "#000" }}>
                              {comment.content}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                                paddingTop: 5,
                              }}
                            >
                              <TouchableOpacity
                                style={{ flexDirection: "row", gap: 5 }}
                                onPress={() => setReplyingCommentId(comment.id)}
                              >
                                <Icon_Ionicons
                                  name={
                                    isComment
                                      ? "chatbubble-ellipses-sharp"
                                      : "chatbubble-ellipses-outline"
                                  }
                                  size={14}
                                  color={"rgba(158, 161, 169, 1)"}
                                />
                                <Text
                                  style={{
                                    color: "rgba(158, 161, 169, 1)",
                                  }}
                                >
                                  답글쓰기
                                </Text>
                              </TouchableOpacity>
                            </View>

                            {comment.childComments != null && !comment.isDeleted
                              ? comment.childComments.map((child, index) => (
                                  <View
                                    key={index.toString()}
                                    style={{
                                      flexDirection: "row",
                                      backgroundColor: "#FEFFD2",
                                      width: "90%",
                                      padding: 10,
                                      borderRadius: 10,
                                      marginTop: 10,
                                      gap: 5,
                                    }}
                                  >
                                    <Icon_MaterialIcons
                                      name="subdirectory-arrow-right"
                                      size={20}
                                      color={"#FEDB37"}
                                    />

                                    <View
                                      style={{ gap: 7, paddingVertical: 5 }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          fontWeight: 500,
                                          color: "#000",
                                        }}
                                      >
                                        {child.nickName}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: "rgba(158, 161, 169, 1)",
                                        }}
                                      >
                                        {child.content}
                                      </Text>
                                    </View>
                                  </View>
                                ))
                              : null}

                            {replyingCommentId === comment.id ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  position: "relative",
                                  paddingTop: 5,
                                  marginTop: 5,
                                }}
                              >
                                <TextInput
                                  editable
                                  style={styles.input}
                                  value={childCommentInput}
                                  onChangeText={setChildCommentInput}
                                  placeholder="댓글 작성"
                                  placeholderTextColor={"#ccc"}
                                />
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#FEDB37",
                                    borderRadius: 15,
                                    width: 60,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "absolute",
                                    top: 5,
                                    right: 0,
                                    paddingVertical: 11,
                                  }}
                                  onPress={() => {
                                    submitComment(comment.id); // 답글 등록 시 댓글 ID를 넘겨줌
                                    setReplyingCommentId(null); // 답글을 등록한 후에는 인풋 필드를 숨김
                                  }}
                                >
                                  <Text style={{ fontSize: 16, color: "#fff" }}>
                                    등록
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            ) : null}
                          </View>
                        </View>
                        <View>
                          {comment.nickName === userInfo.nickName &&
                          !comment.isDeleted ? (
                            <TouchableOpacity
                              onPress={() => {
                                setIsModalVisible(true);
                                setDeleteComment(comment.id);
                              }}
                            >
                              <Icon name="dots-vertical" size={20}></Icon>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    ) : null
                  )
                : null}
            </View>
          </View>
        </ScrollView>
        {isComment ? (
          <View style={styles.footer}>
            <TextInput
              editable
              style={styles.footerInput}
              value={commentInput}
              onChangeText={setCommentInput}
              placeholder="댓글 작성"
              placeholderTextColor={"#ccc"}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#FEDB37",
                borderRadius: 15,
                width: 65,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => submitComment()}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>등록</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <Modal transparent={true} animationType="slide" visible={isModalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setCommunitySetting(false);
            setIsModalVisible(false);
          }}
        />
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <View style={styles.modalText}>
              {isCommunitySetting && (
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => moveUpdateCommunity()}
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, padding: 10 }}>수정</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (isCommunitySetting) {
                    Alert.alert("삭제", "정말로 삭제 하시겠습니까?", [
                      {
                        text: "취소",
                      },
                      {
                        text: "삭제",
                        onPress: submitDeleteCommunity,
                      },
                    ]);
                  } else {
                    submitDeleteComment();
                  }
                }}
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, padding: 10 }}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeft: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  title: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "bold",
  },
  content: {
    flex: 16,
  },
  contentLocation: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentWidth: {
    width: "90%",
  },
  BuyingImg: { width: "100%", height: 350, borderRadius: 20 },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#FEDB37",
    borderRadius: 15,
    width: "72%",
    paddingVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#DADADA",
    paddingTop: 30,
  },
  footerInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#FEDB37",
    borderRadius: 15,
    width: "70%",
    height: 45,
    paddingVertical: 10,
    marginRight: 10,
  },
  commentContainer: {
    width: "90%",
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#DADADA",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  commentContent: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
  },
  modalContainer: {
    width: width,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
    elevation: 5,
    gap: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 40,
  },
  menu: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000024",
  },
  modalText: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 0.2,
    width: "90%",
    backgroundColor: "#D9D9D9",
    marginHorizontal: 10,
  },
});

export default CommunityDetail;
