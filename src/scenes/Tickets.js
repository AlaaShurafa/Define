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
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Button, Header2, AddButton, AppText} from '../component';
import * as Colors from '../styles/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {getTickets} from '../store/actions/app';
import {translate} from '../translations/i18n';
import deviceStorage from '../services/deviceStorage';

export default Tickets = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {tickets, loadingTickets} = useSelector(({app}) => ({
    tickets: app.tickets,
    loadingTickets: app.loadingTickets,
  }));
  const getTicketsData = () => dispatch(getTickets());

  useEffect(() => {
    getTicketsData();
  }, [isFocused]);
  // useEffect(() => {
  //   locations && locations.length > 0 && setActiveLoc(locations[0].id);
  // }, []);
console.log(tickets)
  return (
    <View style={styles.viewCont}>
      <StatusBar
        backgroundColor={Colors.White}
        animated={true}
        barStyle={'dark-content'}
      />

      <View style={{paddingHorizontal: '4.5%', flex: 1}}>
        <Header2 title={translate('app.tickets')} />
        {!loadingTickets ? (
          <FlatList
            data={tickets}
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Ticket
                item={item}
                navigation={navigation}
                tickets={tickets}
              />
            )}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <AddButton onPress={() => navigation.navigate('ContactUs')} />
    </View>
  );
};
const Ticket = ({item, navigation, tickets}) => {
  return (
    <TouchableOpacity
      onPress={()=>navigation.navigate('TicketDetails',{item, tickets})}
      style={[
        styles.ticketCont,
      ]}>
      <View>
        <AppText semibold style={{fontSize: 17}}>
          {item?.title}
        </AppText>
        <AppText semibold style={{fontSize: 15}} numberOfLines={1}>
          {item?.message}
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
  ticketCont: {
    marginBottom: 27,
    backgroundColor: Colors.grey_Background_Light,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});
