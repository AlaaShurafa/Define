import React, { useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import {StyleSheet, View, Platform, FlatList, StatusBar, ActivityIndicator} from 'react-native'
import { BackButton, FavoriteItem, Header2} from '../component'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { getFav } from '../store/actions/app'
import { translate } from '../translations/i18n';

export default Favorites = (props)=>{
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const {  favourites, loadingFav } = useSelector(({ app }) => ({
        favourites: app.favourites,
        loadingFav: app.loadingFav
    }))
    const getDataFav = () => dispatch(getFav())
    useEffect(()=>{
        getDataFav();
    },[isFocused])
    // console.log(favourites , 'favouries')
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>

            <View style={{paddingHorizontal:'4.5%'}}>
                <Header2 title={translate('app.fav')}/>
                {!loadingFav ? 
                            <FlatList 
                            data={favourites}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={({item})=><FavoriteItem item={item} fav navigation={props.navigation}/>}
                            />
                            :<ActivityIndicator color={Colors.Main_Color}/> 
                        
                }
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
        // marginVertical:11,
        // backgroundColor:'red'
    },
    header:{
        paddingTop:20,
        paddingBottom:27,
        alignSelf:'center'
    }
})