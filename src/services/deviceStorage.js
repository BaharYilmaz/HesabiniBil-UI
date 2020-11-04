import AsyncStorage from 'react-native';

const deviceStorage = {
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Set Error: ' + error.message);
        }
    },
    async getData(storage_Key) {
        try {
            const value = await AsyncStorage.getItem(storage_Key)
            if (value !== null) {
                // value previously stored
                console.log(value)
            }
        } catch (e) {
            console.log('AsyncStorage Get Error: ' + error.message);
        }
    }
};

export default deviceStorage;