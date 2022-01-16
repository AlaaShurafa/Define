import React, { useEffect, useState } from 'react'
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Image, StatusBar, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { AppText } from '../component';
export default Home = ({navigation})=>{
    const dispatch = useDispatch();
 
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
            <View>
                <AppText>Calculator</AppText>
            </View>
        </View>
    )
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
    }
})