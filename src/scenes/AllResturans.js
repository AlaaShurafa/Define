import React, { useState,useEffect } from 'react'
import {StyleSheet, View, SafeAreaView, FlatList, StatusBar} from 'react-native'
import {SearchBar, BackButton, Item, HeaderText, ModalCoffeeDetails} from '../component'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { getHome } from '../store/actions/app'
export default AllResturants = ({navigation,route})=>{
    const dispatch = useDispatch();
    const [clickedItem, setClickedItem] = useState(undefined)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const { providers } = useSelector(({ app }) => ({
        providers: app.providers,
    }))
    const getDataHome = () => dispatch(getHome(route.params.active))
    useEffect(()=>{
        getDataHome();
    },[])
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={{paddingHorizontal:'4.5%',paddingTop:20}}>
                <View style={[styles.rowView,{paddingBottom:27}]}>
                    <View />
                    <HeaderText style={styles.header}>المطاعم القريبة</HeaderText>
                    <BackButton/>
                </View>
                {/* <SearchBar /> */}
                <FlatList 
                    data={providers}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({item})=>
                        <Item onPress={()=>{
                            setClickedItem(item)
                            setShowDetailsModal(true)
                        }} 
                        item={item}
                        style={{marginBottom:35}}
                        />
                    }
                    />
            </View>
            <ModalCoffeeDetails 
                item={clickedItem}
                visible={showDetailsModal}
                onClose ={()=>setShowDetailsModal(false)}
                navigation={navigation}
            />
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