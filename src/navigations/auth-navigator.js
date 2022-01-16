
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Login from '../scenes/LoginScreen'
import SignUp from '../scenes/SignUpScreen'
import Privacy from '../scenes/Privacy'
import ForgetPassword from '../scenes/ForgetPassword'
import PasswordCode from '../scenes/PasswordCode'
import ResetPassword from '../scenes/ResetPassword'
import Slider from '../scenes/Slider'

import { createNativeStackNavigator  } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator ();

const AuthNavigator =(props)=>{
    return(
            <Stack.Navigator 
            screenOptions={{
              headerShown:false
            }}
              >
                {/* <Stack.Screen name="Slider" component={Slider} /> */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Privacy" component={Privacy} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="PasswordCode" component={PasswordCode} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
    )
}

export default AuthNavigator
