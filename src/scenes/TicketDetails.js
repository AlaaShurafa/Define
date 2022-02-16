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
import {Button, Header2, AddButton, AppText, Input} from '../component';
import * as Colors from '../styles/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {getTickets, responseTicket} from '../store/actions/app';
import {translate} from '../translations/i18n';
import Icon from 'react-native-vector-icons/Feather';

export default Tickets = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [ticket, setTicket] = useState();
  const [response, setResponse] = useState();
  const {tickets} = useSelector(({app}) => ({
    tickets: app.tickets,
  }));

  useEffect(() => {
    let ticket = tickets.find((item)=>item.id == route?.params?.item?.id)
    setTicket(ticket);
  }, []);
  const sendResponse = async () => {
    try {
      if(response){
        const res = await dispatch(responseTicket(ticket?.id, response));
        setTicket(res);
      }
      
    } catch (er) {
      null;
    }
  };
  return (
    <View style={styles.viewCont}>
      <StatusBar
        backgroundColor={Colors.White}
        animated={true}
        barStyle={'dark-content'}
      />

      <View style={{paddingHorizontal: '4.5%', flex: 1}}>
        <Header2 title={translate('app.ticketDetails')} />
        <AppText bold style={{fontSize: 25, marginBottom: 10}}>
          {ticket?.title}
        </AppText>
        <Ticket item={ticket} mainMessage />
        <FlatList
          data={ticket?.TicketResponses}
          renderItem={({item}) => <Ticket item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.footer}>
        <Input
          value={response}
          onChangeText={setResponse}
          style={{marginTop: 0}}
          inputStyle={styles.input}
        />
        <TouchableOpacity
          onPress={sendResponse}
          style={{position: 'absolute', right: '7%', top: 4}}>
          <Icon name="send" color={Colors.grey_Skip} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Ticket = ({item, navigation, mainMessage}) => {
  return (
    <View
      style={[
        styles.ticketCont,

        {
          width: '90%',
          alignSelf: item?.sender_type == 2 ? 'flex-end' : 'flex-start',
        },
        item?.sender_type == 2 && {
          backgroundColor: Colors.grey_Background_Light,
        },
      ]}>
      <View>
        {mainMessage && (
          <AppText semibold style={{fontSize: 15}} numberOfLines={1}>
            {item?.message}
          </AppText>
        )}

        {!mainMessage && (
          <AppText semibold style={{fontSize: 15}} numberOfLines={1}>
            {item?.response}
          </AppText>
        )}
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
    // marginVertical:11,
    // backgroundColor:'red'
  },
  ticketCont: {
    marginBottom: 27,
    backgroundColor: Colors.Main_Color,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  input: {
    height: 40,
    fontSize: 12,
    paddingVertical: 0,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: Colors.White,
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.1,
    elevation:4,
    borderWidth: 0,
    paddingRight: 50,
    borderRadius: 20,
    marginBottom: 40,
  },
});
