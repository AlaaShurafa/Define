import React from 'react';
import { View,StyleSheet } from 'react-native';
import * as Colors from '../styles/Colors';
import AppText from './AppText'
import { CheckBox } from 'react-native-elements'
import Fonts from '../styles/Fonts';

const CheckList = props => {
    // console.log(props.list , 'list')
  return (
    <View 
        style={styles.cont}>
            <AppText semibold style={styles.label}>{props.label}</AppText>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {
                props.list.map((item, index)=>{
                    return <CheckBox 
                            key={index}
                            title={item.label}
                            checked={item.value}
                            checkedColor={props.color}
                            onPress={()=>props.onPress(index)}
                            containerStyle = {[styles.containerStyle , {width:props.grid === 1 ? '100%':'42%'}]}
                            textStyle = {styles.textStyle}
                            fontFamily={Fonts.RegularFont}
                            size = {24}
                    />
                })
            }
            </View>
      
  </View>
    );
};
const styles = StyleSheet.create({
  cont:{
        paddingTop:20
  },
  status_text:{
    fontSize:18,
    color:Colors.Black
  },
  label:{
    fontSize:18,
    color:Colors.Black,
    paddingBottom:10
  },
  containerStyle:{
      backgroundColor:'transparent',
      borderWidth:0,
      padding:0,
      width:'40%'
    //   margin:0
  },
  textStyle:{
      fontFamily:Fonts.RegularFont,
      fontSize:16,
      color:Colors.Black,
      fontWeight:'normal'
  }
});
export default CheckList;
