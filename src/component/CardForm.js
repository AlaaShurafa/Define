import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
// import { CreditCardInput } from "react-native-credit-card-input";
import Button from '../component/Button';
import * as Colors from '../styles/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {addPayment, cancelPayment} from '../store/actions/app';
import AppText from './AppText';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import { translate } from '../translations/i18n';
// import stripe from 'tipsi-stripe';

export default CardForm = props => {
  // const token = await stripe.tokens.create({
  //   card: {
  //     number: '4242424242424242',
  //     exp_month: 1,
  //     exp_year: 2023,
  //     cvc: '314',
  //   },
  // });
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState(false);
  const dispatch = useDispatch();
  const {loadingAddPayment, showCard} = useSelector(({auth, app}) => ({
    user: auth.user,
    showCard: app.showCard,
    loadingAddPayment: app.loadingAddPayment,
    // showCard: true,
  }));
  const {createToken} = useStripe();

  // const makePaymentAction = async (card, user, amount) =>
  //   dispatch(makePayment(card, user, amount));
  const makePayment = async () => {
    // console.log(cardDetails , 'cardDetails')
    setLoading(true);
    // const token = await stripe.createTokenWithCard({
    //   // type:'Card',
    //   ...cardDetails,
    //  number: '4242424242424242',
    //  expMonth:cardDetails.expiryMonth,
    //  expYear:cardDetails.expiryYear,
    // //  cvc:cardDetails.postalCode,
    //   // last4:4242,

    // })
    // console.log(token , 'token')
    const token = await createToken({
      type: 'Card',
      // ...cardDetails
    });
    dispatch(addPayment(token.id));
    console.log(token);
    setLoading(false)
  };
  useEffect(() => {
    
    return () => {
      setCardDetails(false)
    }
  }, [])
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCard}
      onRequestClose={props.onRequestClose}>
      <View style={[styles.modal, {justifyContent: 'center'}]}>
        <View
          style={[
            styles.modalContainer,
            {borderRadius: 10, paddingBottom: 20},
          ]}>
          {/* <View > */}
          <CardField
            placeholderColor="red"
            postalCodeEnabled={true}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            textColor="black"
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderWidth: 1,
              borderColor: Colors.grey_Border,
              placeholderColor: Colors.grey_Border,
              // borderRadius: 5,
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
          {/* </View> */}

          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              marginTop: 30,
            }}>
            <View style={{flex: 1}}>
              <Button
                // onPress={() => form && props.onConfirm(form)}
                onPress={makePayment}
                disabled={!cardDetails.complete}
                activity
                buttonStyle={styles.button}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <AppText
                    style={[
                      {color: Colors.White, fontSize: 22},
                    ]}
                    semibold>
                    {translate('app.confirm')}
                  </AppText>
                )}
              </Button>
            </View>
            <View style={{flex: 1, marginLeft: 16}}>
              <Button
                outline
                onPress={() => dispatch(cancelPayment())}
                buttonStyle={styles.button}>
                {translate('app.cancel')}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,.7)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.White,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '95%',
    paddingTop: 40,
  },
  button: {
    height: 50,
  },
});
