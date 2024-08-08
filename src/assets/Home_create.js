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
import Icon_SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {launchImageLibrary} from 'react-native-image-picker';

const HomeCreate = ({navigation, route}) => {
  const [titleInput, setTitleInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const [selected, setSelected] = useState('나눔');
  const categories = [
    '나눔',
    '의류',
    '도서',
    '생활용품',
    '화장품',
    '전자기기',
    '기타',
  ];

  const [isLocationInput, setIsLocationInput] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isConditionInput, setIsConditionInput] = useState(false);
  const [conditionInput, setConditionInput] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const selectImages = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      selectionLimit: 0, // 0 means no limit
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const newImages = response.assets.map(asset => ({uri: asset.uri}));
        setSelectedImages([...selectedImages, ...newImages]);
      }
    });
  };

  const removeImage = uri => {
    setSelectedImages(selectedImages.filter(image => image.uri !== uri));
  };

  const handleAddContent = () => {
    if (route.params && route.params.onPostCreated) {
      route.params.onPostCreated({
        price: priceInput,
        title: titleInput,
        images: selectedImages,
        timestamp: new Date().toISOString(),
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerClose}>
          <Icon_AntDesign name="close" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>내 물건 팔기</Text>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View style={{gap: 15, paddingHorizontal: 15, paddingTop: 15}}>
            <Text style={{fontSize: 20, fontWeight: 700, color: '#000'}}>
              사진을 올려주세요!
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={selectImages}>
                <View style={styles.uploadImgBox}>
                  <Icon_SimpleLineIcons name="camera" size={25} />
                </View>
              </TouchableOpacity>
              {selectedImages.map((image, index) => (
                <View key={index} style={{position: 'relative'}}>
                  <Image
                    style={styles.uploadImg}
                    source={image}
                    value={selectedImages}
                    onChange={image => setSelectedImages(image)}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: 5,
                    }}
                    onPress={() => removeImage(image.uri)}>
                    <Icon_AntDesign name="close" size={20} color={'#000'} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TextInput
              editable
              style={styles.input}
              value={titleInput}
              onChange={title => setTitleInput(title)}
              placeholder="제목"
              placeholderTextColor={'#CCC'}
            />
            <Text style={{fontSize: 16, fontWeight: 700}}>카테고리</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.category}>
            <View
              style={{flexDirection: 'row', paddingHorizontal: 15, gap: 10}}>
              {categories.map(category => (
                <View key={category}>
                  <TouchableOpacity
                    style={[
                      styles.categoryBtn,
                      {
                        backgroundColor:
                          selected === category ? '#FEDB37' : null,
                      },
                    ]}
                    onPress={() => setSelected(category)}>
                    <Text
                      style={[
                        styles.categoryText,
                        {color: selected === category ? 'white' : 'black'},
                      ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 15, paddingBottom: 10, gap: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                editable
                style={styles.input}
                value={priceInput}
                onChange={setPriceInput}
                placeholder="가격"
                placeholderTextColor={'#CCC'}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 700,
                  flex: 1,
                  paddingLeft: 20,
                }}>
                元
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <BouncyCheckbox
                size={22}
                fillColor="#ccc"
                text="나눔하기"
                textStyle={{
                  fontSize: 16,
                  color: '#000',
                  textDecorationLine: 'none',
                }}
              />
            </View>
            <TextInput
              editable
              style={styles.contentInput}
              value={contentInput}
              onChange={setContentInput}
              placeholder="상품에 대해서 설명해 주세요!"
              placeholderTextColor={'#CCC'}
              multiline={true}
            />
          </View>
          <View style={styles.container}>
            <View style={{gap: 15}}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setIsLocationInput(!isLocationInput)}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                  <Icon_AntDesign name="enviromento" size={20} />
                  <Text style={{fontSize: 16, fontWeight: 700}}>거래 장소</Text>
                </View>
                <Text style={styles.arrow}>
                  {isLocationInput ? (
                    <Icon_AntDesign name="down" size={20} />
                  ) : (
                    <Icon_AntDesign name="right" size={20} />
                  )}
                </Text>
              </TouchableOpacity>
              {isLocationInput && (
                <TextInput
                  style={styles.input}
                  value={conditionInput}
                  onChangeText={setConditionInput}
                  placeholder="희망 장소를 입력해 주세요."
                />
              )}
            </View>
            <View style={{gap: 15}}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setIsConditionInput(!isConditionInput)}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                  <Icon_SimpleLineIcons name="pencil" size={20} />
                  <Text style={{fontSize: 16, fontWeight: 700}}>제품 상태</Text>
                </View>
                <Text style={styles.arrow}>
                  {isConditionInput ? (
                    <Icon_AntDesign name="down" size={20} />
                  ) : (
                    <Icon_AntDesign name="right" size={20} />
                  )}
                </Text>
              </TouchableOpacity>
              {isConditionInput && (
                <TextInput
                  style={styles.input}
                  value={locationInput}
                  onChangeText={setLocationInput}
                  placeholder="제품 상태를 입력해 주세요."
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={handleAddContent}>
          <Text style={styles.footerText}>작성 완료</Text>
        </TouchableOpacity>
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
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  headerText: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
  },
  content: {
    flex: 16,
    paddingBottom: 20,
  },
  uploadImgBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  uploadImg: {width: 120, height: 120, borderRadius: 5, marginLeft: 15},
  uploadedImgContainer: {
    position: 'relative',
    marginLeft: 15,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(247, 247, 247, 1)',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    flex: 10,
  },
  contentInput: {
    height: 150,
    backgroundColor: 'rgba(247, 247, 247, 1)',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    flex: 8,
  },
  category: {
    paddingVertical: 15,
  },
  categoryBtn: {
    width: 90,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245,245, 245, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 15,
    gap: 25,
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(218, 218, 218, 1)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 16,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
  },
  footerBtn: {
    backgroundColor: '#FEDB37',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
});

export default HomeCreate;
