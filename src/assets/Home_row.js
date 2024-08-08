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
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import sampleImg from './image/sample.jpg';

const HomeRow = ({navigation}) => {
  const [heart, setHeart] = useState(false);
  const heartToggle = () => {
    setHeart(!heart);
  };

  const ChangeBtnDetail = () => {
    navigation.navigate('Detail', {screen: 'DetailScreenName'});
  };
  return (
    <View style={styles.content}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 15,
          }}>
          <View style={styles.content_item}>
            <TouchableOpacity style={{gap: 10}} onPress={ChangeBtnDetail}>
              <View>
                <Image style={styles.content_img} source={sampleImg} />
                <TouchableOpacity onPressOut={heartToggle}>
                  {heart ? (
                    <Icon_AntDesign
                      name="hearto"
                      color={'#FEDB37'}
                      size={30}
                      style={{position: 'absolute', bottom: 4, right: 4}}
                    />
                  ) : (
                    <Icon_AntDesign
                      name="heart"
                      color={'#FEDB37'}
                      size={30}
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
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
          </View>
          <View style={styles.content_item}>
            <View>
              <Image style={styles.content_img} source={sampleImg} />
              <Icon_AntDesign
                name="heart"
                color={'#FEDB37'}
                size={30}
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
    padding: 5,
    gap: 10,
    borderRadius: 10,
  },
  content_img: {
    width: 170,
    height: 210,
    borderRadius: 10,
    objectFit: 'cover',
  },
});

export default HomeRow;
