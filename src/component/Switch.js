import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  } from 'react-native';
import * as Colors from '../styles/Colors';
import AppText from './AppText'

const SwitchComponent = props => {
  return (
    <View 
        style={styles.cont}>
      <AppText regular style={styles.status_text}>{props.title}</AppText>
      <Switch 
          trackColor={{ false:Colors.grey, true:  Colors.Main_Color }}
          thumbColor={Colors.White}
          ios_backgroundColor="#3e3e3e"
          onValueChange={props.onValueChange}
          value={props.value}
      />
  </View>
    );
};
const styles = StyleSheet.create({
  cont:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:Colors.Gray_Background,
    borderRadius:5
  },
  status_text:{
    fontSize:18,
    color:Colors.Black
  }
});
export default SwitchComponent;
