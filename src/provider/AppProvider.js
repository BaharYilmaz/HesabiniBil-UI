import React, { useState, Component, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import moment from "moment";
import Toast from 'react-native-simple-toast';
const AppContext = React.createContext();
import jwt_decode from "jwt-decode";

const AppProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';
    // const apiBaseUrl = 'https://hesabinibiltezapi.azurewebsites.net/api';

    const [loginState, changeLoginState] = useState(false);
    const [userId, setUserId] = useState('');
    const [accountList, setAccountList] = React.useState([]);
    const [accountMembers, setAccountMembers] = React.useState([]);
    const [iban, setIban] = React.useState([]);
    const [bills, setBills] = React.useState([]);

    //modallar gidebilir
    const [modalJoin, setModalJoin] = React.useState({ modalVisible: false });
    const [modalInvitation, setModalInvitation] = React.useState({ modalVisible: false, modalMessage: '' });
    const [modalEditAccount, setModalEditAccount] = React.useState({ modalVisible: false, modalValue: '' });
    const [modalAddIban, setModalAddIban] = React.useState({ modalVisible: false });
    const [modalDeleteIban, setModalDeleteIban] = React.useState({ modalVisible: false, ibanId: '' });
    const [modalUpdateIban, setModalUpdateIban] = React.useState({ modalVisible: false, ibanNo: '', ibanId: '' });



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
                console.log(data)
                if (data.token != undefined) {
                    saveToken("token", data); Toast.show("Giriş Başarılı", Toast.LONG);
                }
                else { Toast.show(data.message, Toast.LONG); }
            })
            .catch(error =>
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

                if (data.token != undefined) {
                    saveToken("token", data); Toast.show("Kayıt Başarılı", Toast.LONG)
                }
                else { Toast.show(data.message, Toast.LONG); }
            })
            .catch(error =>
                Toast.show('Kayıt başarısız, tekrar deneyiniz!', Toast.LONG));
    }

    const deleteUserAccount = async () => {
        console.log("delete account")
    }
    const createAccount = async (data) => {
        var result = JSON.parse(await getToken());
        model = {
            "olusturanKullaniciID": parseInt(userId),
            "hesapAd": data.hesapAd,
            "hesapTurID": data.hesapTurID,
            "hesapAktifDurum": data.hesapAktifDurum
        }
        console.log("giden token", data)
        fetch(apiBaseUrl + '/account/AddAccount',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { Toast.show(data.message, Toast.LONG); getAccounts(); getAccounts() })
            .catch(error => { Toast.show('Hesap ekleme sırasında bir hata oluştu !', Toast.LONG) });

    }
    const addIban = (data) => {

        let model = {
            kullaniciID: parseInt(userId),
            ibanNo: data.value
        }
        console.log("giden model", model)
        fetch(apiBaseUrl + '/Iban/AddIban',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { Toast.show(data.message, Toast.LONG); getIban() })
            .catch(error => { Toast.show("Iban ekleme sırasında bir hata oluştu", Toast.LONG); console.log(error.message) });

    }
    const updateIban = (data) => {

        let model = {
            kullaniciID: parseInt(userId),
            ibanNo: data.ibanNo,
            ibanID: data.ibanId

        }
        console.log(model)
        fetch(apiBaseUrl + '/Iban/UpdateIban',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { Toast.show(data.message, Toast.LONG); getIban() })
            .catch(error => { Toast.show("Güncelleme sırasında bir hata oluştu", Toast.LONG); console.log(error.message) });

    }
    const getIban = () => {
        fetch(apiBaseUrl + '/Iban/GetIban/' + userId,
            {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then(response => response.json())
            .then(data => { setIban(data) })

    }

    ///api/Iban/AddIban
    const getAccounts = async () => {
        fetch(apiBaseUrl + '/account/getAccountsByStatus/' + userId + '/true',
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(data => { setAccountList(data) })
        //.catch(error => { console.log("hata", error); })
    }


    const getAccountMembers = (ortakHesapId) => {
        fetch(apiBaseUrl + '/account/getAccountMembers/' + ortakHesapId,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(data => { setAccountMembers(data) })
        // .catch(error => { console.log("hata", error); })

    }

    const addBill = (data) => {
        let model = {
            kullaniciID: parseInt(userId),
            ortakHesapID: data.ortakHesapID,
            alisverisFoto: data.alisverisFoto
        }
        console.log(model)
        fetch(apiBaseUrl + '/Shopping/AddShopping',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { Toast.show(data.message, Toast.LONG); console.log(data) })
            .catch(error => { Toast.show("Bir hata oluştu", Toast.LONG); console.log(error.message) });

    }
    const getBill = (ortakHesapId) => {
        fetch(apiBaseUrl + '/Shopping/getShopping/' + ortakHesapId,
        {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(data => { setBills(data.data) })
    }

    return (
        <AppContext.Provider
            value={{
                loginState, changeLoginState, userId,
                modalJoin, setModalJoin,
                modalInvitation, setModalInvitation,
                modalEditAccount, setModalEditAccount,
                modalDeleteIban, setModalDeleteIban,
                modalAddIban, setModalAddIban,
                modalUpdateIban, setModalUpdateIban,
                handleLogin, handleRegister, handleLogOut, deleteUserAccount,
                createAccount,
                getAccounts, accountList,
                getAccountMembers, accountMembers,
                addIban, updateIban,
                getIban, iban,
                addBill,getBill,bills
                
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }; 