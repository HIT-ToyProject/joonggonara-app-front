/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import SearchId from './SearchId';
import SearchPw from './SearchPw';

const SearchIdPw = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('searchId');

  const getStyle = tabName => {
    return tabName === selectedTab
      ? {...styles.activeTab}
      : {...styles.searchBtn};
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingLeft: 10}}>
            <Icon_AntDesign name="left" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={getStyle('searchId')}
              onPress={() => setSelectedTab('searchId')}>
              <Text style={styles.searchText}>아이디 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getStyle('searchPw')}
              onPress={() => setSelectedTab('searchPw')}>
              <Text style={styles.searchText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        {selectedTab === 'searchId' ? <SearchId /> : <SearchPw />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(254, 219, 55, 1)',
  },
  searchText: {
    fontSize: 18,
    paddingVertical: 10,
    color: '#000',
  },
});

export default SearchIdPw;
