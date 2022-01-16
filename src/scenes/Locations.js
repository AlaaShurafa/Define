import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Button, Header2, AddButton, AppText} from '../component';
import * as Colors from '../styles/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {getLocations, storeOrder, hasPayment} from '../store/actions/app';
import {translate} from '../translations/i18n';
import deviceStorage from '../services/deviceStorage';

export default Locations = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [activeLoc, setActiveLoc] = useState(null);
  const [lng, setLng] = useState('');
  const {locations, loadingLocation} = useSelector(({app}) => ({
    locations: app.locations,
    loadingLocation: app.loadingLocation,
  }));
  const getLocationsData = () => dispatch(getLocations());
  const storeCartOrder = (cart, address,lat, lng) => dispatch(storeOrder(cart, address,lat, lng));

  useEffect(() => {
    getLocationsData();
  }, [isFocused]);
  useEffect(() => {
    locations && locations.length > 0 && setActiveLoc(locations[0].id);
  }, []);

  const confirmOrder = async () => {
    if (activeLoc) {
      let cartData = await deviceStorage.getItem('cart');
      cartData = JSON.parse(cartData);
      console.log(cartData, 'cartData');
      if (cartData) {
        let cart = cartData.cart;
        let products = [];
        let foodPromise = new Promise((resolve, reject) => {
          cart.forEach((item, index, array) => {
            products.push({
              product_id: item?.id,
              quantity: item?.quantity,
              color: item.color,
              option: item.option,
              delivery_shopping_id: item?.delivery,
            });
            if (index === array.length - 1) resolve();
          });
        });
        foodPromise.then(async () => {
          const address = locations.find(item => item.id === activeLoc)
          await dispatch(hasPayment())
          // await storeCartOrder(products, address.address, address.lat, address.lng);
        });
      }
    } else {
      Alert.alert(translate('app.select_location'), null, [
        {text: 'OK', onPress: () => null},
      ]);
    }
  };
  return (
    <View style={styles.viewCont}>
      <View style={{paddingHorizontal: '4.5%', flex: 1}}>
        <Header2 title={translate('app.locations')} />
        {!loadingLocation ? (
          <FlatList
            data={locations}
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Location
                item={item}
                active={item.id == activeLoc}
                onPress={() => setActiveLoc(item.id)}
              />
            )}
          />
        ) : (
          <ActivityIndicator color={Colors.Main_Color}/>
        )}
      </View>
      <AddButton onPress={() => navigation.navigate('AddLocation')} />
      <Button
        onPress={confirmOrder}
        buttonStyle={{width: '90%', marginBottom: 20}}>
        {translate('app.confirm_order')}
      </Button>
    </View>
  );
};
const Location = ({item, active, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.locationCont,
        active && {borderWidth: 1, borderColor: Colors.Main_Color},
      ]}>
      <View>
        <AppText semibold style={{fontSize: 17}}>
          {item?.address}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewCont: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical:11,
    // backgroundColor:'red'
  },
  locationCont: {
    marginBottom: 27,
    backgroundColor: Colors.grey_Background_Light,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});
