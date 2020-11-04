import React, { useState, Component, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import deviceStorage from '../services/deviceStorage'
const AppContext = React.createContext();

const AppProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';

    const [loginState, changeLoginState] = useState(0);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [token, setToken] = useState('');



    console.log(loginState)

    const handleLogin = (data) => {
        console.log(data)
        fetch(apiBaseUrl + '/auth/login',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    console.log(data.token)
                    saveToken("token", data.token);
                }
            })
            .catch(error => console.log("hata", error));

    }
    const saveToken = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    };
    const getToken = async (storage_Key) => {
        try {
            const token = await AsyncStorage.getItem(storage_Key)
            console.log("1", token)
            return token
            // setToken(value);
        } catch (e) {
            console.log('AsyncStorage Get Error: ' + error.message);
        }
    }

    const handleRegister = (data) => {
        console.log(data)
        fetch(apiBaseUrl + '/auth/register',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    console.log(data.token)
                    saveToken.saveItem("id_token", data.token);
                }
            })
            .catch(error => console.log(error));
    }

    const deleteUserAccount = () => {
        console.log("delete account")
    }
    const createAccount = (data) => {
        console.log("token 3", getToken("token"))

        fetch(apiBaseUrl + '/auth/register',
            {
                method: 'POST',
                headers: new Headers({
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    console.log(data.token)
                    saveToken.saveItem("id_token", data.token);
                }
            })
            .catch(error => console.log(error));
        console.log(data)
        return true;
    }
    return (
        <AppContext.Provider
            value={{
                loginState, changeLoginState,
                handleLogin,
                handleRegister,
                isModalVisible, setModalVisible,
                createAccount,
                deleteUserAccount,
                getToken
            }}>
            {props.children}
        </AppContext.Provider>
    )

}

export { AppProvider, AppContext }; 3