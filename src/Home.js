/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import Icon_FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import category1 from "./assets/image/category/sharing.png";
import category2 from "./assets/image/category/clothing.png";
import category3 from "./assets/image/category/book.png";
import category4 from "./assets/image/category/dailiySupplies.png";
import category5 from "./assets/image/category/cosmetics.png";
import category6 from "./assets/image/category/electronicDevices.png";
import category7 from "./assets/image/category/other.png";
import { getStorage } from "./assets/TokenStorage";
import { api } from "./assets/Interceptor";
import sampleImg from "./assets/image/sample.jpg";
import Icon_EvilIcons from "react-native-vector-icons/EvilIcons";
import { useFocusEffect } from "@react-navigation/native";

const locationData = [
  { title: "哈尔滨工业大学" },
  { title: "黑龙江大学" },
  { title: "哈尔滨工程大学" },
];

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [categoryType, setCategoryType] = useState("ALL");
  const [schoolType, setSchoolType] = useState("ALL");
  const [heart, setHeart] = useState({});
  const [currentStyle, setCurrentStyle] = useState(columStyle);

  const fetchScreens = async () => {
    const url = "http://localhost:9090/board/search";
    const params = {
      category: categoryType,
      school: schoolType,
      size: 5,
      page: 0,
    };
    try {
      const { data } = await api.get(url, { params });
      setScreenData(data.content);
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchScreens();
    }, [categoryType, schoolType])
  );

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const [toggle, setToggle] = useState(true);
  const handleToggleChange = () => {
    setToggle(!toggle);
    if (!toggle) {
      setCurrentStyle(columStyle);
    } else {
      setCurrentStyle(rowStyle);
    }
  };

  const ChangeBtnSearch = () => {
    navigation.navigate("HomeSearch", { screen: "HomeSearchScreenName" });
  };

  const checkToken = async () => {
    const token = await getStorage("token");
    if (!token) {
      Alert.alert("알림", "로그인 후 이용해주세요!", [
        {
          text: "로그인 창으로 이동",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } else {
      navigation.navigate("HomeCreate", {
        onPostCreated: handlePostCreated,
      });
    }
  };
  const heartToggle = (id) => {
    setHeart((prevHeart) => ({
      ...prevHeart,
      [id]: !prevHeart[id],
    }));
  };
  const ChangeBtnDetail = async () => {
    const token = await getStorage("token");
    navigation.navigate("Detail", { screen: "DetailScreenName" });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View>
          <SelectDropdown
            data={locationData}
            onSelect={(selectedItem) => {
              setSchoolType(selectedItem.title);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      "학교를 선택해주세요."}
                  </Text>
                  <Icon_AntDesign
                    name={isOpened ? "up" : "down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 10,
          }}
        >
          <TouchableOpacity onPress={ChangeBtnSearch}>
            <Icon_AntDesign
              name="search1"
              size={25}
              style={{
                width: 25,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chageView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={() => setCategoryType("나눔")}>
              <Image style={styles.categoryImg} source={category1} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategoryType("의류")}>
              <Image style={styles.categoryImg} source={category2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategoryType("도서")}>
              <Image style={styles.categoryImg} source={category3} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategoryType("생활용품")}>
              <Image style={styles.categoryImg} source={category4} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategoryType("화장품")}>
              <Image style={styles.categoryImg} source={category5} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategoryType("전자기기")}>
              <Image style={styles.categoryImg} source={category6} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategoryType("기타")}>
              <Image style={styles.categoryImg} source={category7} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={handleToggleChange}>
          {toggle ? (
            <Icon_FontAwesome name="th-large" size={25} />
          ) : (
            <Icon_FontAwesome name="th-list" size={25} />
          )}
        </TouchableOpacity>
      </View>
      <View style={currentStyle.content}>
        <ScrollView>
          <View style={currentStyle.view}>
            {screenData.length > 0 ? (
              screenData.map((item) => (
                <View key={item.id} style={currentStyle.content_item}>
                  <TouchableOpacity
                    style={currentStyle.touchableOpacityStyle}
                    onPress={ChangeBtnDetail}
                  >
                    <View>
                      <Image
                        style={currentStyle.content_img}
                        source={{
                          uri:
                            item.photos[0].filePath + item.photos[0].fileName ||
                            sampleImg,
                        }}
                      />
                      <TouchableOpacity onPress={() => heartToggle(item.id)}>
                        {!heart[item.id] ? (
                          <Icon_AntDesign
                            name="hearto"
                            color={"#FEDB37"}
                            size={25}
                            style={{
                              position: "absolute",
                              bottom: 4,
                              right: 4,
                            }}
                          />
                        ) : (
                          <Icon_AntDesign
                            name="heart"
                            color={"#FEDB37"}
                            size={25}
                            style={currentStyle.heartIcon}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
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
                      <View style={currentStyle.locationView}>
                        <Icon_EvilIcons
                          name="location"
                          size={30}
                          color={"#FEDB37"}
                        />
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#9EA1A9",
                          }}
                        >
                          {item.location}
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
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    justifyContent: "center", // 박스 내 텍스트 수직 중앙 정렬
                    alignItems: "center",
                  }}
                >
                  No items to display
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#FEDB37",
            borderRadius: 50,
          }}
          onPress={() => {
            checkToken();
          }}
        >
          <Icon_Entypo name="plus" color={"white"} size={50} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const columStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 13,
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
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
  },
  content_img: {
    width: 110,
    height: 110,
    borderRadius: 10,
    objectFit: "cover",
  },
  touchableOpacityStyle: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  locationView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },
});

const rowStyle = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  content: {
    flex: 13,
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  content_item: {
    padding: 10,
    gap: 10,
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
  content_img: {
    width: 170,
    height: 210,
    borderRadius: 10,
    objectFit: "cover",
    marginBottom: 10,
  },
  heartIcon: {
    position: "absolute",
    bottom: 14,
    right: 4,
  },
});

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    zIndex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  chageView: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    gap: 20,
  },
  categoryImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  dropdownButtonStyle: {
    width: 190,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  touchableOpacityStyle: {
    gap: 10,
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Home;
