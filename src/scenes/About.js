import React, { useState } from 'react'
import {StyleSheet, View, Platform,  Image, StatusBar, ScrollView} from 'react-native'
import { useSelector } from 'react-redux';
import { BackButton, Paragraph, Header2} from '../component'
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
export default About = ()=>{
    const { about } = useSelector(({ app }) => ({
        about : app.appData?.Settings.about,
    }))
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={{paddingHorizontal:'4.5%',flex:1}}>
                <Header2 title={translate('app.about')}/>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                    <Paragraph style={{paddingBottom:20}}>{about}</Paragraph>
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