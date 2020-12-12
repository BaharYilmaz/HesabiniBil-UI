import React, { useState, Component, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import moment, { duration } from "moment";
import Toast from 'react-native-simple-toast';
const AppContext = React.createContext();
import jwt_decode from "jwt-decode";
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { RNToasty } from 'react-native-toasty'

async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;

    //Add the token to the users datastore
    await firestore()
        .collection('users')
        .doc(userId)
        .update({
            tokens: firestore.FieldValue.arrayUnion(token),
        });
}


const AppProvider = (props) => {


    const apiBaseUrl = 'http://10.0.3.2:5001/api';
   // const apiBaseUrl = 'https://hesabinibiltezapi.azurewebsites.net/api';
    //const navigation = useNavigation();
    const [loginState, changeLoginState] = useState(false);
    const [userId, setUserId] = useState('');
    const [accountList, setAccountList] = React.useState([]);
    const [account, setAccount] = React.useState([]);
    const [accountMembers, setAccountMembers] = React.useState([]);
    const [iban, setIban] = React.useState([]);
    const [bills, setBills] = React.useState([]);
    const [notify, setNotify] = React.useState([]);
    const [debt, setDebt] = React.useState([]);

    //modallar gidebilir
    const [modalJoin, setModalJoin] = React.useState({ modalVisible: false });
    const [modalInvitation, setModalInvitation] = React.useState({ modalVisible: false, modalMessage: '' });
    const [modalEditAccount, setModalEditAccount] = React.useState({ modalVisible: false, hesap: [] });
    const [modalAddIban, setModalAddIban] = React.useState({ modalVisible: false });
    const [modalDeleteIban, setModalDeleteIban] = React.useState({ modalVisible: false, ibanId: '' });
    const [modalUpdateIban, setModalUpdateIban] = React.useState({ modalVisible: false, ibanNo: '', ibanId: '' });


    var tokenUserId = '';

    useEffect(() => {
        loggedIn()

        // Get the device token
        messaging()
            .getToken()
            .then(token => {
                console.log("----", token)
                addDeviceToken(token)
                return saveTokenToDatabase(token);
            });

        // If using other push notification providers (ie Amazon SNS, etc)
        // you may need to get the APNs token instead for iOS:
        // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });

    }, [])
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const owner = JSON.parse(remoteMessage.data.owner);
            const user = JSON.parse(remoteMessage.data.user);
            const picture = JSON.parse(remoteMessage.data.picture);

            console.log(`The user "${user.name}" liked your picture "${picture.name}"`);
        });

        return unsubscribe;
    }, []);
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

            if (moment(tokenDate).isAfter(date)) {
                console.log("token geçerli")
                changeLoginState(true)
                setUserId(decoded.nameIdentifier)
                tokenUserId = decoded.nameIdentifier;
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
    const addDeviceToken = (deviceToken) => {

        if (deviceToken != undefined) {
            fetch(apiBaseUrl + '/auth/AddDeviceToken/' + userId + '/' + deviceToken,
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                })
                .then(response => response.json())
                .then(data => {
                    RNToasty.Success({ title: data.message, duration: 1 });
                })
                .catch(error => console.log(error));
        }
    }
    const handleLogin = (data) => {
        fetch(apiBaseUrl + '/auth/login',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.token != undefined) {
                    saveToken("token", data);
                    RNToasty.Success({ title: "Giriş Başarılı", duration: 1 });
                }
                else { RNToasty.Error({ title: data.error, duration: 1 }); }
            })
            .catch(error =>
                RNToasty.Error({ title: 'Bir hata oluştu, tekrar deneyiniz!', duration:1 }));
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
                    saveToken("token", data); RNToasty.Success({ title: "Kayıt Başarılı", duration: 1 })
                }
                else { RNToasty.Error({ title: data.error, duration: 1 }); }
            })
            .catch(error =>
                RNToasty.Error({ title: 'Kayıt başarısız, tekrar deneyiniz!', duration: 1 }));
    }

    const deleteUserAccount = async () => {
        console.log("delete account")
    }
    const createAccount = async (data) => {
        let model = {
            "olusturanKullaniciID": parseInt(userId),
            "hesapAd": data.hesapAd,
            "hesapTurID": data.hesapTurID,
            "hesapAktifDurum": data.hesapAktifDurum
        }
        fetch(apiBaseUrl + '/account/AddAccount',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { RNToasty.Success({ title: data.message, duration: 1 }); getAccounts(); })
            .catch(error => { RNToasty.Error({ title: 'Hesap ekleme sırasında bir hata oluştu !', duration: 1 }) });

    }
    //SignInToAccount
    const signInToAccount = async (data) => {
        let model = {
            kullaniciID:parseInt(userId),
            hesapKodu:data
        }
        fetch(apiBaseUrl + '/account/signInToAccount',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { RNToasty.Success({ title: data.message, duration: 1 });console.log(data); getAccounts(); })
            .catch(error => { RNToasty.Error({ title: 'Hesaba katılma başarısız !', duration: 1 }) });

    }
    const updateAccount = (model) => {
        var id = model.ortakHesapID;
        fetch(apiBaseUrl + '/account/UpdateAccount',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => {
                RNToasty.Success({ title: data.message, duration: 1 }); getAccountByID(id); getAccounts();
            })
            .catch(error => { RNToasty.Error({ title: 'Hesap adı değiştirme sırasında bir hata oluştu !', duration: 1 }) });

    }
    const leaveAccount = (model) => {
        var id = model.ortakHesapID;
        fetch(apiBaseUrl + '/account/leaveAccount/' + model.kullaniciId + '/' + model.hesapId,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            })
            .then(response => response.json())
            .then(data => {
                RNToasty.Success({ title: data.message, duration: 1 }); getAccountByID(id); getAccounts();
            })
            .catch(error => { RNToasty.Error({ title: 'Hesaptan ayrılma sırasında bir hata oluştu !', duration: 1 }) });

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
            .then(data => { RNToasty.Success({ title: data.message, duration: 1 }); getIban() })
            .catch(error => { RNToasty.Error({ title: "Iban ekleme sırasında bir hata oluştu", duration: 1 }); console.log(error.message) });

    }
    const updateIban = (data) => {

        let model = {
            kullaniciID: parseInt(userId),
            ibanNo: data.ibanNo,
            ibanID: data.ibanId
        }
        fetch(apiBaseUrl + '/Iban/UpdateIban',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { RNToasty.Success({ title: data.message, duration: 1 }); getIban() })
            .catch(error => { RNToasty.Error({ title: "Güncelleme sırasında bir hata oluştu", duration: 1 }); console.log(error.message) });

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

    const deleteIban = (id) => {
        let model = {
            kullaniciID: parseInt(userId),
            ibanID: id
        }
        console.log(model)
        fetch(apiBaseUrl + '/Iban/DeleteIban',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { RNToasty.Success({ title: data.message, duration: 1 }); getIban() })
            .catch(error => { RNToasty.Error({ title: "Silme sırasında bir hata oluştu", duration: 1 }); console.log(error.message) });

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
    }
    const getAccountByID = (ortakHesapId) => {
        fetch(apiBaseUrl + '/account/getAccountByID/' + ortakHesapId,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(data => { setAccount(data) })
    }
    const addBill = (data) => {
        let model = {
            kullaniciID: parseInt(userId),
            ortakHesapID: data.ortakHesapID,
            alisverisFoto: data.alisverisFoto,
            alisverisFisDetay: data.alisverisFisDetay
        }
        var id = data.ortakHesapID
        fetch(apiBaseUrl + '/Shopping/AddShopping',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then(data => { RNToasty.Success({ title: data.message, duration: 1 }); getBill(id) })
            .catch(error => { RNToasty.Error({ title: "Fiş kaydetme sırasında bir hata oluştu", duration: 1 }); console.log(error.message) });

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
    const getNotifications = () => {
        fetch(apiBaseUrl + '/Notification/getNotification/' + 2,
            {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then(response => response.json())
            .then(data => { setNotify(data) })

    }
    const getAllDebt = () => {
        fetch(apiBaseUrl + '/Debt/GetAllDebt/' + userId,
            {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then(response => response.json())
            .then(data => { setDebt(data) })

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
                createAccount, updateAccount, leaveAccount,signInToAccount,
                getAccounts, accountList,
                getAccountByID, account, setAccount,
                getAccountMembers, accountMembers,
                addIban, updateIban, deleteIban, getIban, iban,
                addBill, getBill, bills,
                getNotifications, notify,
                getAllDebt,debt,

            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }; 