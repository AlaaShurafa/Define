import React from 'react'
import { I18nManager , useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../scenes/Main'
import { useSelector } from 'react-redux'
import CustomDrawerContent from '../component/CustomDrawerContent'
import { translate } from '../translations/i18n';
import Orders from '../scenes/Orders';
import Products from '../scenes/Products';
import Cart from '../scenes/Cart';
import Profile from '../scenes/Profile';
import NewHome from '../scenes/NewHome';
import NewCategories from '../scenes/NewCategories';
import Points from '../scenes/Points';
import Tickets from '../scenes/Tickets';
const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const { user } = useSelector(({ auth }) => ({
    user : auth.user,
}))

  return (
    <Drawer.Navigator
      drawerPosition={I18nManager.isRTL ? 'right' : 'left'}
      drawerType={'front'}
      overlayColor="rgba(0,0,0,0.56)"
      // hideStatusBar={true}
      // statusBarAnimation={true}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown:false}}
    
    >
      <Drawer.Screen
        name="NewHome"
        component={NewHome}
      />
      <Drawer.Screen
        name="NewCategories"
        component={NewCategories}
      />
      {user?.type == 1 && <Drawer.Screen
        name="Feed"
        component={Main}
        options={{ drawerLabel: 'Home' }}
      />}
      {user?.type == 2 && <Drawer.Screen
        name="Feed"
        component={Orders}
        options={{ drawerLabel: 'Home' }}
      />}
      <Drawer.Screen
        name="Products"
        component={Products}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        name="Points"
        component={Points}
      />
      <Drawer.Screen
        name="Tickets"
        component={Tickets}
      />
    </Drawer.Navigator>
  );
}