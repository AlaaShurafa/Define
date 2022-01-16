import React from 'react';
import { StyleSheet,View, Image, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import BackButton from './BackButton'
import {HeaderText} from './OrderText'
import * as Colors from '../styles/Colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
export default Header =({ title, backgroundColor=true, backBtn = false, style })=>{
    const navigation = useNavigation()
    const { user } = useSelector(({ auth }) => ({
        user: auth.user,
    }))
    return(
        // <View style={[styles.cont,props.style]}>
        //     <BackButton />
        //     <AppText bold style={styles.headerTitle}>{props.title}</AppText>
        // </View>
        <View style={[styles.cont,backgroundColor && {backgroundColor:Colors.Main_Color, borderBottomLeftRadius:10, borderBottomRightRadius:10}, Platform.OS == 'ios' && {height:100, paddingTop:30} ]}>
             {!backBtn ? <TouchableOpacity style={styles.btn} onPress={()=>navigation.openDrawer()}>
                <Image source={require('../assets/images/menu.png')} style={{width:25,height:14,tintColor:backgroundColor ? Colors.White: Colors.Main_Color }}/>
            </TouchableOpacity>
        :<BackButton />    
        }
                    <AppText style={[styles.title,{color:backgroundColor ? Colors.White: Colors.Main_Color }, Platform.OS == 'ios' && {lineHeight:27} ]} semibold >{title}</AppText>

            {user ? <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Notifications')}>
                <Image source={require('../assets/images/bell.png')} style={{width:18,height:20,tintColor:backgroundColor ? Colors.White: Colors.Main_Color}}/>
            </TouchableOpacity> : <View />}
           
    </View>
    )
}
export const Header2 =({ title })=>{
    return(
        <View style={[styles.rowView,{paddingBottom:20}, Platform.OS == 'ios' && {paddingTop:50}]}>
            <BackButton tintColor={Colors.Main_Color}/>
            <HeaderText style={styles.header}>{title}</HeaderText>
            <View style={{width:30, height:30}} />
        </View>
    )
}
const styles = StyleSheet.create({
    cont:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:'4%',
        height:80,
    },
    title:{
        color:Colors.White,
        fontSize:26,
    },
    btn:{
        width:30,
        height:30,
        justifyContent:'center',

    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    
})
