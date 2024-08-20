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

const SEARCH_HISTORY = "SEARCH_HISTORY";
const HomeSearch = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const { width, height } = useWindowDimensions();
  const [searchHistory, setSearchHistory] = useState([]);
  const submitKeyword = async () => {
    const url = "/board/search";
    const params = {
      keyword: searchInput,
      size: 5,
      page: 0,
    };
    try {
      const response = await api.get(url, { params });
      saveSearchHistory();
      navigation.navigate({
        name: "Home",
        params: {
          searchData: response.data,
          keyword: searchInput,
        },
        merge: true,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("에러", error.response.data.message);
    }
  };

  const saveSearchHistory = async () => {
    let history = await getSearchStorage(SEARCH_HISTORY);
    if (searchInput.trim() === "") return;
    if (!history.includes(searchInput)) {
      history.push(searchInput);
      setSearchStorage(SEARCH_HISTORY, history);
    }
  };

  useEffect(() => {
    const getSearchHistorys = async () => {
      const history = await getSearchStorage(SEARCH_HISTORY);
      setSearchHistory(history);
    };
    getSearchHistorys();
  }, []);

  const removeSearchHistory = async (item) => {
    let history = await getSearchStorage(SEARCH_HISTORY);
    history = history.filter((data) => data !== item);
    setSearchStorage(SEARCH_HISTORY, history);
    setSearchHistory(history);
  };
  const submitHistory = async (item) => {
    setSearchInput(item);
    submitKeyword();
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
            editable
            style={styles.input}
            onChangeText={setSearchInput}
            placeholder="검색"
            placeholderTextColor={"#ccc"}
            autoCapitalize="none"
            onSubmitEditing={submitKeyword}
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
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: "#222" }}>검색 삭제</Text>
          </TouchableOpacity>
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
