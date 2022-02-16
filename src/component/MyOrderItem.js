import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import { Black, Green, grey, White } from '../styles/Colors'
import AppText from './AppText'
import { Main_Color, grey_Background_Light } from '../styles/Colors';
import { translate } from '../translations/i18n';
export default Item = ({style, item})=>{
    return (
    <View style={[styles.rowView,styles.rowCont,style]}>
        <View style={{flexDirection:'row',alignItems:'center',flex:4}}>
            {/* <Image source={{uri:item?.Provider?.avatar}} style={styles.img}/> */}
            <View style={[{marginRight:11,borderRadius:9},!item?.User?.avatar && {backgroundColor:Main_Color}]}>
                <Image source={item?.User?.avatar ? {uri:item?.User?.avatar} : require('../assets/images/logo.png')} style={styles.img}/>
            </View>
            <View style={{justifyContent:'space-between',alignItems:'flex-start',flexShrink: 1}}>
                <AppText style={styles.title} semibold>{item?.User?.name}</AppText>
                {/* <AppText style={styles.grey} semibold>حجم متوسط</AppText> */}
                <AppText style={styles.green} semibold>{`${item?.amount} ${translate('app.currency')}`}</AppText>
            </View>
        </View>
        <View style={{alignItems:'center',flex:1}}>
            <AppText style={styles.mainColor} semibold>
                {/* {item?.status ==1 && translate('app.order_1')}
                {item?.status ==2 && translate('app.order_2')}
                {item?.status ==3 && translate('app.order_3')}
                {item?.status ==4 && translate('app.order_4')}
                {item?.status ==5 && translate('app.order_5')}
                {item?.status ==6 && translate('app.order_6')}
                {item?.status ==7 && translate('app.order_7')} */}
                {item?.status_str}
            </AppText>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // width:'100%'
        marginHorizontal:'4.5%',
    },
    rowCont:{
        marginBottom:27,
        backgroundColor:White,
        elevation:5,
        borderRadius:14,
        paddingHorizontal:14,
        paddingVertical:14,
        shadowColor: "#000000aa",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.1,
        shadowRadius: 14,
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
        fontSize:12,
        color:grey,
    },
    green:{
        fontSize:13,
        color:Main_Color,
    },
    mainColor:{
        fontSize:13,
        color:Main_Color,
        // width:'60%',
        textAlign:'center',
        alignSelf:'flex-end'
    },
    time:{
        color:Green,
        fontSize:11
    },
    img:{
        width:70,
        height:59,
        borderRadius:9,
        // marginRight:11
    }
    
})