import React from 'react';
import {TouchableOpacity, StyleSheet,View} from 'react-native';
import AppText from './AppText';
import * as Colors from '../styles/Colors'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
const Button =(props)=>{
    return(
        <View style={[styles.cont,props.style]}>
            <TouchableOpacity
                disabled={props.disabled} 
                onPress={props.onPress}
                style={[
                        styles.button,
                        props.outline && styles.button_outline,
                        props.buttonStyle
                    ]}>

                    <Icon 
                        name="my-location"
                        size={17}
                        color={Colors.Gray_Light}
                    />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    cont:{
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:Colors.grey_Background_Light,
        width:40,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        elevation:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    button_outline:{
        backgroundColor:'transparent',
    }
})
export default Button;