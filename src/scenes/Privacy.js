import React, { useState } from 'react'
import {StyleSheet, View, Platform,  Image, StatusBar, ScrollView} from 'react-native'
import { BackButton, Paragraph, Header2} from '../component'
import { useSelector } from 'react-redux';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
export default Privacy = ()=>{
    const { privacy } = useSelector(({ app }) => ({
        privacy : app.appData?.Settings.privacy,
    }))
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={{paddingHorizontal:'4.5%',flex:1}}>
                <Header2 title={translate('app.privacy')}/>
                <ScrollView 
                    contentContainerStyle={{alignItems:'center'}}
                    showsVerticalScrollIndicator={false} 
                    style={{flex:1}}>
                    <Image source={require('../assets/images/privacy.png')} style={{marginBottom:40}}/>
                    <Paragraph style={{paddingBottom:20}}>{privacy}</Paragraph>
                </ScrollView>
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