import React, { useEffect, useState } from 'react'
import {StyleSheet, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, PermissionsAndroid} from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import {MyOrderItem, HeaderText, AppText, BackButton, Header2} from '../component'
import * as Colors from '../styles/Colors'
import { getOrders } from '../store/actions/app'
import { translate } from '../translations/i18n';

export default Orders = ({navigation})=>{
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [activeButton, setActiveButton] = useState('current')
    const {  orders, loadingOrders, type, user } = useSelector(({ app, auth }) => ({
        orders: app.orders,
        loadingOrders: app.loadingOrders,
        type: auth.user?.type,
        user:auth?.user
    }))
    const getDataOrders = (complete) => dispatch(getOrders(complete))

    useEffect(()=>{
        getDataOrders(activeButton ==="current" ? 0 :1 );
    },[isFocused, activeButton])
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View style={[{paddingHorizontal:'4.5%'}]}>
                <Header2 title={translate('app.orders')}/>
            </View>
            <View style={[styles.btnCont]}>
                <TouchableOpacity
                    onPress={() => setActiveButton('current')}
                    style={[
                        styles.btn,
                        activeButton === "current" ? styles.activeButton : styles.inActiveButton,
                    ]}>
                    <AppText semibold
                        style={[styles.btnText, activeButton !== "current" && { color: Colors.Black }]}>{translate("app.current")}</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveButton('prev')}
                    style={[
                        styles.btn,
                        activeButton === "prev" ? styles.activeButton : styles.inActiveButton,
                    ]}>
                    <AppText semibold style={[styles.btnText, activeButton !== "prev" && { color: Colors.Black }]}>{translate("app.prev")}</AppText>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                {!loadingOrders ? 
                    <FlatList 
                        data={orders}
                        showsVerticalScrollIndicator={false}
                        style={{flex:1}}
                        contentContainerStyle={{paddingTop:5}}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item})=>
                        <TouchableOpacity
                            activeOpacity={.9}
                            onPress={()=>navigation.navigate('OrderDetails',{item})}
                        >
                            <MyOrderItem item={item}/>
                        </TouchableOpacity>
                    }
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
        marginVertical:11
    },
    header:{
        paddingTop:20,
        paddingBottom:27,
        alignSelf:'center'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    btnText: {
        color: Colors.White,
        fontSize: 19,
    },
    activeButton: {
        backgroundColor: Colors.Main_Color
    },
    btnCont: {
        flexDirection: 'row',
        // flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 18,
        backgroundColor: '#F5F5F5',
    }
})