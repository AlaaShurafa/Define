import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SplashScreen from '../scenes/Splash';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import { navigationRef } from './RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
const App = props => {
	if (props.isLoading) {
	  return <SplashScreen />;
	}
  
	return <NavigationContainer ref={navigationRef}>
		{/* <AppNavigator /> */}
		{props.isLoggedIn ? <AppNavigator /> : <AuthNavigator /> }
	</NavigationContainer>
  };
  const mapStateToProps = ({auth}) =>{
	  return {
		  isLoggedIn: auth.isLoggedIn,
		  isLoading: auth.isLoading,
		  user : auth.user
	  }
  }
  export default connect(mapStateToProps,null)(App);
