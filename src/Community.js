/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import Icon_Feather from "react-native-vector-icons/Feather";
import sampleUserImg from "./assets/image/user-profile-sample.png";
import { api, setupApi } from "./assets/Interceptor";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const Community = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [page, setPage] = useState(0);
  const isFocused = useIsFocused();
  setupApi(navigation);
  useEffect(() => {
    if (!isSearched) {
      getAllCommunities();
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.params) {
      const { searchData, communityData, updateStatus } = route.params;
      // searchData와 keyword가 있으면 posts를 설정

      if (communityData && !isSearched) {
        setPosts([communityData, ...posts]);
      }

      if (searchData && isSearched) {
        setPosts(searchData);
      }
    }
  }, [route.params]);
  const getAllCommunities = async (newPage = 0) => {
    const url = "/community/all";
    const pageable = {
      page: newPage,
      size: 10,
    };
    try {
      const response = await api.get(url, pageable);
      if (response && response.data) {
        setPosts(response.data.content);
        setPage(newPage);
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const ChangeBtnSearch = () => {
    setIsSearched(true);
    navigation.navigate("HomeSearch", {
      searchType: "communitySearch",
      goBackPage: "Community",
    });
  };

  const ChangeBtnDetail = (item) => {
    navigation.navigate("CommunityDetail", {
      screen: "CommunityDetailScreenName",
      data: item,
    });
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
  const onRefresh = () => {
    setIsLoading(true);
    setIsSearched(false);
    getAllCommunities();
  };

  const onLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setIsSearched(false);
      getAllCommunities(page + 1);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => ChangeBtnDetail(item)}
        style={{ width: "100%" }}
      >
        <View style={styles.content_item}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={item.profile ? { uri: item.profile } : sampleUserImg}
              style={styles.sampleUserImg}
            />
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#000" }}>
                {item.nickName}
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "500", color: "#9EA1A9" }}
              >
                {getRelativeTime(item.createdDate)}
              </Text>
            </View>
          </View>
          <Text style={{ color: "#000" }}>{item.content}</Text>
          <View>
            {item.photos &&
            item.photos.length > 0 &&
            item.photos[0].filePath &&
            item.photos[0].fileName ? (
              <Image
                source={{
                  uri: item.photos[0].filePath + item.photos[0].fileName,
                }}
                style={styles.cherryBlossomes}
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 5,
              marginRight: 10,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Icon_Feather name="thumbs-up" size={16} color={"#FEDB37"} />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#FEDB37" }}
              >
                {item.likeCount}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Icon_Ionicons
                name="chatbubble-ellipses-outline"
                size={16}
                color={"#FEDB37"}
              />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#FEDB37" }}
              >
                {item.commentCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
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
      <View style={styles.content}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View>
                <Text style={styles.emptyText}>No items to display</Text>
              </View>
            </View>
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.6}
        />
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
          onPress={() => navigation.navigate("CommunityCreate")}
        >
          <Icon_Entypo name="plus" color={"white"} size={50} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  content: {
    flex: 1,
    marginTop: 20,
  },
  content_item: {
    width: "90%",
    padding: 5,
    gap: 10,
    borderRadius: 10,
    paddingTop: 20,
    alignSelf: "center",
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: "#DADADA",
  },
  sampleUserImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  cherryBlossomes: {
    width: "100%",
    height: 200,
    borderRadius: 10,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});

export default Community;
