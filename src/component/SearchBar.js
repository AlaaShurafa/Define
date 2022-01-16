import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, TextInput,TouchableOpacity,Image,StyleSheet, I18nManager, Platform } from 'react-native';
import * as Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
import {translate} from '../translations/i18n'
export default  SearchBarView = ({style, value, setValue, onSubmit}) => {
    // const [value, setValue] = useState('')
    const navigation = useNavigation()
    // const onSubmit = () =>{
    //     navigation.navigate('SearchProduct',{id:null, q:value})
    //     console.log(value)
    // }
        return(
                <View style={[styles.cont,style, Platform.OS =='ios' && {height:40}]}>
                    <View style={{flexDirection:'row',alignItems:'center',paddingLeft:17,width:'85%'}}>
                        <Image 
                            source={require('../assets/images/search.png')} 
                            style={{width:13,height:14, tintColor:Colors.grey_Light}}/>
                        <TextInput  
                            placeholder={translate('app.search')}
                            placeholderTextColor={Colors.grey_Light}
                            returnKeyType='search'
                            style={styles.input}
                            onChangeText={setValue}
                            onSubmitEditing={onSubmit}
                            value={value}/>
                    </View>
                </View>
        )
    
}
const styles = StyleSheet.create({
    cont:{  
        flexDirection:'row',
        backgroundColor:Colors.White,
        // padding:10,
        // // height:50,
        borderRadius:4,
        justifyContent:'space-between',
        alignItems:'center',
        // paddingVertical:5,
        elevation:5,
        width:'85%',
        alignSelf:'center',
        // marginBottom:11,
        zIndex:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,

    },
    input:{
        color:Colors.Black,
        fontFamily:Fonts.SemiBoldFont,
        flex:1,
        fontSize:15,
        marginLeft:5,
        textAlign:I18nManager.isRTL ?'right' :'left'
    }
})
