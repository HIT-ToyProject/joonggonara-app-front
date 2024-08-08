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

const HomeSearch = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            marginRight: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flex: 1}}>
            <Icon_AntDesign name="left" size={30} />
          </TouchableOpacity>
          <TextInput
            editable
            style={styles.input}
            value={searchInput}
            onChange={setSearchInput}
            placeholder="검색"
            placeholderTextColor={'#ccc'}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <Text style={{fontSize: 16, fontWeight: 600}}>최근 검색</Text>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: '#222'}}>검색 삭제</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '90%',
            paddingLeft: 10,
            paddingTop: 20,
          }}>
          <View style={{flex: 1}}>
            <Icon_AntDesign name="clockcircleo" size={15} />
          </View>
          <View
            style={{
              flex: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>축구 유니폼</Text>
            <TouchableOpacity>
              <Icon_AntDesign name="close" size={15} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '90%',
            paddingLeft: 10,
            paddingTop: 20,
          }}>
          <View style={{flex: 1}}>
            <Icon_AntDesign name="clockcircleo" size={15} />
          </View>
          <View
            style={{
              flex: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>건조대</Text>
            <TouchableOpacity>
              <Icon_AntDesign name="close" size={15} />
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
  },
  content: {
    flex: 9,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    flex: 6,
    height: 40,
    backgroundColor: '#F7F7F7',
    paddingLeft: 15,
    borderRadius: 5,
  },
});

export default HomeSearch;
