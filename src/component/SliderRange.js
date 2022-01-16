import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Colors from '../styles/Colors';
import AppText from './AppText'
import Fonts from '../styles/Fonts';
import Slider from '@react-native-community/slider'
// import { Slider } from 'react-native-elements'

class SliderRange extends React.Component {
    render(){
        const {color , minimumValue,maximumValue, label,value, onValueChange} = this.props
        return (
            <View >
                  <AppText regular style={styles.label}>{label}</AppText>
                  <View style={styles.cont}>
                            <AppText regular style={styles.labelSlider}>{minimumValue}</AppText>
                            <View style={{flex:1}}>
                                <AppText regular style={[styles.labelValue,{backgroundColor:color}]}>{value}</AppText>
                                <Slider
                                        // key = {index}
                                        style={{flex:1}}
                                        minimumValue={minimumValue}
                                        maximumValue={maximumValue}
                                        minimumTrackTintColor={Colors.Gray_Light}
                                        maximumTrackTintColor={Colors.Gray_Light}
                                        thumbTintColor={color}
                                        step = {1}
                                        onValueChange = {onValueChange}
                                />
                            </View>
                            <AppText regular style={styles.labelSlider}>{maximumValue}</AppText>
                  </View>
            </View>
          );
    }
    // console.log(props.list , 'list')
};
const styles = StyleSheet.create({
  cont:{
        backgroundColor:Colors.White,
        borderRadius:5,
        marginBottom:7,
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

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
  labelSlider:{
    fontSize:18,
    color:Colors.Black,
    marginTop:22
  },
  labelValue:{
    fontSize:16,
    color:Colors.White,
    borderRadius:15,
    alignSelf:'center',
    paddingHorizontal:12
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
export default SliderRange;
