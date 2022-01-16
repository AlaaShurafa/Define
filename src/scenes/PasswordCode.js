import React, {useState} from 'react';
import {SafeAreaView,View ,Text, StyleSheet, StatusBar, Image} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {HeaderText, Paragraph, BackButton, AppText, Button, Link, Header2} from '../component'
import * as Colors from '../styles/Colors';
import { useDispatch } from 'react-redux'
import { checkEmailCode, sendEmailCode } from "../store/actions/auth";

import {translate} from '../translations/i18n'


const CELL_COUNT = 4;


export default  PasswordCode = (props) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [propsC, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const dispatch = useDispatch();
    const checkCode = (email,code) => dispatch(checkEmailCode(email,code))
    const sendCode = (email) => dispatch(sendEmailCode(email))
    const email = props.route.params.email

  return (
    <View style={styles.viewCont} >
       <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
        <View style={{paddingHorizontal:'4.5%',flex:1}}>
          <Header2 title={translate('auth.restore_password')} />
            <View style={{alignItems:'center'}}>
              <Image 
                source={require('../assets/images/passwordRevocery.png')} />
              <Paragraph style={{fontSize:18,marginVertical:28,textAlign:'center'}}>{translate('auth.enter_code')}</Paragraph>
              <CodeField
                  ref={ref}
                  {...propsC}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="number-pad"
                  // onFulfill={doneAdding(value)}
                  renderCell={({index, symbol, isFocused}) => (
                  <AppText
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                  </AppText>
                  )}
              />
              <AppText semibold style={{fontSize:16,color:Colors.grey}}>{translate('auth.no_code')}</AppText>
              <Link
                style={{color:Colors.Green,fontSize:16,marginTop:13}}
                  onPress={()=>sendCode(email)}
              >{translate('auth.resend')}</Link>
            </View>
        <Button 
          onPress={()=>{
            console.log(value)
            checkCode(email,value)}}
          style={{marginTop:50}}>{translate('auth.verify')}</Button>
        </View>
        {/* <Count /> */}
    </View>
  );
};


const styles = StyleSheet.create({
    viewCont: {flex: 1,backgroundColor:Colors.White},
    codeFiledRoot: {
        width:'80%',
        alignSelf:'center',
        marginTop:15,
        marginBottom:35
    },
    rowView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:'100%',
  },
  header:{
      alignSelf:'center'
  },
    cell: {
      width: 48,
      height: 47,
      lineHeight: 38,
      fontSize: 24,
      backgroundColor:'#EBEFF3',
      borderRadius:5,
      textAlign: 'center',
      color:Colors.Blue_Dark
    },
    focusCell: {
      borderColor: Colors.Gray_Light,
      color:Colors.Gray_Light
    },
    hedaer_cont:{
        width:'90%',
        alignSelf:'center',
        marginBottom:50
    },
    header:{
        marginVertical:12
    },
    button:{
        marginTop:80
    },
    email:{
      fontSize:18,
      color:Colors.Main_Color
    },
    code_header_cont:{
      flexDirection:'row',
      
    }
  });
