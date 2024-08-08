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
import {launchImageLibrary} from 'react-native-image-picker';

const CommunityCreate = ({navigation, route}) => {
  const [contentInput, setContentInput] = useState('');
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
        content: contentInput,
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
        <Text style={styles.headerText}>커뮤니티 작성하기</Text>
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
              <View style={{flexDirection: 'row', gap: 15}}>
                <TouchableOpacity
                  onPress={selectImages}
                  style={styles.uploadImgBox}>
                  <Icon_SimpleLineIcons name="camera" size={25} />
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
              </View>
            </ScrollView>
            <View style={{paddingTop: 20}}>
              <TextInput
                editable
                style={styles.contentInput}
                value={contentInput}
                onChangeText={text => setContentInput(text)}
                placeholder="상품에 대해서 설명해 주세요!"
                placeholderTextColor={'#CCC'}
                multiline={true}
              />
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
  uploadImg: {width: 120, height: 120, borderRadius: 5},
  contentInput: {
    height: 250,
    backgroundColor: 'rgba(247, 247, 247, 1)',
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    flex: 8,
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

export default CommunityCreate;
