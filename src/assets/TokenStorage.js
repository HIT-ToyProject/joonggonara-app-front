import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";

export const setStorage = async (key, value) => {
  return await EncryptedStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = async (key) => {
  const result = await EncryptedStorage.getItem(key);
  return result && JSON.parse(result);
};

export const removeStorage = async (key) => {
  return await EncryptedStorage.removeItem(key);
};

export const reissueToken = async () => {
  try {
    const response = await axios.put(
      "http://localhost:9090/user/login/reissue",
      {
        withCredentials: true,
      }
    );
    let accessToken = response.headers.authorization;
    if (accessToken) {
      removeStorage("accessToken");
      setStorage("accessToken", accessToken);
      return accessToken;
    }
  } catch (error) {
    throw error;
  }
};
