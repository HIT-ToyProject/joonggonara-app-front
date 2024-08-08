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
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';

const Setting = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', left: 0}}>
            <Icon_AntDesign name="left" size={25} />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 20, fontWeight: 700, color: '#000'}}>
              설정
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            width: '90%',
          }}>
          <Text style={{fontSize: 16, fontWeight: 600}}>알림 설정</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: 30,
            }}>
            <TouchableOpacity style={{width: '100%'}}>
              <Text style={{fontSize: 16}}>알림 수신 설정</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '90%',
          }}>
          <Text style={{fontSize: 16, fontWeight: 600}}>사용자 설정</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: 30,
              gap: 30,
            }}>
            <TouchableOpacity style={{width: '100%'}}>
              <Text style={{fontSize: 16}}>계정 / 정보 설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}}>
              <Text style={{fontSize: 16}}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}}>
              <Text style={{fontSize: 16}}>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#F7F7F7',
    paddingBottom: 20,
  },
  content: {
    flex: 9,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    gap: 40,
  },
});

export default Setting;
