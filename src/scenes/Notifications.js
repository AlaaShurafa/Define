import React, { useEffect } from 'react'
import {StyleSheet, View, SafeAreaView, TouchableOpacity, ActivityIndicator, StatusBar, FlatList} from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import {NotificationItem, HeaderText, BackButton, Header2} from '../component'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../store/actions/app';
import { translate } from '../translations/i18n';
import { Platform } from 'react-native';

export default Notifications = ()=>{
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const {  notifications, loadingNotifications } = useSelector(({ app }) => ({
        notifications: app.notifications,
        loadingNotifications: app.loadingNotifications
    }))
    const getDataNoti = () => dispatch(getNotifications())
    useEffect(()=>{
        getDataNoti();
    },[isFocused])
    console.log(notifications ,  'notifications')
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={{paddingHorizontal:'4.5%',flex:1}}>
                <Header2 title={translate('app.notifications')}/>
            <View style={{flex:1}}>
                {!loadingNotifications ? 
                    <FlatList 
                        data={notifications}
                        style={{flex:1}}
                        contentContainerStyle={{paddingHorizontal:'4.5%',paddingTop:5}}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item})=>
                                <NotificationItem item={item}/>
                    }
                    />
                    :<ActivityIndicator color={Colors.Main_Color}/> 
                        
                }
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    viewCont:{
        flex:1,
        backgroundColor:Colors.White,
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:11
    },
    header:{
        paddingTop:20,
        paddingBottom:27,
        alignSelf:'center'
    }
})