import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSearchStorage = async (key, value) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getSearchStorage = async (key) => {
  const result = await AsyncStorage.getItem(key);
  return result ? JSON.parse(result) : [];
};
