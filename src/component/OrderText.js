import React from 'react';
import {TouchableOpacity,StyleSheet,View, Image} from 'react-native'
import AppText  from './AppText';
import * as Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { translate } from '../translations/i18n';
const HeaderText =(props) =>{
    return(
        <AppText
            style={[{
                fontSize:20,
                color:Colors.Main_Color,
            },props.style]}
            bold
        >
            {props.children}
        </AppText>
    )
}
const Title =(props) =>{
    return(
        <AppText
            style={[{
                fontSize:20,
                color:Colors.Main_Color,
            },props.style]}
            semibold
        >
            {props.children}
        </AppText>
    )
}
const Error =(props) =>{
    return(
        <AppText
            style={[{
                fontSize:13,
                color:Colors.Red,
            },props.style]}
            regular
        >
            {props.children}
        </AppText>
    )
}
const Paragraph =(props) =>{
    return(
        <AppText
            style={[{
                fontSize:16,
                color:Colors.Black,
                lineHeight:30
            },props.style]}
            semibold
        >
            {props.children}
        </AppText>
    )
}
const Link =(props) =>{
    return(
        <TouchableOpacity
            {...props}
            onPress={props.onPress}
            style={[{flexDirection:'row',alignItems:'center'},props.style]}
        >   
            {props.iconName && 
                <Icon 
                    name={props.iconName}
                    size={18}
                    color={Colors.Main_Color}
                    style={{marginHorizontal:5}}
                />
            }
            {props.source && 
                <Image 
                    source={props.source}
                    style={{marginHorizontal:5}}
                />
            }
            <AppText
                style={[{
                    fontSize:11,
                    color:Colors.Main_Color,
                },props.style,props.border && styles.link_border]}
                semibold
            >
                {props.children}
            </AppText>
        </TouchableOpacity>
    )
}
const VerifiedLabel =(props) =>{
    return(
        <View style={styles.icon_cont}>
            <Icon 
                name={props.iconName}
                color={props.color}
                size={20}
            />
            <AppText 
                regular
                style={[styles.text,{color:props.color}]}
            >{props.title}!</AppText>
        </View>
    )
}
const OrderStatus =(props) =>{
    const {backgroundColor , color , text, style, shipmentNumber} = props 

    return(
        <View style={[styles.orderStatus , {backgroundColor:backgroundColor, borderColor:color} ,style]}>
            <AppText 
                semibold
                style={[styles.text,{color:color, fontSize:14}]}
            >{text}</AppText>
           {shipmentNumber&& <AppText 
                semibold
                style={[styles.text,{color:color, fontSize:14}]}
            >{translate('app.shipmentNumber')}: 
            <AppText style={{color:Colors.Black}}> {shipmentNumber}</AppText>
            </AppText>}
        </View>
    )
}
const styles = StyleSheet.create({
    link_border:{
        borderWidth:1,
        borderColor:Colors.Main_Color,
        paddingHorizontal:10,
        paddingVertical:3,
        marginHorizontal:10,
        borderRadius:3
    },
    icon_cont:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-start'
    },
    orderStatus:{
        width:'95%',
        alignSelf:'center',
        paddingHorizontal:18,
        paddingVertical:12,
        // alignItems:'center',
        padding:5,
        borderWidth:1,
        borderRadius:11,
        
        // marginBottom:14
    }
})
export {Paragraph,HeaderText, Link,VerifiedLabel,Title, Error, OrderStatus};