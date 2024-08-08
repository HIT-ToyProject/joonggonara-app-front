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
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon_Feather from 'react-native-vector-icons/Feather';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import sampleOtherUser from './image/sample2.jpg';

const Chatting = ({navigation}) => {
  const [chatInput, setChatInput] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#FEDB37'}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon_AntDesign name="left" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 700,
              color: '#000',
            }}>
            인천음메
          </Text>
          <TouchableOpacity>
            <Icon_Entypo name="dots-three-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.date}>
            <Text style={styles.dateText}>2023년 4월 15일</Text>
          </View>
          <View style={styles.otherChat}>
            <Image source={sampleOtherUser} style={styles.sampleOtherUser} />
            <View style={styles.otherChatText}>
              <Text>네고 가능할까요?</Text>
            </View>
            <Text style={styles.timeText}>오후 3:17</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateText}>2023년 4월 16일</Text>
          </View>
          <View style={styles.myChat}>
            <Text style={styles.timeText}>오전 11:11</Text>
            <View style={styles.myChatText}>
              <Text>안됩니다ㅠ.ㅠ</Text>
            </View>
          </View>
          <View style={styles.otherChat}>
            <Image source={sampleOtherUser} style={styles.sampleOtherUser} />
            <View style={styles.otherChatText}>
              <Text>거래 장소 어디 원하시나요?</Text>
            </View>
            <Text style={styles.timeText}>오후 12:00</Text>
          </View>
          <View style={styles.myChat}>
            <Text style={styles.timeText}>오전 12:01</Text>
            <View style={styles.myChatText}>
              <Text>하공대 서문 앞이요</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Icon_Feather name="plus" size={30} />
          </TouchableOpacity>
          <TextInput
            editable
            style={styles.input}
            value={chatInput}
            onChange={setChatInput}
            placeholder="메세지 보내기"
            placeholderTextColor={'#CCC'}
          />
          <TouchableOpacity>
            <Icon_FontAwesome name="send" size={25} color={'#FEDB37'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#003',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
    elevation: 5,
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  dateText: {
    color: 'rgba(158, 161, 169, 1)',
    fontSize: 14,
    fontWeight: 400,
  },
  otherChat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  myChat: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    paddingRight: 10,
  },
  otherChatText: {
    backgroundColor: 'rgba(245, 245, 245, 1)',
    padding: 10,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  myChatText: {
    backgroundColor: 'rgba(254, 219, 55, 1)',
    padding: 10,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    borderTopRightRadius: 0,
  },
  timeText: {
    fontSize: 10,
    color: 'rgba(158, 161, 169, 1)',
    paddingTop: 15,
  },
  sampleOtherUser: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  input: {
    width: 300,
    height: 45,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    fontSize: 15,
    paddingLeft: 15,
  },
  footer: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(158, 161, 169, 1)',
  },
});

export default Chatting;
