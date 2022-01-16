import React from 'react';
import {StyleSheet,TouchableOpacity,Image} from 'react-native';
import AppText from './AppText';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const RadioButton = (props)=>{
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cont}
                onPress={props.onPress}
            >
                <Icon name={props.active ? "radiobox-marked" : "radiobox-blank"} color={Colors.Main_Color} size={30}/>
                {/* <Image 
                    source={props.active ? require('../assets/images/radio_active.png') : require('../assets/images/radio_not_active.png')}/> */}
                
                <AppText 
                    semibold 
                    style={styles.title}>{props.title}</AppText>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    cont:{
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        // marginTop:10,
        paddingVertical:15
    },
    title:{
        fontSize:20,
        color:Colors.Black,
        marginHorizontal:14,
        flex:1,
    }
})
export default RadioButton