import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import AppNavigator from './src/navigations';
import {Toast} from 'react-native-redux-toast';
import Font from './src/styles/Fonts';
import {LogBox} from 'react-native';
import {Red_Error, Green} from './src/styles/Colors';
import {setI18nConfig} from './src/translations/i18n';
import {CardForm, Loader} from './src/component';
import {StripeProvider} from '@stripe/stripe-react-native';

let store = configureStore();
const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    setI18nConfig();
    // requestUserPermission()
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log(remoteMessage.data , 'remoteMessage')
    //   console.log(remoteMessage , 'remoteMessage')
    //   Alert.alert(
    //     remoteMessage.notification.title,
    //     remoteMessage.notification.body,
    //   );
    // });

    // return unsubscribe;

  }, []);
  return (
    <StripeProvider
      publishableKey="pk_test_51JhCQtBCB6oJqS7JLfh0SC9g6v1Jnd0WIXCSx56vlWO78yQ9V4ieGBwbk4p6I2tu7Ncd4PxS7WpWXnyykVtbi6dR00JiJjeVxD"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Provider store={store}>
        <Toast
          position="top"
          positionValue={70}
          messageStyle={{
            color: 'white',
            fontSize: 18,
            fontFamily: Font.RegularFont,
            ...Platform.select({
              ios: {
                fontWeight: Font.fontWeightSemi,
              },
            }),
          }}
          useNativeDriver={false}
          containerStyle={{backgroundColor: Green, zIndex: 999}}
          errorStyle={{backgroundColor: Red_Error, zIndex: 999}}
        />
        <Loader />
        <AppNavigator />
        <CardForm />
      </Provider>
    </StripeProvider>
  );
};

export default App;
