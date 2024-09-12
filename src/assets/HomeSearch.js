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
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  useWindowDimensions,
} from "react-native";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import { api } from "./Interceptor";
import { FlatList } from "react-native-gesture-handler";
import { getSearchStorage, setSearchStorage } from "./SearchStorage";

const HomeSearch = ({ route, navigation }) => {
  const searchType = route.params.searchType;
  const goBackPage = route.params.goBackPage;

  const [searchInput, setSearchInput] = useState("");
  const { width, height } = useWindowDimensions();
  const [searchHistory, setSearchHistory] = useState([]);

  const submitKeyword = async (item) => {
    const keyword = item || searchInput;
    const url =
      searchType === "productSearch" ? "/board/sarch" : "/community/search";
    const params = {
      keyword: keyword,
      size: 5,
      page: 0,
    };

    try {
      const response = await api.get(url, { params });

      if (response && response.data) {
        console.log(response.data.content);
        setSearchInput("");
        saveSearchHistory();
        navigation.navigate({
          name: goBackPage, // 이전 화면의 이름
          params: {
            searchData: response.data.content, // 전달할 데이터
            keyword: keyword, // 전달할 검색어
          },
        });
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const saveSearchHistory = async () => {
    let history = await getSearchStorage(searchType);
    if (searchInput.trim() === "") return;
    if (!history.includes(searchInput)) {
      history.push(searchInput);
      setSearchStorage(searchType, history);
    }
  };

  useEffect(() => {
    const getSearchHistorys = async () => {
      const history = await getSearchStorage(searchType);
      setSearchHistory(history);
    };
    getSearchHistorys();
  }, []);

  const removeSearchHistory = async (item) => {
    let history = await getSearchStorage(searchType);
    history = history.filter((data) => data !== item);
    setSearchStorage(searchType, history);
    setSearchHistory(history);
  };
  const submitHistory = async (item) => {
    submitKeyword(item);
  };
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Icon_AntDesign name="clockcircleo" size={15} />
      </View>
      <View
        style={{
          flex: 9,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => submitHistory(item)}>
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeSearchHistory(item)}>
          <Icon_AntDesign name="close" size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1 }}
          >
            <Icon_AntDesign name="left" size={30} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="검색"
            placeholderTextColor={"#ccc"}
            autoCapitalize="none"
            onSubmitEditing={() => submitKeyword()}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>최근 검색</Text>
          <Text style={{ fontSize: 16, color: "#222" }}>검색 삭제</Text>
        </View>

        <View
          style={{
            width: "90%",
            paddingLeft: 10,
            paddingTop: 20,
            height: height,
          }}
        >
          <FlatList
            data={searchHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 9,
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    flex: 6,
    height: 40,
    backgroundColor: "#F7F7F7",
    paddingLeft: 15,
    borderRadius: 5,
  },
});

export default HomeSearch;
