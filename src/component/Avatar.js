import React,{useState} from 'react';
import {Image,StyleSheet,View} from 'react-native';
import * as Colors  from '../styles/Colors';

const Avatar = (props) => {
    
    return ( 
        <View style={[styles.cont,props.style]}>
            <Image 
                style={styles.avatar}
                source={{uri:props.photo } } />
        </View>
    )
}
export default Avatar;

const styles = StyleSheet.create({
    cont:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:Colors.Gray_Border,
        borderWidth:1,
        width:100,
        height:100,
        borderRadius:100,

    },
    avatar:{
        width:'92%',
        height:'92%',
        resizeMode:'cover',
        borderRadius:90,
    }
})