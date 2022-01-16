import React from 'react';
import {TouchableOpacity, StyleSheet,View} from 'react-native';
import AppText from './AppText';
import * as Colors from '../styles/Colors'
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

                    {props.activity ? props.children : 
                        <AppText 
                            style={[
                                {color:Colors.White,fontSize:22},
                                props.outline && {color:Colors.Main_Color},
                                props.textButton
                            ]}
                            semibold>{props.children}</AppText>
                    }
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
        backgroundColor:Colors.Main_Color,
        width:'90%',
        height:65,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:Colors.Main_Color
    },
    button_outline:{
        backgroundColor:'transparent',
    }
})
export default Button;