import React, { useState, Component, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';

    const [loginState, changeLoginState] = useState(1);
    const [isModalVisible, setModalVisible] = React.useState(false);



    console.log(loginState)
    // state = {
    //     loginState: 1
    // }

    // changeLoginState = (loginState) => {
    //     this.setState({ loginState })

    // }

    // useEffect(async () => {
    //     const result = await fetch('')
    //     const data = await result.json()

    // })

    const handleLogin = (data) => {
        console.log(data)
        fetch(apiBaseUrl + '/auth/login',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(token => {
                if (token != null) { changeLoginState(1) }
            })
            .catch(error => console.log(error));

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
            .then(token => {
                if (token != null) { changeLoginState(1) }
            })
            .catch(error => console.log(error));
    }
    const deleteUserAccount = () => {
        console.log("delete account")
    }
    const createAccount = (data) => {
        console.log(data)
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
            }}>
            {props.children}
        </AppContext.Provider>
    )

}

export { AppProvider, AppContext }; 3