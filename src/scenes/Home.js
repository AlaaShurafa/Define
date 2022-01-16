import React, { useEffect, useState } from 'react'
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Image, StatusBar, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import {AppText, SearchBar, Carousel, Header, FoodItem, MostOrderedItem} from '../component'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { getFoods, getMostOrdered } from '../store/actions/app'
import { translate } from '../translations/i18n';
export default Home = ({navigation})=>{
    const dispatch = useDispatch();
    const { Categories, loadingFoods, foods, loadingMostOrder, mostOrderFoods } = useSelector(({ app }) => ({
        Categories : app.appData?.Categories,
        loadingFoods: app.loadingFoods,
        loadingMostOrder: app.loadingMostOrder,
        mostOrderFoods: app.mostOrderFoods,
        foods: app.foods
    }))
    const getDataHome = () => dispatch(getFoods(null, null, 10))
    const getMostOrder = () => dispatch(getMostOrdered(null, 1, 10))
    useEffect(()=>{
        getMostOrder();
        getDataHome();
    },[])
    return (
        <View style={styles.viewCont} >
            <StatusBar backgroundColor={Colors.Main_Color} animated={true} barStyle={"light-content"}/>
            <ScrollView 
                style={{width:'100%',flex:1}}
                >
                    <Header title={translate('app.app')} />
                    <View style={{marginTop:-20}}>
                        <SearchBar />
                    </View>
                    <Carousel />
                    <View style={{marginTop:10}}>
                        <View style={{paddingHorizontal:'4.5%'}}>
                            <View style={[styles.rowView,{marginTop:0}]}>
                                <View style={[styles.rowView,{marginVertical:0}]}>
                                <AppText semibold style={{fontSize:16,color:Colors.Black,paddingHorizontal:3}}>{translate("app.categories")}</AppText>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>navigation.navigate('Categories')}
                                >
                                    <AppText semibold style={{fontSize:12,color:Colors.grey}}>{translate('app.all')}</AppText>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                    style={{ alignSelf: 'flex-start'}}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={Categories}
                                    
                                    renderItem={({ item }) =>
                                    <Item
                                        item={item}
                                        onPress={() => navigation.navigate('Products',{id:item?.id})}
                                    />}
                                    keyExtractor={(item, index) => index.toString()}
                            />
                            <View style={[styles.rowView,{marginTop:13}]}>
                                <View style={[styles.rowView,{marginVertical:0}]}>
                                <AppText semibold style={{fontSize:16,color:Colors.Black,paddingHorizontal:3}}>{translate("app.most_ordered")}</AppText>
                                </View>
                            </View>
                            {!loadingMostOrder ? 
                                <FlatList 
                                    style={{ alignSelf: 'flex-start'}}
                                    data={mostOrderFoods}
                                    horizontal
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item,index) => index.toString()}
                                    renderItem={({item})=>
                                    <>
                                    <MostOrderedItem onPress={()=>navigation.navigate('ItemDetails',{item})} item={item}/>
                                    </>}
                                />
                                :<ActivityIndicator color={Colors.Main_Color}/> 
                            }
                        </View>

                        <View style={[styles.rowView,{marginTop:0,paddingHorizontal:'4.5%'}]}>
                            <View style={[styles.rowView,{marginVertical:0}]}>
                               <AppText semibold style={{fontSize:16,color:Colors.Black,paddingHorizontal:3}}>{translate("app.products")}</AppText>
                            </View>
                            <TouchableOpacity
                                onPress={()=>navigation.navigate('Products',{id:null})}
                            >
                                <AppText semibold style={{fontSize:12,color:Colors.grey}}>{translate('app.all')}</AppText>
                            </TouchableOpacity>
                        </View>
                        {!loadingFoods ? 
                            <FlatList 
                            data={foods}
                            contentContainerStyle={{paddingHorizontal:'4.5%',paddingTop:5}}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={({item})=>
                                <>
                                <FoodItem onPress={()=>navigation.navigate('ItemDetails',{item})} item={item}/>
                                </>}
                            />
                            :<ActivityIndicator color={Colors.Main_Color}/> 
                        
                        }
                        
                        
                    </View>
            </ScrollView>
        </View >
    )
}
const Item = ({ item, onPress, all }) => {
    return <TouchableOpacity onPress={onPress} style={ {marginRight:20}}>
        <View style={[{ alignItems:'center', justifyContent:'center' },styles.itemView]}>
            {all ? <View style={styles.allImageCont}>
                    <Image source={require('../assets/images/restaurant.png')} style={styles.allImage} />
                </View> 
            : <Image source={{ uri: item.image }} style={styles.categoryImage} />}
            <AppText semibold style={{ fontSize: 14, color:Colors.Black}}>{item.name}</AppText>
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    viewCont:{
        flex:1,
        backgroundColor:Colors.White,
        alignItems:'center',
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:11
    },
    cart:{
        backgroundColor:Colors.Main_Color_op,
        width:37,
        height:37,
        justifyContent:'center',
        borderRadius:11,
        alignItems:'center'
    },
    btn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        paddingVertical:10,
        borderRadius:7,
    },
    btnText:{
        color:Colors.White,
        fontSize:19,
        paddingHorizontal:11
    },
    activeButton:{
        backgroundColor:Colors.Main_Color
    },
    inActiveButton:{
        backgroundColor:Colors.Main_Color_op
    },
    btnCont:{
        flexDirection:'row',
        // flex:1,
        paddingHorizontal:'4.5%',alignItems:'center',justifyContent:'center',
        marginTop:7,
        marginBottom:17
    },
    categoryImage: {
        width: 94,
        height: 55,
        borderRadius: 3,
    },
    allImageCont:{
        width:50,
        height:50,
        borderRadius:50,
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.Main_Color
    },
    allImage:{
        width:17,
        height:27,
    }
})