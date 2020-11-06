import React, { useState, Component, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import deviceStorage from '../services/deviceStorage'
const AppContext = React.createContext();

const AppProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';

    const [loginState, changeLoginState] = useState('');
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [accountList, setAccountList] = React.useState([]);

    useEffect(() => { let result = getMyToken() })

    const getMyToken = async () => {
        var token = await getToken();
        changeLoginState(token)
        return token
    }
    const getToken = async () => await AsyncStorage.getItem("token");
    const saveToken = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            changeLoginState(value);
        } catch (e) { }
    };

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
                if (data != null) { saveToken("token", data.token); }
            })
            .catch(error => console.log("hata", error));

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
                if (data != null) { saveToken("token", data.token); }
            })
            .catch(error => console.log(error));
    }

    const deleteUserAccount = async () => {
        console.log("delete account")
    }
    const createAccount = async (data) => {
        var token = await getToken();
        console.log(data)
        fetch(apiBaseUrl + '/account/AddAccount',
            {
                method: 'POST',
                headers: new Headers({
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => { console.log(data) })
            .catch(error => console.log("hata", error));
        return true;

    }
    const getAccounts = async () => {
        var token = await getToken();
         fetch(apiBaseUrl + '/account/getAccounts',
            {
                method: 'GET',
                headers: new Headers({
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(data => { setAccountList(data)  })
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
                getAccounts,accountList
            }}>
            {props.children}
        </AppContext.Provider>
    )

}

export { AppProvider, AppContext }; 3