import React, { useEffect, useState } from 'react'
import {StyleSheet, View, RefreshControl, TouchableOpacity, Image, StatusBar, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import {AppText, SearchBar, Carousel, Header, FoodItem, MostOrderedItem} from '../component'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { getFoods, getCategories } from '../store/actions/app'
import { translate } from '../translations/i18n';
import { TabRouter, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
export default Home = ({navigation, route})=>{
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { categories, loadingCategories, foods, loadingMostOrder, mostOrderFoods } = useSelector(({ app }) => ({
        categories : app.categories,
        loadingCategories: app.loadingCategories,
        loadingMostOrder: app.loadingMostOrder,
        mostOrderFoods: app.mostOrderFoods,
        foods: app.foods
    }))
    const getCategoriesData = () => dispatch(getCategories())
    useEffect(()=>{
        getCategoriesData();
    },[])
    return (
        <View style={styles.viewCont} >
            <StatusBar backgroundColor={Colors.Main_Color} animated={true} barStyle={"light-content"}/>

                    <Header title={translate('app.app')} style={
                        Platform.OS == 'ios' && {height:90, paddingTop:30}}/>
                    <View style={{paddingHorizontal:'4.5%', paddingTop:20,flex:1}}>
                        {!loadingCategories ? 
                        <FlatList 
                            data={categories}
                            showsVerticalScrollIndicator={false}
                            style={{flex:1}}
                            contentContainerStyle={{paddingTop:5}}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={({item})=>
                            item.parent_id == null && <Item item={item} />
                        }
                        refreshControl={
                            <RefreshControl
                              //refresh control used for the Pull to Refresh
                              refreshing={refreshing}
                              onRefresh={getCategoriesData}
                            />
                          }
                        />
                        :<ActivityIndicator color={Colors.Main_Color}/> 
                            
                    }
                    </View>
                   

        </View >
    )
}
const Item = ({item}) => {
    console.log(item?.name)
    const navigation = useNavigation()
    return <TouchableOpacity activeOpacity={.9} onPress={()=>{
        item?.id == 2 ? navigation.navigate('NewCategories',{title:item?.name, item})
        :navigation.navigate('NewProducts',{title:item?.name, item})
    }} style={[styles.btn,{backgroundColor:item?.color}]}>
        <Image source={{uri:item?.image}} style={{width:60, height:60, resizeMode:'contain'}}/>
        <AppText bold style={{color:Colors.White, fontSize:24}}>{item?.name}</AppText>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    viewCont:{
        flex:1,
        backgroundColor:Colors.White,
        // alignItems:'center',
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:11
    },
    btn:{
        width:'100%',
        height:140,
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:22
    }
 
})