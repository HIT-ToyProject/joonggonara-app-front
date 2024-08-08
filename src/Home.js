/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import SelectDropdown from 'react-native-select-dropdown';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import HomeColum from './assets/Home_colum';
import HomeRow from './assets/Home_row';
import category1 from './assets/image/category/sharing.png';
import category2 from './assets/image/category/clothing.png';
import category3 from './assets/image/category/book.png';
import category4 from './assets/image/category/dailiySupplies.png';
import category5 from './assets/image/category/cosmetics.png';
import category6 from './assets/image/category/electronicDevices.png';
import category7 from './assets/image/category/other.png';

const locationData = [
  {title: '哈尔滨工业大学'},
  {title: '黑龙江大学'},
  {title: '哈尔滨工程大学'},
];

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const handlePostCreated = newPost => {
    setPosts([newPost, ...posts]);
  };

  const Stack = createStackNavigator();

  const [toggle, setToggle] = useState(true);
  const toggleTh = () => {
    setToggle(!toggle);
  };

  const ChangeBtnSearch = () => {
    navigation.navigate('HomeSearch', {screen: 'HomeSearchScreenName'});
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View>
          <SelectDropdown
            data={locationData}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      '학교를 선택해주세요.'}
                  </Text>
                  <Icon_AntDesign
                    name={isOpened ? 'up' : 'down'}
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
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
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
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10,
          }}>
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
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category1} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category2} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category3} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category4} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category5} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category6} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.categoryImg} source={category7} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={toggleTh}>
          {toggle ? (
            <Icon_FontAwesome name="th-large" size={25} />
          ) : (
            <Icon_FontAwesome name="th-list" size={25} />
          )}
        </TouchableOpacity>
      </View>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {toggle ? (
          <Stack.Screen
            name="homeColum"
            component={HomeColum}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
        ) : (
          <Stack.Screen
            name="homeRow"
            component={HomeRow}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
        )}
      </Stack.Navigator>
      <View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: '#FEDB37',
            borderRadius: 50,
          }}
          onPress={() =>
            navigation.navigate('HomeCreate', {
              onPostCreated: handlePostCreated,
            })
          }>
          <Icon_Entypo name="plus" color={'white'} size={50} />
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
    width: '100%',
    flexDirection: 'row',
    zIndex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  chageView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  categoryImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  dropdownButtonStyle: {
    width: 190,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 10,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default Home;
