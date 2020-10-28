import React, { useState, Component, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';

    const [loginState, changeLoginState] = useState(0);
    const [loginData, setLoginData] = React.useState({email: '', password: ''});
    const [registerData, setRegisterData] = React.useState({email: '', password: '',firstName:'',lastName:''});

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
  
    const handleLogin = () => {
        console.log("login")
        fetch(apiBaseUrl + '/auth/login',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(loginData)
            })
            .then(response =>response.json())
            .then(token =>{
                if(token!=null)
                {
                    changeLoginState(1)
                }
              
             })
            .catch(error => console.log(error));

        // fetch('http://10.0.3.2:5001/api/auth/deneme')
        //     .then((response) => response.json())
        //     .then((json) => {
        //         console.log('başarılı');
        //     })
        //     .catch((error) => console.error(error))

    }
    const handleRegister = () => {
        console.log(registerData)

        fetch(apiBaseUrl + '/auth/register',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(registerData)
            })
            .then(response =>response.json())
            .then(token =>{
                if(token!=null)
                {
                    changeLoginState(1)
                }
              
             })
            .catch(error => console.log(error));

    }

    return (
        <AppContext.Provider
            value={{
                loginState,
                changeLoginState,
                loginData,
                setLoginData,
                handleLogin,
                registerData,
                setRegisterData,
                handleRegister
            }}>
            {props.children}
        </AppContext.Provider>
    )

}

export { AppProvider, AppContext }; 3