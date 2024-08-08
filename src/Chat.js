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
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon_MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import sampleOtherUser from './assets/image/sample2.jpg';

const Chat = ({navigation}) => {
  const [headerChangeBtn, setHeaderChagebtn] = useState(true);
  const headerChangeBtnToggle = () => {
    setHeaderChagebtn(!headerChangeBtn);
    navigation.navigate('Chatting', {screen: 'ChattingScreenName'});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FEDB37'}}>
      <View style={styles.header}>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 700,
              color: '#000',
              marginLeft: 20,
              marginBottom: 20,
            }}>
            채팅
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={headerChangeBtnToggle}>
              <View style={styles.content_item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View>
                    <Image
                      source={sampleOtherUser}
                      style={styles.sampleOtherUser}
                    />
                  </View>
                  <View style={{gap: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#000',
                      }}>
                      인천음메
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(158, 161, 169, 1)',
                      }}>
                      네
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Icon_MaterialCommunityIcons
                    name="circle"
                    color={'#FEDB37'}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(158, 161, 169, 1)',
                    }}>
                    12:02
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
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
  content_item: {
    width: '90%',
    height: 80,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 6,
    marginRight: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#00300',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
  },
  sampleOtherUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Chat;
