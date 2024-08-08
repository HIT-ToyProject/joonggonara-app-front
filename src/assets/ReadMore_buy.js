/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import sampleImg from './image/sample3.jpg';

const ReadMoreBuy = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('selling');

  const getStyle = tabName => {
    return tabName === selectedTab
      ? {...styles.tab, ...styles.activeTab}
      : styles.tab;
  };

  const getTextStyle = tabName => {
    return tabName === selectedTab
      ? {...styles.text, ...styles.activeTextTab}
      : styles.text;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => navigation.goBack()}>
          <Icon_AntDesign name="left" size={25} />
        </TouchableOpacity>
        <View style={styles.tab}>
          <Text style={getTextStyle('selling')}>구매 완료</Text>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.content_item}>
              <View>
                <Image style={styles.content_img} source={sampleImg} />
                <Icon_AntDesign
                  name="heart"
                  color={'#FEDB37'}
                  size={25}
                  style={{position: 'absolute', bottom: 4, right: 4}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginLeft: 5,
                    color: '#000',
                  }}>
                  전기장판 팔아요
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon_EvilIcons name="location" size={30} color={'#FEDB37'} />
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#9EA1A9',
                    }}>
                    하얼빈공업대학교
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 5,
                    color: '#000',
                  }}>
                  15元
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}>
                <Icon_Entypo name="dots-three-vertical" size={15} />
              </View>
            </View>
            <View style={styles.content_item}>
              <View>
                <Image style={styles.content_img} source={sampleImg} />
                <Icon_AntDesign
                  name="heart"
                  color={'#FEDB37'}
                  size={25}
                  style={{position: 'absolute', bottom: 4, right: 4}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginLeft: 5,
                    color: '#000',
                  }}>
                  전기장판 팔아요
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon_EvilIcons name="location" size={30} color={'#FEDB37'} />
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#9EA1A9',
                    }}>
                    하얼빈공업대학교
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 5,
                    color: '#000',
                  }}>
                  15元
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}>
                <Icon_Entypo name="dots-three-vertical" size={15} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 245, 245, 1)',
  },
  left: {
    position: 'absolute',
    top: 15,
    left: 5,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(254, 219, 55, 1)',
  },
  text: {
    fontSize: 16,
    color: 'rgba(254, 219, 55, 1)',
    fontWeight: 'bold',
  },
  content: {
    flex: 16,
    marginTop: 10,
  },
  content_item: {
    width: '90%',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 6,
    marginRight: 6,
    flexDirection: 'row',
    gap: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#00300',
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
    objectFit: 'cover',
  },
});

export default ReadMoreBuy;
