import React, { useEffect, useState } from 'react'
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Image, StatusBar, FlatList} from 'react-native'
import {AppText, SearchBar, Header } from '../component'
import * as Colors from '../styles/Colors'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../translations/i18n';
export default Categories = ({navigation})=>{
    const dispatch = useDispatch();
    const { Categories } = useSelector(({ app }) => ({
        Categories : app.appData?.Categories,
    }))
    // const Categories = [
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    //     {
    //         "id": 1,
    //         "name": "تصنيف",
    //         "description": "تصنيف",
    //         "image": "https://store.awtar-tech.com/storage/media/02d46afec3d28c72d65da10c9c2358e9.jpg"
    //     },
    // ]
    return (
        <View style={styles.viewCont} >
            <StatusBar backgroundColor={Colors.Main_Color} animated={true} barStyle={"light-content"}/>
            <View 
                style={{width:'100%',flex:1}}
                >
                    <Header title={translate('app.app')}/>
                    <View style={{marginTop:-20}}>
                        <SearchBar />
                    </View>
                    <View style={{paddingHorizontal:'4.5%',marginTop:10}}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            data={Categories}
                            renderItem={({ item, index }) =>
                            <>
                            <Item
                                item={item} index ={index} navigation={navigation}/>
                            </>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
            </View>
        </View>
    )
}
const Item = ({ item, navigation , index  }) => {
    return <TouchableOpacity onPress={()=>navigation.navigate('Products',{id:item?.id})} style={{width:'31.5%',marginTop:15, marginRight:index % 3 <2 ? '2.5%': 0}}>
        <View style={[{ alignItems:'center', justifyContent:'center' }]}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
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
        width: '100%',
        height: 65,
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