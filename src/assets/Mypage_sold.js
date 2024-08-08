/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import sampleImg from './image/sample2.jpg';

const MypageSold = () => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            marginLeft: 15,
            marginRight: 25,
          }}>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  marginLeft: 5,
                  color: '#000',
                }}>
                전기장판 팔아요
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon_EvilIcons name="location" size={20} color={'#FEDB37'} />
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
                  fontSize: 15,
                  fontWeight: '600',
                  marginLeft: 5,
                  color: '#000',
                }}>
                15元
              </Text>
            </View>
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  marginLeft: 5,
                  color: '#000',
                }}>
                전기장판 팔아요
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon_EvilIcons name="location" size={20} color={'#FEDB37'} />
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
                  fontSize: 15,
                  fontWeight: '600',
                  marginLeft: 5,
                  color: '#000',
                }}>
                15元
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content_item: {
    width: 120,
    height: 210,
    padding: 5,
    gap: 5,
    borderRadius: 10,
  },
  content_img: {
    width: 120,
    height: 140,
    borderRadius: 10,
    objectFit: 'cover',
  },
});

export default MypageSold;
