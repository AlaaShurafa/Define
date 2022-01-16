import React from 'react';
import {TouchableOpacity, StyleSheet,View, Image,I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Main_Color, Red, White } from '../styles/Colors';

const BackButton =({style, onPress})=>{
    const navigation = useNavigation();
    return(
        <View style={[styles.cont, style]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={onPress}
                >
                    <Icon name="plus" size={35} color={White}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    cont:{
        // padding:10,
        paddingBottom:0,
        backgroundColor:Main_Color,
        width:55,
        height:55,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:40
    },
})
export default BackButton;