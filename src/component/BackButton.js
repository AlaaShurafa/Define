import React from 'react';
import {TouchableOpacity, StyleSheet,View, Image,I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Main_Color, Red, White } from '../styles/Colors';

const BackButton =(props)=>{
    const navigation = useNavigation();
    return(
        <View style={[styles.cont,props.style]}>
            <TouchableOpacity 
                style={[styles.button,props.btnStyle]}
                onPress={()=>navigation.goBack()}
                >
                    {/* <Icon name={I18nManager.isRTL? "chevron-left" : "chevron-right"} size={35} color={White} style={{backgroundColor:'pink'}} /> */}
                <Image source={require('../assets/images/back.png')} style={[ {width:10, height:18, tintColor: props.tintColor ?? White} , I18nManager.isRTL &&{ transform: [{ rotate: '180deg' }] } ]}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    cont:{
        // padding:10,
        paddingBottom:0,
    },
    button:{
        width:25,height:25,
        justifyContent:'center',
        alignItems:'flex-end',
    }
})
export default BackButton;