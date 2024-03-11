import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string | object) => {
  //write log in green
  console.log('\x1b[32m', `storeData: key: ${key}, value: ${value}`);

  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async <Type = string>(key: string): Promise<Type | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value) as Type;
    }
  } catch (e) {
    // error reading value
    console.error(e);
  }

  return null;
};
