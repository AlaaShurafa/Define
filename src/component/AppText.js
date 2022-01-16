import React from 'react';
import {Text, Platform, I18nManager} from 'react-native';
import Font from '../styles/Fonts';


const AppText =(props)=>{
    let fontStyle={};
    if(props.light) 
        fontStyle ={
            fontFamily:Font.LightFont,
            ...Platform.select({
                ios: {
                fontWeight:Font.fontWeightLight,
                lineHeight:20
                },
            }),   
        }
    else if(props.semibold) 
        fontStyle ={
            fontFamily:Font.SemiBoldFont,
            ...Platform.select({
                ios: {
                  fontWeight:Font.fontWeightRegular,
                  lineHeight:25
                },
            }),   
        }
    else if(props.regular) 
        fontStyle ={
            fontFamily:Font.RegularFont,
            ...Platform.select({
                ios: {
                  fontWeight:Font.fontWeightSemi,
                  lineHeight:20
                },
            }),   
        }
    else if(props.bold) 
        fontStyle ={
            fontFamily:Font.BoldFont,
            ...Platform.select({
                ios: {
                  fontWeight:Font.fontWeightBold,
                  lineHeight:32
                },
            }),   
        }
    
    return(
        <Text {...props} style={[{
            // ...Platform.select({
            //     ios: {
            //     textAlign:I18nManager.isRTL?'right':'left'
            //     },
            // }),
            textAlign:'left'
        },fontStyle,props.style]}>
            {props.children}
        </Text>
    )
}

export default AppText