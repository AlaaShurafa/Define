import React from 'react';
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { WebView } from 'react-native-webview';
import { storeOrder } from '../store/actions/app'
export default WebViewCard = ({ route, navigation }) =>{
    const dispatch = useDispatch();
    const storeCartOrder = (cart) => dispatch(storeOrder(cart))
    const { uri, cart } = route.params
    return (
        <WebView 
                style={{}}  // some style as u like
                source={{ uri }}
                startInLoadingState
                javaScriptEnabledAndroid={true}
                javaScriptEnabled={true}
                onMessage={async  message => {
                    console.log(navigation , 'message')
                    if (message.nativeEvent.data === 'Success') {
                        storeCartOrder(cart)
                        
                    } else {
                        Alert.alert(
                            "Alert",
                            "Something went wrong!",
                            [
                              { text: "Continue", onPress: () => navigation.navigate('Main',{screen:'Cart'}) }
                            ],
                            { cancelable: false })
                    }
                }}
            />
    )
}