import React from 'react';
import {TouchableOpacity, StyleSheet,View} from 'react-native';
import AppText from './AppText';
import * as Colors from '../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CountButton =({style, value, apperance, color, onAdd, onMinus})=>{
    return(
        <View style={[styles.cont,style]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onAdd}
                style={[
                    styles.button,
                    apperance === "big" ? styles.bigButton : styles.smallButton,
                    color === "green" ? styles.greenButton : styles.orangeButton 
                ]}
            >
                <Icon
                    color={Colors.White} 
                    name="plus" size={apperance === "big" ?25 : 15} />
            </TouchableOpacity>
            <AppText semibold style={{fontSize:apperance === "big" ?25 : 15,}}>{value}</AppText>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onMinus}
                style={[
                    styles.button,
                    apperance === "big" ? styles.bigButton : styles.smallButton,
                    color === "green" ? styles.greyButton : styles.whiteButton 
                ]}
            >
                <Icon
                    color={Colors.Main_Color} 
                    name="minus" size={apperance === "big" ?25 : 15} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    cont:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    button:{
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    bigButton:{
        width:41,
        height:39
    },
    smallButton:{
        width:26,
        height:24,
        borderRadius:5
    },
    greenButton:{
        backgroundColor:Colors.Main_Color
    },
    orangeButton:{
        backgroundColor:Colors.Main_Color
    },
    greyButton:{
        backgroundColor:Colors.grey_Background,
        elevation:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
    },
    whiteButton:{
        backgroundColor:Colors.White,
        borderWidth:1,
        borderColor:Colors.Main_Color
    }

})
export default CountButton