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
} from "react-native";
import ReadMoreSelling from "./ReadMore_selling";
import ReadMoreSold from "./ReadMore_sold";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";

const ReadMoreSell = ({ route, navigation }) => {
  const products = route.params?.products;
  const [selectedTab, setSelectedTab] = useState("selling");
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    setSoldOutProducts(products.filter((product) => product.isSoldOut));
    setAvailableProducts(products.filter((product) => !product.isSoldOut));
  }, [products]);
  const getStyle = (tabName) => {
    return tabName === selectedTab
      ? { ...styles.tab, ...styles.activeTab }
      : styles.tab;
  };

  const getTextStyle = (tabName) => {
    return tabName === selectedTab
      ? { ...styles.text, ...styles.activeTextTab }
      : styles.text;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => navigation.goBack()}
        >
          <Icon_AntDesign name="left" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("selling")}
          style={getStyle("selling")}
        >
          <View>
            <Text style={getTextStyle("selling")}>판매중</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("sold")}
          style={getStyle("sold")}
        >
          <View>
            <Text style={getTextStyle("sold")}>판매 완료</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {selectedTab === "selling" ? (
          <ReadMoreSelling items={availableProducts} />
        ) : (
          <ReadMoreSold items={soldOutProducts} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(245, 245, 245, 1)",
  },
  left: {
    position: "absolute",
    top: 15,
    left: 5,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(254, 219, 55, 1)",
  },
  text: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
  },
  activeTextTab: {
    color: "rgba(254, 219, 55, 1)",
    fontWeight: "bold",
  },
  content: {
    flex: 16,
    marginTop: 10,
  },
});

export default ReadMoreSell;
