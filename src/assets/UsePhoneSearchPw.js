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

const UsePhoneSearchPw = ({navigation}) => {
  const [idInput, setIdInput] = useState('');

  return (
    <View>
      <View
        style={{
          gap: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: 16, color: '#000'}}>아이디</Text>
        <TextInput
          style={styles.joinInput}
          value={idInput}
          onChange={setIdInput}
        />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: 16, color: '#000'}}>이름</Text>
        <TextInput
          style={styles.joinInput}
          value={idInput}
          onChange={setIdInput}
        />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: 16, color: '#000'}}>휴대전화</Text>
        <TextInput
          style={styles.joinInput}
          value={idInput}
          onChange={setIdInput}
        />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: 16, color: '#000'}}>인증번호</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            width: '80%',
          }}>
          <TextInput
            style={styles.joinInputOverlab}
            value={idInput}
            onChange={setIdInput}
          />
          <TouchableOpacity style={styles.overlap}>
            <Text style={{fontSize: 16, fontWeight: 700, color: '#fff'}}>
              인증 요청
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinInputOverlab: {
    flex: 3,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#F7F7F7',
    paddingLeft: 20,
  },
  joinInput: {
    width: '80%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#F7F7F7',
    paddingLeft: 20,
  },
  overlap: {
    flex: 2,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FEDB37',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UsePhoneSearchPw;
