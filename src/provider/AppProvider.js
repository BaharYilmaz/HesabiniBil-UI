import React, { useState, Component, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = (props) => {

    const apiBaseUrl = 'http://localhost:5001';
    const [loginState, changeLoginState] = useState(1);
    const [loginData, setLoginData] = React.useState({
        username: '',
        password: '',

    });

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
    let data={
        email: 'bak',
        password: 'kfhkla'
    }
    const handleLogin = () => {

        console.log("login")
        fetch('http://10.0.2.2:5001/api/auth/login',
            {

                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .catch(error => console.log(error));
    }       

    return (
        <AppContext.Provider
            value={{
                loginState,
                changeLoginState,
                loginData,
                setLoginData,
                handleLogin
            }}>
            {props.children}
        </AppContext.Provider>
    )

}

export { AppProvider, AppContext };3