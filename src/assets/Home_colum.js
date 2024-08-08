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
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import sampleImg from './image/sample.jpg';

const HomeColum = ({navigation}) => {
  const ChangeBtnDetail = () => {
    navigation.navigate('Detail', {screen: 'DetailScreenName'});
  };

  const ChangeBtnLogin = () => {
    navigation.navigate('Login', {screen: 'LoginScreenName'});
  };

  const [heart, setHeart] = useState(false);
  const heartToggle = () => {
    setHeart(!heart);
  };

  return (
    <View style={styles.content}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.content_item}>
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 20, width: '100%'}}
              onPress={ChangeBtnDetail}>
              <View>
                <Image style={styles.content_img} source={sampleImg} />
                <TouchableOpacity onPressOut={heartToggle}>
                  {heart ? (
                    <Icon_AntDesign
                      name="hearto"
                      color={'#FEDB37'}
                      size={25}
                      style={{position: 'absolute', bottom: 4, right: 4}}
                    />
                  ) : (
                    <Icon_AntDesign
                      name="heart"
                      color={'#FEDB37'}
                      size={25}
                      style={{position: 'absolute', bottom: 4, right: 4}}
                    />
                  )}
                </TouchableOpacity>
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
            </TouchableOpacity>
          </View>
          <View style={styles.content_item}>
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 20, width: '100%'}}
              onPress={ChangeBtnLogin}>
              <View>
                <Image style={styles.content_img} source={sampleImg} />
                <TouchableOpacity onPressOut={heartToggle}>
                  {heart ? (
                    <Icon_AntDesign
                      name="hearto"
                      color={'#FEDB37'}
                      size={25}
                      style={{position: 'absolute', bottom: 4, right: 4}}
                    />
                  ) : (
                    <Icon_AntDesign
                      name="heart"
                      color={'#FEDB37'}
                      size={25}
                      style={{position: 'absolute', bottom: 4, right: 4}}
                    />
                  )}
                </TouchableOpacity>
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
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 13,
    width: '100%',
    flexDirection: 'row',
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

export default HomeColum;
