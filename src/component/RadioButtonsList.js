import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  } from 'react-native';
import * as Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
import RadioButton from './RadioButton';

const RadioButtonsList = props => {
    // console.log(props.list , 'list')
  return (
    <View 
        style={styles.cont}>
            <View>
            {
                props.list.map((item, index)=>{
                    return <RadioButton 
                                title={item.label}
                                active={props.checked ===index}
                                key = {index}
                                onPress={()=>props.onPress(index)}
                            />
                })
            }
            </View>
      
  </View>
    );
};
const styles = StyleSheet.create({
  cont:{
        paddingTop:10
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
export default RadioButtonsList;
