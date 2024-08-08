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
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_Feather from 'react-native-vector-icons/Feather';
import sampleUserImg from './assets/image/profile.jpg';

const locationData = [
  {title: '哈尔滨工业大学'},
  {title: '黑龙江大学'},
  {title: '哈尔滨工程大学'},
];

const Community = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const handlePostCreated = newPost => {
    setPosts([newPost, ...posts]);
  };

  const ChangeBtnSearch = () => {
    navigation.navigate('CommunitySearch', {
      screen: 'CommunitySearchScreenName',
    });
  };

  const ChangeBtnDetail = () => {
    navigation.navigate('CommunityDetail', {
      screen: 'CommunityDetailScreenName',
    });
  };

  const getRelativeTime = timestamp => {
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
      <View style={styles.content}>
        <ScrollView>
          <TouchableOpacity
            onPress={ChangeBtnDetail}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {posts.map((post, index) => (
              <View key={index} style={styles.content_item}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={sampleUserImg} style={styles.sampleUserImg} />
                  <View style={{gap: 5}}>
                    <Text
                      style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
                      사용자 이름
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#9EA1A9',
                      }}>
                      {getRelativeTime(post.timestamp)}
                    </Text>
                  </View>
                </View>
                <Text style={{color: '#000'}}>{post.content}</Text>
                {post.images.map(image => (
                  <Image
                    key={index}
                    source={{uri: image.uri}}
                    style={styles.cherryBlossomes}
                  />
                ))}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 5,
                    marginRight: 10,
                  }}>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <Icon_Feather
                      name="thumbs-up"
                      size={16}
                      color={'#FEDB37'}
                    />
                    <Text
                      style={{fontSize: 16, fontWeight: 500, color: '#FEDB37'}}>
                      5
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <Icon_Ionicons
                      name="chatbubble-ellipses-outline"
                      size={16}
                      color={'#FEDB37'}
                    />
                    <Text
                      style={{fontSize: 16, fontWeight: 500, color: '#FEDB37'}}>
                      1
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
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
            navigation.navigate('CommunityCreate', {
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
  content: {
    flex: 13,
    marginTop: 20,
  },
  content_item: {
    width: '90%',
    padding: 5,
    gap: 10,
    borderRadius: 10,
    paddingTop: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: '#DADADA',
  },
  sampleUserImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  cherryBlossomes: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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

export default Community;
