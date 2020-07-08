import AsyncStorage from "@react-native-community/async-storage";


export const getStorageData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('sc_goal');
        return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch(e) {
        // error reading value
    }
}

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('sc_goal', value)
    } catch (e) {
        // saving error
    }
}
