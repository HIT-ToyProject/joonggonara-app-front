/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  NativeEventEmitter,
  NativeModules,
} from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Home from "./src/Home";
import Community from "./src/Community";
import Chat from "./src/Chat";
import Mypage from "./src/Mypage";
import Chatting from "./src/assets/Chatting";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import Icon_FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ReadMoreSell from "./src/assets/ReadMore_sell";
import ReadMoreBuy from "./src/assets/ReadMore_buy";
import HomeCreate from "./src/assets/Home_create";
import CommunityCreate from "./src/assets/Community_create";
import Detail from "./src/assets/Detail";
import Login from "./src/assets/Login";
import Join from "./src/assets/Join";
import SearchIdPw from "./src/assets/SearchIdPw";
import SearchId from "./src/assets/SearchId";
import SearchPw from "./src/assets/SearchPw";
import HomeSearch from "./src/assets/HomeSearch";
import Setting from "./src/assets/Setting";
import CommunityDetail from "./src/assets/CommunityDetail";
import SocialWebView from "./src/assets/social/SocialWebView";
import SocialLoginRedirect from "./src/assets/social/SocialLoginRedirect";
import UseEmailSearchId from "./src/assets/UseEmailSearchId";
import ResetPwd from "./src/assets/ResetPwd";
import UpdateUserInfo from "./src/assets/UpdateUserInfo";
import { getStorage } from "./src/assets/TokenStorage";
import SocialJoin from "./src/assets/SocialJoin";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="HomeCreate"
        component={HomeCreate}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="SearchIdPw"
        component={SearchIdPw}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="SearchId"
        component={SearchId}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="SearchPw"
        component={SearchPw}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen name="WebView" component={SocialWebView} />
      <Stack.Screen
        name="SocialLoginRedirect"
        component={SocialLoginRedirect}
      />
      <Stack.Screen name="UseEmailSearchId" component={UseEmailSearchId} />
      <Stack.Screen name="ResetPwd" component={ResetPwd} />
      <Stack.Screen name="SocialJoin" component={SocialJoin} />
      <Stack.Screen name="Chatting" component={Chatting} />
    </Stack.Navigator>
  );
}

function CommunityStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Community"
    >
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen
        name="CommunityCreate"
        component={CommunityCreate}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="CommunityDetail"
        component={CommunityDetail}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Chat"
    >
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{
          tabBarStyle: { display: "none" },
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
}

function MypageReadMore() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Mypage"
    >
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="ReadMoreSell" component={ReadMoreSell} />
      <Stack.Screen name="ReadMoreBuy" component={ReadMoreBuy} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="UpdateUserInfo" component={UpdateUserInfo} />
    </Stack.Navigator>
  );
}

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Default";

  if (
    routeName === "HomeCreate" ||
    routeName === "CommunityCreate" ||
    routeName === "Chatting" ||
    routeName === "Detail" ||
    routeName === "Login" ||
    routeName === "Join" ||
    routeName === "SearchIdPw" ||
    routeName === "SearchId" ||
    routeName === "SearchPw" ||
    routeName === "HomeSearch" ||
    routeName === "Setting" ||
    routeName === "CommunityDetail" ||
    routeName === "UpdateUserInfo"
  ) {
    return "none";
  }
  return "flex";
};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const checkTokenHandle = async (navigation) => {
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

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarActiveTintColor: "#FEDB37",
          headerShown: false,
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...Platform.select({
              android: {
                paddingBottom: 15,
                paddingTop: 15,
                height: 70,
              },
            }),
          },
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                if (route.name === "홈") props.onPress();
                else {
                  const checkToken = await checkTokenHandle(navigation);
                  if (checkToken) {
                    props.onPress();
                  }
                }
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="홈"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="커뮤니티"
          component={CommunityStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon_FontAwesome5 name="users" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="채팅"
          component={ChatStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon_Entypo name="chat" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MypageReadMore}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon_FontAwesome5 name="user" solid color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    color: "#FEDB37",
  },
});

export default App;
