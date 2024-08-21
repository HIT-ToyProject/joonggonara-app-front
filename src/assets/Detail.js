/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import sampleImg from "./image/sample.jpg";
import sampleImg2 from "./image/sample2.jpg";
import Swiper from "react-native-web-swiper";

const Detail = ({ route, navigation }) => {
  const data = route.params.data;

  const [heart, setHeart] = useState(false);
  const heartToggle = () => {
    setHeart(!heart);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);

    const diffInMinutes = Math.floor((now - time) / (1000 * 60)); // 분 차이
    const diffInHours = Math.floor(diffInMinutes / 60); // 시간 차이
    const diffInDays = Math.floor(diffInHours / 24); // 일 차이
    const diffInMonths = Math.floor(diffInDays / 30); // 대략적인 월 차이
    const diffInYears = Math.floor(diffInMonths / 12); // 년 차이

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 30) {
      return time.toLocaleDateString("ko-KR"); // 날짜 표시
    } else if (diffInMonths < 12) {
      return `${diffInMonths}개월 전`;
    } else {
      return `${diffInYears}년 전`;
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
          <View style={{ gap: 30 }}>
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
                <Swiper
                  containerStyle={{ height: 350 }}
                  loop={false}
                  showsButtons={false}
                >
                  {data.photos.map((photo, index) => (
                    <View key={index} style={{ flex: 1 }}>
                      <Image
                        source={{ uri: photo.filePath + photo.fileName }}
                        style={styles.BuyingImg}
                      />
                    </View>
                  ))}
                </Swiper>
              </View>
            </View>
            <View
              style={{ justifyContent: "center", alignItems: "center", gap: 5 }}
            >
              <View style={styles.title}>
                <Text style={styles.titleText}>{data.title}</Text>
                <Text style={styles.titleText}>{data.price}元</Text>
              </View>
              <View style={styles.contentWidth}>
                <Text style={{ fontSize: 12, color: "rgba(158, 161, 169, 1)" }}>
                  {formatTimestamp(data.createdDate)}
                </Text>
              </View>
            </View>
            <View style={styles.contentLocation}>
              <View style={{ width: "90%", gap: 5 }}>
                <Text style={{ fontSize: 15, color: "#000" }}>
                  {data.content}
                </Text>
              </View>
            </View>
            <View style={styles.contentLocation}>
              <View style={{ width: "90%", gap: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: 700 }}>거래 장소</Text>
                <View
                  style={{
                    backgroundColor: "rgba(248, 248, 248, 1)",
                    borderRadius: 10,
                    padding: 10,
                    paddingLeft: 15,
                  }}
                >
                  <Text>{data.school}</Text>
                </View>
              </View>
            </View>
            <View style={styles.contentLocation}>
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 1,
                  borderColor: "rgba(217, 217, 217, 1)",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Image
                  style={styles.userImg}
                  source={data.memberResponse.profile || sampleImg2}
                />
                <View style={{ gap: 5 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: 700, color: "#000" }}
                  >
                    {data.memberResponse.nickName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(158, 161, 169, 1)",
                    }}
                  >
                    {data.memberResponse.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View>
          <TouchableOpacity onPressOut={heartToggle}>
            {heart ? (
              <Icon_AntDesign name="heart" color={"#FEDB37"} size={30} />
            ) : (
              <Icon_AntDesign name="hearto" color={"#FEDB37"} size={30} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ width: "75%" }}>
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerText}>문의하기</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 10,
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  footer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#9EA1A9",
  },
  footerBtn: {
    backgroundColor: "#FEDB37",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 1)",
  },
});

export default Detail;
