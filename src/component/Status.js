import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { Red, Green, grey, White } from '../styles/Colors'
import { translate } from '../translations/i18n'
import AppText from './AppText'
export default Status = ({style, is_open})=>{
    return (
        <View style={{alignItems:'center'}}>
            <Image source={require('../assets/images/mark.png')}/>
            {
                is_open? <AppText style={styles.markLabel} semibold>{translate('app.open')}</AppText> 
                :<AppText style={[styles.markLabel,{backgroundColor:Red}]} semibold>{translate('app.close')}</AppText>
            }
        </View>
    )
}
const styles = StyleSheet.create({
   
    markLabel:{
        color:White,
        backgroundColor:Green,
        width:50,
        textAlign:'center',
        borderRadius:15,
        fontSize:10,
        paddingVertical:5,
        elevation:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
    },
   
})