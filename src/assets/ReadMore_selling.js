/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Modal,
} from "react-native";
import Icon_EvilIcons from "react-native-vector-icons/EvilIcons";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import sampleImg from "./image/sample.jpg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getStorage } from "./TokenStorage";

import { api, setupApi } from "./Interceptor";

const width = Dimensions.get("window").width;
const ReadMoreSelling = ({ items }) => {
  const [products, setProducts] = useState([]);
  const [menuVisibleId, setMenuVisibleId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setupApi(navigation);
    setProducts(items);
  }, [items]);
  useFocusEffect(
    useCallback(() => {
      setMenuVisibleId(null);
    }, [])
  );

  const checkToken = async () => {
    const token = await getStorage(`accessToken`);
    if (!token) {
      Alert.alert("알림", "로그인 후 이용해주세요!", [
        {
          text: "로그인 창으로 이동",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
      return false;
    } else {
      return true;
    }
  };
  const moveDetailPage = async (item) => {
    const userInfo = await getStorage("userInfo");
    if (await checkToken()) {
      navigation.navigate("Detail", {
        screen: "DetailScreenName",
        data: item,
        nickName: userInfo.nickName,
      });
    }
  };

  const deleteHandle = async (productId) => {
    const url = "/product/delete/" + productId;

    try {
      const response = await api.delete(url);
      if (response && response.data) {
        setProducts(products.filter((product) => product.id !== productId));
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const deleteProduct = (productId) => {
    Alert.alert("게시글 삭제", "게시글을 삭제 하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "삭제",
        onPress: () => {
          deleteHandle(productId);
        },
      },
    ]);
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <View style={styles.content_item}>
          <TouchableOpacity
            style={styles.touchable_content}
            onPress={() => moveDetailPage(item)}
          >
            <View>
              <Image
                style={styles.content_img}
                source={{
                  uri: `${item.photos[0].filePath}${item.photos[0].fileName}`,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 5,
                  color: "#000",
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon_EvilIcons name="location" size={30} color={"#FEDB37"} />
                <Text
                  style={{
                    fontSize: 13,
                    color: "#9EA1A9",
                  }}
                >
                  {item.school}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginLeft: 5,
                  color: "#000",
                }}
              >
                {item.price}元
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setMenuVisibleId(menuVisibleId === item.id ? null : item.id);
            }}
          >
            <Icon_Entypo name="dots-three-vertical" size={15} />
          </TouchableOpacity>
        </View>
        {menuVisibleId === item.id && (
          <Modal transparent={true} animationType="slide" visible={true}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setMenuVisibleId(null)}
            />
            <View style={styles.modalContainer}>
              <View style={styles.menu}>
                <View style={styles.modalText}>
                  <TouchableOpacity
                    onPress={() => deleteProduct(item.id)}
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, padding: 10 }}>수정</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    onPress={() => deleteProduct(item.id)}
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
        )}
      </View>
    );
  };
  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  content_item: {
    width: "90%",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 6,
    marginRight: 6,
    flexDirection: "row",
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
    justifyContent: "space-between",
  },
  touchable_content: {
    flexDirection: "row",
    gap: 15,
    width: "90%",
  },
  content_img: {
    width: 110,
    height: 110,
    borderRadius: 10,
    objectFit: "cover",
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

export default ReadMoreSelling;
