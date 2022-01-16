
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../scenes/ChangePassword'
import Privacy from '../scenes/Privacy'
import ContactUs from '../scenes/ContactUs'
import About from '../scenes/About'
import Favorites from '../scenes/Favorites'
import OrderDetails from '../scenes/OrderDetails'
import ItemDetails from '../scenes/ItemDetails'
import Products from '../scenes/Products'
import Notifications from '../scenes/Notifications'
import SearchProduct from '../scenes/SearchProduct'
// import AllOrderMap from '../scenes/AllOrderMap'
import Language from '../scenes/Language'
import NewProducts from '../scenes/NewProducts'
import NewCategories from '../scenes/NewCategories'
import AddLocation from '../scenes/AddLocation'
import Drawer from './drawer-navigator'
import Cart from '../scenes/Cart';
import Locations from '../scenes/Locations';
import TicketDetails from '../scenes/TicketDetails';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown:false
      }} >
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Main" component={Drawer} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="NewProducts" component={NewProducts} />
        <Stack.Screen name="NewCategories" component={NewCategories} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="Locations" component={Locations} />
        <Stack.Screen name="TicketDetails" component={TicketDetails} />
        {/* <Stack.Screen name="MapLocation" component={MapLocation} /> */}
      </Stack.Navigator>
  )
}

export default MainNavigator
