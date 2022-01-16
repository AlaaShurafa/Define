import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewHome from './NewHome'
import Profile from './Profile'
import Categories from './Categories'
import Orders from './Orders'
import Cart from './Cart'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors  from '../styles/Colors';
import {translate} from '../translations/i18n'
import { Image } from 'react-native';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown:false,
      tabBarStyle:{
        backgroundColor:Colors.Main_Color,
        height:65
      },
      tabBarShowLabel:false,
      tabBarIcon: ({ focused, color, size }) => {
        let img;
        let width;
        let height;

        if (route.name === 'Home') {
          width = focused ? 30 :25
          height = focused ? 30 : 25
          img = require('../assets/images/home.png')
        } 
        else if (route.name === 'Categories') {
          width = focused ? 26 :23
          height = focused ? 23 : 20
          img =  require('../assets/images/sections.png')
        }
        else if (route.name === 'Profile') {
          width = focused ? 21 : 18
          height = focused ? 30 : 26
          img =  require('../assets/images/profile.png')
        }
        else if (route.name === 'Cart') {
          width = focused ? 33 : 28
          height = focused ? 31 : 26
          img = require('../assets/images/cart.png')
        }
        else if (route.name === 'Order') {
          width = focused ? 26 :21
          height = focused ? 31 : 26
          img =  require('../assets/images/shopping.png')
        }

        // You can return any component that you like here!
        return <Image source={img} style={{width:width,height:height, tintColor:focused ? Colors.Black : Colors.White}}/>;
      },
      })}
      
      lazy={true}
      // tabBarStyle={{
      //   showLabel:false,
      //   activeTintColor: Colors.Main_Color,
      //   inactiveTintColor: Colors.Gray_Menu_Label,
      //   backgroundColor:Colors.Main_Color,
      //   height:80
    
      
      // }}
    
    >
      <Tab.Screen name="Home" component={NewHome} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Order" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
