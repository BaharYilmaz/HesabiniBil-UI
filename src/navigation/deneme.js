const HomeScreenRouter = createDrawerNavigator(
    {
      Home: { screen: HomeScreen }
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  );
  
  
  const AuthStack = createStackNavigator({ SignIn: SignInScreen });
  
  export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: HomeScreenRouter,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));