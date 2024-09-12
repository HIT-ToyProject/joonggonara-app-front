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
} from "react-native";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import Icon_SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { api, setupApi } from "./Interceptor";
import { getStorage } from "./TokenStorage";

const CommunityCreate = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState();
  const [contentInput, setContentInput] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [post, setPost] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    const handleUserInfo = async () => {
      setUserInfo(await getStorage("userInfo"));
    };
    handleUserInfo();
    setupApi();
  }, []);

  useEffect(() => {
    if (route.params) {
      const { communityData, updateStatus } = route.params;

      if (communityData && updateStatus) {
        console.log("community: ", communityData);
        communityData.photos = communityData.photos.map((image) => {
          return {
            uri: `file://${image.filePath}${image.fileName}`,
            fileName: image.fileName,
            type: `image/` + image.fileName.split(".").pop(),
          };
        });

        setPost(communityData);
        setContentInput(communityData.content);
        setSelectedImages(communityData.photos);
        setUpdateStatus(communityData.updateStatus);
      }
    }
  }, [route.params]);

  const submitUpdateCommunity = async () => {
    const checkPhotos = post.photos.some((image, index) => {
      return (
        post.photos.length !== selectedImages.length ||
        image.uri !== selectedImages[index].uri
      );
    });
    if (!checkPhotos && contentInput === post.content) {
      Alert.alert("알림", "수정된 글이 없습니다.!");
      return;
    }
    const url = `/community/update/${post.id}`;
    const formData = new FormData();
    const communityRequest = {
      content: post.content,
    };
    selectedImages.forEach((image) => {
      formData.append("images", {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
    });
    formData.append("communityRequest", {
      string: JSON.stringify(communityRequest),
      type: "application/json",
    });
    try {
      const response = await api.patch(url, formData);

      if (response && response.data) {
        Alert.alert("알림", "게시글이 수정되었습니다.");
        moveCommunity(post);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("에러", error.response.data.message);
    }
  };

  const selectImages = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      selectionLimit: 0, // 0 means no limit
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const newImages = response.assets
          .map((asset) => ({
            uri: asset.uri,
            type: asset.type,
            fileName: asset.fileName,
          }))
          .filter((asset) => {
            return asset.type === "image/jpg" || asset.type === "image/png";
          });
        setSelectedImages([...selectedImages, ...newImages]);
      }
    });
  };

  const removeImage = (uri) => {
    setSelectedImages(selectedImages.filter((image) => image.uri !== uri));
  };

  const handleAddContent = async () => {
    if (!contentInput) {
      Alert.alert("에러", "내용을 입력해 주세요!");
      return;
    }

    const formData = new FormData();
    const communityRequest = {
      content: contentInput,
    };

    selectedImages.forEach((image) => {
      formData.append("images", {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
    });

    formData.append("communityRequest", {
      string: JSON.stringify(communityRequest),
      type: "application/json",
    });

    const url = "/community/create/" + userInfo.id;

    try {
      const response = await api.post(url, formData);
      if (response && response.data) {
        Alert.alert("성공", "게시글이 업로드 되었습니다!", [
          {
            text: "확인",
            onPress: () => moveCommunity(response.data),
          },
        ]);
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const moveCommunity = (data) => {
    navigation.navigate({
      name: "Community",
      params: {
        communityData: data,
      },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerClose}
        >
          <Icon_AntDesign name="close" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>커뮤니티 작성하기</Text>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View style={{ gap: 15, paddingHorizontal: 15, paddingTop: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>
              사진을 올려주세요!
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row", gap: 15 }}>
                <TouchableOpacity
                  onPress={selectImages}
                  style={styles.uploadImgBox}
                >
                  <Icon_SimpleLineIcons name="camera" size={25} />
                </TouchableOpacity>
                {selectedImages.map((image, index) => (
                  <View key={index} style={{ position: "relative" }}>
                    <Image
                      style={styles.uploadImg}
                      source={image}
                      value={selectedImages}
                    />
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: 5,
                      }}
                      onPress={() => removeImage(image.uri)}
                    >
                      <Icon_AntDesign name="close" size={20} color={"#000"} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={{ paddingTop: 20 }}>
              <TextInput
                editable
                style={styles.contentInput}
                value={contentInput}
                onChangeText={setContentInput}
                placeholder="상품에 대해서 설명해 주세요!"
                placeholderTextColor={"#CCC"}
                multiline={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => {
            if (post && updateStatus) {
              submitUpdateCommunity();
            } else {
              handleAddContent();
            }
          }}
        >
          <Text style={styles.footerText}>작성 완료</Text>
        </TouchableOpacity>
      </View>
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
  headerClose: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  headerText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "bold",
  },
  content: {
    flex: 16,
    paddingBottom: 20,
  },
  uploadImgBox: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.25)",
  },
  uploadImg: { width: 120, height: 120, borderRadius: 5 },
  contentInput: {
    height: 250,
    backgroundColor: "rgba(247, 247, 247, 1)",
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    flex: 8,
  },
  footer: {
    flex: 1,
    alignItems: "center",
  },
  footerBtn: {
    backgroundColor: "#FEDB37",
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 1)",
  },
});

export default CommunityCreate;
