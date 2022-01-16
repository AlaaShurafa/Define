import React, { useState } from 'react'
import {StyleSheet, View, SafeAreaView,  Image, StatusBar, ScrollView, Platform} from 'react-native'
import { BackButton, AppText, Header2} from '../component'
import { useSelector } from 'react-redux';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
export default Points = ()=>{
    const { user } = useSelector(({ auth }) => ({
        user : auth.user
    }))
    console.log(user?.points , 'yy')
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={{paddingHorizontal:'4.5%',paddingTop:20,flex:1}}>
                <Header2 title={translate('app.points')}/>
                <View 
                    style={{flex:1, alignItems:'center',paddingTop:60}}>
                     <AppText bold style={[{fontSize:60 }, Platform.OS == 'ios' && {lineHeight:60}]}>{user?.points}</AppText>
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
        width:'100%',
    },
    header:{
        alignSelf:'center'
    }
})