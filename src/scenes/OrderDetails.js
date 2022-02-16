import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Dash from 'react-native-dash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BackButton,
  AppText,
  HeaderText,
  FavoriteItem,
  OrderStatus,
  Button,
  Header2,
} from '../component';
import {updateOrder, startOrderDelivery} from '../store/actions/app';
import * as Colors from '../styles/Colors';
import {translate} from '../translations/i18n';
import {url} from '../services/config';

export default OrderDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(undefined);
  const [watchID, setWatchID] = useState(undefined);
  const [orderActive, setOrderActive] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemStatus, setItemStatus] = useState(0);
  const {type} = useSelector(({auth}) => ({
    type: auth.user?.type,
  }));
  const _updateOrder = (order_id, status) =>
    dispatch(updateOrder(order_id, status));

  const _startOrderDelivery = (order_id, lat, lng) =>
    dispatch(startOrderDelivery(order_id, lat, lng));

  const _setTotal = order => {
    let totalValue = 0;
    order.OrderProducts.map(item => {
      totalValue = totalValue + item.price;
    });
    return totalValue;
  };
  useEffect(() => {
    const {item} = route.params;
    setItem(item);
    setItemStatus(item?.status);
    const totalValue = _setTotal(item);
    trackOrderFunc();
    console.warn(item?.id, 'itttteee');
    setTotal(totalValue);
  }, [item]);
  const updateOrderButton = async status => {
    const {item} = route.params;
    await setOrderActive(true);
    await _updateOrder(item?.id, status);
    setItemStatus(status);
  };
  const orderDelivery = async (id, latitude, longitude, watchID) => {
    setWatchID(watchID);
    await _startOrderDelivery(id, latitude, longitude);
  };

  const startOrderDeliveryButton = async () => {
    setOrderActive(true);
    await updateOrderButton(5);
    const {item} = route.params;
    let id;
  };
  const endOrderButton = async () => {
    const {item} = route.params;
    await updateOrderButton(6);
    // endOrder(item?.id)
  };
  const trackOrderFunc = async () => {
    // const { item } = route.params
    // let order = await trackOrder(item?.id)
    // order.onSnapshot(querySnapshot =>{
    //     querySnapshot.data() && setOrderActive(querySnapshot.data().active)
    // })
  };
  console.log(item, 'item item item item');
  return (
    <View style={styles.viewCont}>
      <StatusBar
        backgroundColor={Colors.White}
        animated={true}
        barStyle={'dark-content'}
      />
      <View style={{paddingHorizontal: '4.5%', flex: 1}}>
        <Header2 title={translate('app.orderDetails')} />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={{flex: 1}}>
            {/* <View style={[styles.img,!item?.Provider?.avatar && {backgroundColor:Colors.Main_Color}]}> */}
            <Image
              source={require('../assets/images/logo.png')}
              style={[styles.img, {marginTop: 0, tintColor: Colors.Main_Color}]}
            />
            {/* </View> */}
            <AppText semibold style={styles.name}>
              {item?.Provider?.name}
            </AppText>
            {item?.OrderProducts.map((item, index) => {
              return <FavoriteItem key={index} item={item} orderDetails />;
            })}
            {/* <FlatList
              data={item?.OrderProducts}
              style={{flex: 1}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return <FavoriteItem item={item} orderDetails />;
              }}
            /> */}
          </View>
          {type === 2 && (
            <View style={styles.boxView}>
              <View style={[styles.rowView]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="account" color={Colors.Main_Color} size={18} />
                  <AppText style={styles.text} semibold>
                    {item?.User.name}
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="map-marker" color={Colors.Main_Color} size={18} />
                  <AppText style={styles.text} semibold>
                    {item?.address}
                  </AppText>
                </View>
              </View>
              <View style={[styles.rowView, {marginTop: 10}]}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${item?.User?.mobile}`)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="cellphone-iphone"
                    color={Colors.Main_Color}
                    size={18}
                  />
                  <AppText style={styles.text} semibold>
                    {item?.User?.mobile}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MapLocation', {
                      lng: item?.lng,
                      lat: item?.lat,
                      itemStatus: itemStatus,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="pin" color={Colors.Main_Color} size={18} />
                  <AppText style={styles.text} semibold>
                    {translate('app.order_details')}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {item?.OrderStatuses.map((item, index) => {
            return (
              <View>
                <View
                  style={[
                    styles.rowView,
                    {marginVertical: 0, justifyContent: 'flex-start'},
                  ]}>
                  <Icon
                    name="check-circle"
                    size={20}
                    color={Colors.Main_Color}
                  />
                  <AppText
                    semibold
                    style={{
                      fontSize: 19,
                      color: Colors.Main_Color,
                      paddingHorizontal: 3,
                    }}>
                    {item?.status_str}
                  </AppText>
                </View>
                <AppText semibold style={{marginLeft: 22}}>
                  {item?.created_at?.split('T')[0]}
                </AppText>
              </View>
            );
          })}
          {/* <FlatList
            data={item?.OrderStatuses}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <View
                    style={[
                      styles.rowView,
                      {marginVertical: 0, justifyContent: 'flex-start'},
                    ]}>
                    <Icon
                      name="check-circle"
                      size={20}
                      color={Colors.Main_Color}
                    />
                    <AppText
                      semibold
                      style={{
                        fontSize: 19,
                        color: Colors.Main_Color,
                        paddingHorizontal: 3,
                      }}>
                      {item?.status_str}
                    </AppText>
                  </View>
                  <AppText semibold style={{marginLeft: 22}}>
                    {item?.created_at?.split('T')[0]}
                    </AppText>
                </View>
              );
            }}
          /> */}
          <View style={{}}>
            <Dash
              style={{width: '100%', height: 1}}
              dashColor={'#A3A3A3'}
              dashGap={5}
              dashLength={5}
              dashThickness={1}
            />
            {/* <View style={styles.total}>
              <AppText bold style={{color: Colors.Black, fontSize: 16}}>
                {translate('app.product_cost')}
              </AppText>
              <AppText bold style={{color: Colors.Black, fontSize: 16}}>{`${
                item?.balance
              }${translate('app.currency')}`}</AppText>
            </View> */}
            {/* <View style={styles.total}>
              <AppText bold style={{color: Colors.Black, fontSize: 16}}>
                {translate('app.product_tax')}
              </AppText>
              <AppText bold style={{color: Colors.Black, fontSize: 16}}>
                0
              </AppText>
            </View> */}
            <View style={styles.total}>
              <AppText bold style={{color: Colors.Main_Color, fontSize: 20}}>
                {translate('app.total')}
              </AppText>
              <AppText
                bold
                style={{color: Colors.Main_Color, fontSize: 20}}>{`${
                item?.amount
              }${translate('app.currency')}`}</AppText>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            {itemStatus === 1 ? (
              <View style={styles.btnCont}>
                <TouchableOpacity
                  onPress={() => updateOrderButton(4)}
                  style={[styles.btn, styles.rejectButton]}>
                  <AppText
                    semibold
                    style={[styles.btnText, {color: Colors.Red}]}>
                    {translate('app.cancel_order')}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL(url + 'stripe/' + item?.id)}
                  style={[styles.btn, styles.payButton, {marginLeft: 10}]}>
                  <AppText
                    semibold
                    style={[styles.btnText, {color: Colors.White}]}>
                    {translate('app.pay')}
                  </AppText>
                </TouchableOpacity>
              </View>
            ) : (
              <OrderStatus
                backgroundColor={Colors.grey_Background_Light}
                color={Colors.Main_Color}
                text={itemStatus == 4 ? translate('app.order_4'): item?.status_str}
                style={{marginBottom: 15}}
                shipmentNumber={item?.shipment_number}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
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
    width: '100%',
  },
  header: {
    alignSelf: 'center',
  },
  img: {
    width: 120,
    height: 77,
    resizeMode: 'contain',
    borderRadius: 17,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  name: {
    color: Colors.Black,
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 17,
  },
  total: {
    flexDirection: 'row',
    // marginBottom:10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 20,
  },
  btnText: {
    color: Colors.White,
    fontSize: 19,
    paddingHorizontal: 11,
  },
  btnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  acceptButton: {
    backgroundColor: Colors.Green,
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: Colors.Red,
  },
  boxView: {
    marginTop: 22,
    backgroundColor: Colors.White,
    elevation: 5,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 37,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    fontSize: 15,
    color: Colors.Black,
  },
  payButton: {
    backgroundColor: Colors.Main_Color,
  },
});
