import React, { useState, Component, useEffect } from 'react';
const AuthContext = React.createContext();

const AuthProvider = (props) => {

    const apiBaseUrl = 'http://10.0.3.2:5001/api';

    const [loginState, changeLoginState] = useState(1);
    console.log(loginState)


    // const handleLogin = (data) => {
    //     console.log(data)
    //     fetch(apiBaseUrl + '/auth/login',
    //         {
    //             method: 'POST',
    //             headers: { 'Content-type': 'application/json' },
    //             body: JSON.stringify(data)
    //         })
    //         .then(response => response.json())
    //         .then(token => {
    //             if (token != null) {
    //                 setToken(token)
    //                 changeLoginState(1)
    //             }
    //         })
    //         .catch(error => console.log(error));

    // }
    const handleLogin = (data) => {
        // Get a token from api server using the fetch api
        return fetch(apiBaseUrl + '/auth/login', {
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => {
            setToken(res.token); // Setting the token in localStorage
            return Promise.resolve(res);
        });
    };
    const loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = getToken(); // Getting token from localstorage
        return !!token && !isTokenExpired(token); // handwaiving here
    };

    const isTokenExpired = token => {
        // try {
        //     const decoded = jwt_decode(token);
        //     if (decoded.exp < Date.now() / 1000) {
        //         // Checking if token is expired.
        //         return true;
        //     } else return false;
        // } catch (err) {
        //     console.log("expired check failed! Line 42: AuthService.js");
        //     return false;
        // }
    };

    const setToken = (idToken) => {
        localStorage.setItem("id_token", idToken);
    };

    const getToken = () => {
        return localStorage.getItem("id_token");
    };
    const logout = () => {
        localStorage.removeItem("id_token");
    };

    const getConfirm = () => {
        let answer = decode(getToken());
        console.log("Recieved answer!");
        return answer;
    };

    const fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };

        if (loggedIn()) {
            headers["Authorization"] = "Bearer " + getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(_checkStatus)
            .then(response => response.json());
    };

    const _checkStatus = response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            // Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };
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

    return (
        <AuthContext.Provider
            value={{
                loginState, changeLoginState,
                handleLogin,
                handleRegister,
                isModalVisible, setModalVisible,
                createAccount,
                deleteUserAccount,
            }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthProvider, AuthContext }; 