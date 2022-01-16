import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Black, Green, grey, White } from '../styles/Colors'
import AppText from './AppText'
import { Main_Color, grey_Background_Light } from '../styles/Colors';
import { readNotification } from '../store/actions/app'

export default Item = ({style,item})=>{
    const dispatch = useDispatch();
    const readNotificationButton = (id) => dispatch(readNotification(id))
    return (
    <TouchableOpacity 
        activeOpacity={!item?.read_at ? 0.5 : 1}
        onPress={!item?.read_at ? ()=>readNotificationButton(item?.id) : null}
        style={[styles.rowView,styles.rowCont,style]}>
        <View style={{flexDirection:'row'}}>
            {/* <Image source={require('../assets/images/sandClock.png')} style={styles.img}/> */}
            <View style={{justifyContent:'space-between',paddingVertical:10,alignItems:'flex-start',flexShrink: 1}}>
                <View style={[styles.rowView,{marginBottom:5,alignItems:'flex-start'}]}>
                    <AppText style={styles.title} semibold>{item?.title}</AppText>
                    <AppText style={styles.time} semibold>{item?.created_at}</AppText>
                </View>
                <AppText style={styles.grey} semibold numberOfLines={2}>{item?.message}</AppText>
            </View>
        </View>
        {
            !item?.read_at && <View style={styles.readCard}/>
        }
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    rowCont:{
        marginBottom:27,
        backgroundColor:grey_Background_Light,
        borderRadius:14,
        paddingHorizontal:14,
        paddingVertical:7,
    },
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
    title:{
        fontSize:15,
        color:Black
    },
    grey:{
        fontSize:14,
        color:grey,
        lineHeight:16
    },
    time:{
        color:Green,
        fontSize:11
    },
    img:{
        alignSelf:'center',
        marginRight:14
    },
    readCard:{
        width:16,
        height:16,
        backgroundColor:Main_Color,
        borderRadius:16,
        position:'absolute',
        top:-5,
        right:-5,
        elevation:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
    }
    
})