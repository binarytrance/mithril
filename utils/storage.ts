import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorageItem(key: string) {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error getting item from storage: ${error}`);
        return null;
    }
}
export async function setStorageItem(key: string, data: object) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error setting item in storage: ${error}`);
    }
}
