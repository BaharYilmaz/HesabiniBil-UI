import React, { Component } from 'react';

const AppContext = React.createContext();

class AppProvider extends Component {
    state = {
        loginState: 1
    }

    changeLoginState = (loginState) => {
        this.setState({ loginState })

    }
    render() {
        return (
            <AppContext.Provider
                value={{
                    loginState:this.state.loginState,
                    changeLoginState:this.changeLoginState
                }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export  {AppProvider,AppContext};