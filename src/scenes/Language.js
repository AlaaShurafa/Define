import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Platform,  Image, StatusBar, ScrollView} from 'react-native'
import { BackButton, Paragraph, HeaderText, RadioButton, Button, Header2} from '../component'
import { useSelector } from 'react-redux';
import * as Colors from '../styles/Colors'
import { setI18nConfig, translate } from '../translations/i18n';
import deviceStorage from '../services/deviceStorage';
import RNRestart from 'react-native-restart';
export default Language = ()=>{
    const [lang, setLang] = useState('')
    useEffect(async()=>{
        const lng = await deviceStorage.getItem('lang')
        setLang(lng)
    },[])
    const setLangBtn = async () =>{
        const currentLang = await deviceStorage.getItem('lang')
        if(currentLang != lang){
            await deviceStorage.saveItem('lang',lang)
            // setI18nConfig()
            RNRestart.Restart()
            // if((lng == 'en' && lang == 'sv')||(lang == 'en' && lng == 'sv') ){
            // }
        }
    }
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={{paddingHorizontal:'4.5%',flex:1}}>
                <Header2 title={translate('app.lang')}/>
                <View style={{flex:1}}>
                    <RadioButton active={lang == "en"} title={translate('app.english')} onPress={()=>setLang('en')}/>
                    <RadioButton active={lang == "ar"} title={translate('app.arabic')} onPress={()=>setLang('ar')}/>
                    <RadioButton active={lang == "sv"} title={translate('app.sw')} onPress={()=>setLang('sv')}/>
                    <RadioButton active={lang == "tr"} title={translate('app.tr')} onPress={()=>setLang('tr')}/>
                    <RadioButton active={lang == "da"} title={translate('app.da')} onPress={()=>setLang('da')}/>
                    <RadioButton active={lang == "nb"} title={translate('app.nb')} onPress={()=>setLang('nb')}/>
                </View>
                <Button 
                    onPress={setLangBtn}
                    buttonStyle={{marginBottom:20, height:50}}>{translate('app.confirm')}</Button>
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