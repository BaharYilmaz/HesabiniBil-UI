import React, { useState, Component, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import moment from "moment";
import Toast from 'react-native-simple-toast';
const AppContext = React.createContext();
import jwt_decode from "jwt-decode";

const AppProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';

    const [loginState, changeLoginState] = useState(false);
    const [userId, setUserId] = useState('');

    const [modalJoin, setModalJoin] = React.useState({ modalVisible: false});
    const [modalInvitation, setModalInvitation] = React.useState({ modalVisible: false,modalMessage:''});
    const [modalEditAccount, setModalEditAccount] = React.useState({ modalVisible: false,modalValue:''});

    const [accountList, setAccountList] = React.useState([]);
    const [accountMembers, setAccountMembers] = React.useState([]);

    var tokenUserId = '';

    useEffect(() => { loggedIn() }, [])

    const loggedIn = async () => {
        var result = await getToken();
        result = JSON.parse(result)

        if (result === null) {
            changeLoginState(false); console.log("token yok", loginState)
        }
        else {
            var tokenDate = moment(result.expiration).format('YYYY-MM-DD HH:mm:ss')
            var date = moment().format('YYYY-MM-DD HH:mm:ss')
            var decoded = jwt_decode(result.token);

            console.log("decoded", decoded.nameIdentifier);
            if (moment(tokenDate).isAfter(date)) {
                console.log("token geçerli")
                changeLoginState(true)
                setUserId(decoded.nameIdentifier)
                tokenUserId = decoded.nameIdentifier;
                console.log("decoded user ıd", tokenUserId)
                //  changeLoginState(result.token)

            }
            else {
                changeLoginState(false);
                setUserId('')
                console.log("token geçersiz")
            }
        }
        // return result
    }

    const getToken = async () => await AsyncStorage.getItem("token");
    const saveToken = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            loggedIn()

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
                if (data != null) {
                    saveToken("token", data);
                }
            })
            .catch(error =>
                // console.log("hata", error)
                //setModal({ modalVisible: true, modalMessage: 'Kullanıcı adı veya Şifre yanlış!',modalMessageDetail: '' })
                Toast.show('Kullanıcı adı veya Şifre yanlış!', Toast.LONG));
    }
    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem("token")
            console.log("çıkış yapıldı")
            loggedIn();
        } catch (e) { }
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
                if (data != null) { saveToken("token", data); }
            })
            .catch(error =>
                Toast.show('Kayıt başarısız, tekrar deneyiniz!', Toast.LONG));
    }

    const deleteUserAccount = async () => {
        console.log("delete account")
    }
    const createAccount = async (data) => {
        var result = JSON.parse(await getToken());

        console.log("giden token", result.token)
        fetch(apiBaseUrl + '/account/AddAccount',
            {
                method: 'POST',
                headers: new Headers({
                    'Authorization': "Bearer " + result.token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => { console.log("data", data); getAccounts() })
            .catch(error => { Toast.show('İşlem başarısız, tekrar deneyiniz!', Toast.LONG); getAccounts() });

        return true;
    }
    const getAccounts = async () => {
        console.log("ıd", userId)

        // var result = await getToken();
        // result = JSON.parse(result)
        // var decoded = jwt_decode(result.token);
        // var tokenId = decoded.nameIdentifier
        // console.log("USER ıd", tokenId)
        fetch(apiBaseUrl + '/account/getAccountsByStatus/' + userId + '/true',
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(data => { setAccountList(data) })
            .catch(error => { console.log("hata", error); })
        console.log("hesap listesi alındı", accountList)
    }
    // const getAccounts = async () => {
    //     var result = await getToken();
    //     result = JSON.parse(result)
    //     var decoded = jwt_decode(result.token);
    //     var tokenId = decoded.nameIdentifier
    //     console.log("USER ıd", tokenId)

    //     fetch(apiBaseUrl + '/account/getAccounts/' + tokenId,
    //         {
    //             method: 'GET',
    //             headers: new Headers({
    //                 'Content-Type': 'application/json'
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(data => { setAccountList(data) ;console.log(data)})
    //         .catch(error => { console.log("hata list", error); })
    //     // console.log("data")
    // }

    // const getAccountsById = async (ortakHesapId) => {
    //     console.log(ortakHesapId)
    //     fetch(apiBaseUrl + '/account/api/Account/getAccountsByID/'+ortakHesapId,
    //         {
    //             method: 'GET',
    //             headers: new Headers({
    //                 'Content-Type': 'application/json'
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(data => { setAccountList(data);console.log(data) })
    //         .catch(error => { console.log("hata", error); })

    //     console.log("hesap alındı")
    // }
    // /api/Account/getAccountMembers/{OrtakHesapID}

    const getAccountMembers = (ortakHesapId) => {
        fetch(apiBaseUrl + '/account/getAccountMembers/' + ortakHesapId,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(data => { setAccountMembers(data); console.log(data) })
            .catch(error => { console.log("hata", error); })

        console.log("member alındı", accountMembers)
    }

    return (
        <AppContext.Provider
            value={{
                loginState, changeLoginState,
                modalJoin, setModalJoin,
                modalInvitation,setModalInvitation,
                modalEditAccount,setModalEditAccount,
                userId, setUserId,
                handleLogin,
                handleRegister,
                handleLogOut,
                createAccount,
                deleteUserAccount,
                getAccounts, accountList,
                getAccountMembers, accountMembers,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }; 