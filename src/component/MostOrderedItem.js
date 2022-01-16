import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { Black, Green, grey, White, Main_Color, orange, Red  } from '../styles/Colors'
import AppText from './AppText'
import { translate } from '../translations/i18n';
import { toggleFav } from '../store/actions/app'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default Item = ({style, onPress, item})=>{
    const dispatch = useDispatch();
    const toggleFavButton = (id) => dispatch(toggleFav(id))
    const changeFavStatus = async(id) =>{
        try{
            await toggleFavButton(id)
            // setItem({...item, is_fav : !item.is_fav})
        }
        catch(er){
            console.log(er)
        }
    }
    return (
    <TouchableOpacity 
        activeOpacity={.9}
        onPress={onPress}
        style={[styles.cont,style]}>
        <View>
            <TouchableOpacity 
                onPress={()=>changeFavStatus(item?.id)}
                style={styles.icon}>
                <Icon name={item?.is_fav ? "heart" : 'heart-outline'} size={20} color={Red}/>
            </TouchableOpacity>
            <View style={[{borderRadius:7},item?.Media?.length == 0 && {backgroundColor:Main_Color}]}>
                <Image source={item?.Media?.length > 0 ? {uri:item?.Media[0].file} : require('../assets/images/logo.png')} style={[styles.img,item?.Media?.length == 0 && {resizeMode:'contain'}]}/>
            </View>
            <View style={[styles.boxCont]}>
                <AppText style={styles.title} semibold numberOfLines={2}>{item?.name}</AppText>
                <AppText style={[styles.title,{fontSize:14, color:grey}]} semibold>{item?.Category.name}</AppText>
                <AppText style={styles.grey} semibold>{`${item?.price?.toFixed(2)} ${translate('app.currency')}`}</AppText>
                {/* <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="star" color={orange} size={15}/>
                    <AppText semibold style={{fontSize:13,color:orange,marginHorizontal:5}}>{item?.rate}</AppText>
                </View> */}
            </View>
        </View>
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cont:{
        backgroundColor:Colors.White,
        // marginRight:10,
        padding:2,
        paddingBottom:5,
        marginBottom:5,
    },
    boxCont:{
        alignItems:'flex-start',
        paddingVertical:10,
        top:-2,
        position:'relative',
        elevation:2,
        paddingHorizontal:7,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        height:110
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
        fontSize:14,
        color:Main_Color
    },
    img:{
        width:'100%',
        height:190,
        borderRadius:7,
        zIndex:10
    },
    icon:{
        backgroundColor:'#F5F4F9',
        position:'absolute',
        top:10,
        zIndex:15,
        borderRadius:24,
        width:24,
        height:24,
        right:10,
        alignItems:'center',
        justifyContent:'center',
    },
})