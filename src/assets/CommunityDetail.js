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
  TextInput,
} from 'react-native';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_Feather from 'react-native-vector-icons/FontAwesome';
import Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sampleImg from './image/cherryBlossoms.jpeg';
import sampleImg2 from './image/profile.jpg';
import sampleImg3 from './image/sample2.jpg';

const CommunityDetail = ({navigation}) => {
  const [thumbs, setThumbs] = useState(false);
  const thumbsToggle = () => {
    setThumbs(!thumbs);
  };

  const [contentThumbs, setContentThumbs] = useState(false);
  const contentThumbsToggle = () => {
    setContentThumbs(!contentThumbs);
  };

  const [commentInput, setCommentInput] = useState('');

  const [comment, setComment] = useState(false);
  const commentToggle = () => {
    setComment(!comment);
  };

  const [contentComment, setContentComment] = useState(false);
  const contentCommentToggle = () => {
    setContentComment(!contentComment);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Icon_AntDesign name="left" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View style={{paddingBottom: 30}}>
            <View style={styles.contentLocation}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingVertical: 5,
                }}>
                <Image style={styles.userImg} source={sampleImg2} />
                <View style={{gap: 5}}>
                  <Text style={{fontSize: 15, fontWeight: 700, color: '#000'}}>
                    안양용용이
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    1분전
                  </Text>
                </View>
              </View>
            </View>
            <View style={{gap: 20}}>
              <View style={styles.contentLocation}>
                <View
                  style={{
                    width: '90%',
                    paddingTop: 10,
                  }}>
                  <Text style={{color: '#000', fontSize: 16}}>
                    벚꽃 너무 예쁘죠?
                  </Text>
                </View>
              </View>
              <View style={styles.contentLocation}>
                <View
                  style={{
                    width: '90%',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    shadowColor: '#00300',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <Image style={styles.BuyingImg} source={sampleImg} />
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                      width: 90,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 7,
                      borderRadius: 20,
                    }}
                    onPress={contentThumbsToggle}>
                    <Icon_Feather
                      name={contentThumbs ? 'thumbs-up' : 'thumbs-o-up'}
                      size={18}
                      color={'rgba(158, 161, 169, 1)'}
                    />
                    <Text
                      style={{
                        color: 'rgba(158, 161, 169, 1)',
                        fontSize: 16,
                      }}>
                      좋아요
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 7,
                      borderRadius: 20,
                    }}
                    onPress={contentCommentToggle}>
                    <Icon_Ionicons
                      name={
                        contentComment
                          ? 'chatbubble-ellipses-sharp'
                          : 'chatbubble-ellipses-outline'
                      }
                      size={18}
                      color={'rgba(158, 161, 169, 1)'}
                    />
                    <Text
                      style={{
                        color: 'rgba(158, 161, 169, 1)',
                        fontSize: 16,
                      }}>
                      답글쓰기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  gap: 15,
                  paddingTop: 20,
                  borderTopWidth: 1,
                  borderColor: '#DADADA',
                }}>
                <Image style={styles.userImg} source={sampleImg3} />
                <View style={{gap: 5, paddingTop: 5, width: '90%'}}>
                  <Text style={{fontSize: 15, fontWeight: 700, color: '#000'}}>
                    인천음메
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    1분전
                  </Text>
                  <Text style={{fontSize: 16, color: '#000'}}>
                    네 너무 예뻐요!
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      paddingTop: 5,
                    }}>
                    <TouchableOpacity
                      style={{flexDirection: 'row', gap: 5}}
                      onPress={thumbsToggle}>
                      <Icon_Feather
                        name={thumbs ? 'thumbs-up' : 'thumbs-o-up'}
                        size={14}
                        color={'rgba(158, 161, 169, 1)'}
                      />
                      <Text
                        style={{
                          color: 'rgba(158, 161, 169, 1)',
                        }}>
                        좋아요
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection: 'row', gap: 5}}
                      onPress={commentToggle}>
                      <Icon_Ionicons
                        name={
                          comment
                            ? 'chatbubble-ellipses-sharp'
                            : 'chatbubble-ellipses-outline'
                        }
                        size={14}
                        color={'rgba(158, 161, 169, 1)'}
                      />
                      <Text
                        style={{
                          color: 'rgba(158, 161, 169, 1)',
                        }}>
                        답글쓰기
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#FEFFD2',
                      width: '90%',
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 10,
                      gap: 5,
                    }}>
                    <Icon_MaterialIcons
                      name="subdirectory-arrow-right"
                      size={20}
                      color={'#FEDB37'}
                    />
                    <View style={{gap: 7, paddingVertical: 5}}>
                      <Text
                        style={{fontSize: 15, fontWeight: 500, color: '#000'}}>
                        안양용용이
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'rgba(158, 161, 169, 1)',
                        }}>
                        감사합니다!
                      </Text>
                    </View>
                  </View>
                  {comment ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        position: 'relative',
                        paddingTop: 5,
                        marginTop: 5,
                      }}>
                      <TextInput
                        editable
                        style={styles.input}
                        value={commentInput}
                        onChange={setCommentInput}
                        placeholder="댓글 작성"
                        placeholderTextColor={'#ccc'}
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#FEDB37',
                          borderRadius: 15,
                          width: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          top: 5,
                          right: 30,
                          paddingVertical: 11,
                        }}>
                        <Text style={{fontSize: 16, color: '#fff'}}>등록</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {contentComment ? (
          <View style={styles.footer}>
            <TextInput
              editable
              style={styles.footerInput}
              value={commentInput}
              onChange={setCommentInput}
              placeholder="댓글 작성"
              placeholderTextColor={'#ccc'}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#FEDB37',
                borderRadius: 15,
                width: 65,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#fff'}}>등록</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
  },
  content: {
    flex: 16,
  },
  contentLocation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWidth: {
    width: '90%',
  },
  BuyingImg: {width: '100%', height: 350, borderRadius: 20},
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#FEDB37',
    borderRadius: 15,
    width: '90%',
    paddingVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#DADADA',
    paddingTop: 30,
  },
  footerInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#FEDB37',
    borderRadius: 15,
    width: '70%',
    height: 45,
    paddingVertical: 10,
  },
});

export default CommunityDetail;
