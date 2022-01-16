import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { Black, Green, grey, White, Main_Color, orange, Red  } from '../styles/Colors'
import AppText from './AppText'
import { translate } from '../translations/i18n';
import { toggleFav } from '../store/actions/app'

export default Item = ({style, onPress, item})=>{
    const dispatch = useDispatch();
    const toggleFavButton = (id) => dispatch(toggleFav(id))
    const changeFavStatus = async(id) =>{
        try{
            await toggleFavButton(id)
        }
        catch(er){
            console.log(er)
        }
    }
    return (
    <TouchableOpacity 
        onPress={onPress}
        style={[styles.rowView,style]}>
        <View style={{flexDirection:'row',alignItems:'center', flexShrink:1}}>
            <View style={[{marginRight:11,borderRadius:9},item?.Media?.length == 0 && {backgroundColor:Main_Color}]}>
                <Image source={item?.Media?.length > 0 ? {uri:item?.Media[0].file} : require('../assets/images/logo.png')} style={[styles.img,item?.Media?.length == 0 && {resizeMode:'contain'}]}/>
            </View>
            <View style={{justifyContent:'space-between',alignItems:'flex-start', flexShrink:1, paddingVertical:10}}>
                <AppText style={styles.title} semibold numberOfLines={1}>{item?.name}</AppText>
                <AppText style={[styles.title,{fontSize:17, color:grey}]} semibold>{item?.Category.name}</AppText>
                <AppText style={styles.grey} semibold>{`${item?.price?.toFixed(2)} ${translate('app.currency')}`}</AppText>
                {/* <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="star" color={orange} size={15}/>
                    <AppText semibold style={{fontSize:13,color:orange,marginHorizontal:5}}>{item?.rate}</AppText>
                </View> */}
            </View>
        </View>
        <View style={{alignSelf:'flex-start'}}>
            <TouchableOpacity 
                onPress={()=>changeFavStatus(item?.id)}
                style={styles.icon}>
                <Icon name={item?.is_fav ? "heart" : 'heart-outline'} size={25} color={Red}/>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:11,
        elevation:3,
        backgroundColor:White,
        padding:6,
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
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
        shadowRadius: 15
    },
    title:{
        fontSize:18,
        color:Black,
        flexGrow:1,
        flexShrink:1, 
        flex:1,
    },
    grey:{
        fontSize:17,
        color:Main_Color,
    },
    img:{
        width:135,
        height:150,
        borderRadius:9,
        
    },
    icon:{
        backgroundColor:'#F5F4F9',
        borderRadius:24,
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
    },
})