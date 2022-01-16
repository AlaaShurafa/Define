import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  } from 'react-native';
import * as Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
import {AppText,Error} from '.'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '../translations/i18n'
const InputField = props => {
  const [hidePassword, setHide] = useState(true);
  return (
    <View style={[styles.cont,props.style]}>
      {/* <View style={[{ borderBottomColor: Colors.Gray_Light,
    borderBottomWidth: 1,},
                  {borderBottomColor: props.isRequired? Colors.Red : Colors.Gray_Light}]}> */}
          <View>
          {/* label */}
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            {props.label && <AppText semibold style={styles.label}>{props.label}</AppText> }
            {props.optional && <AppText regular style={styles.optional}>Optional</AppText> }
          </View>

          <View style={styles.input_cont}>
            {/* Icon */}
            <View style={[styles.iconCont,props.iconStyle]}>
              <Icon 
                  name={props.iconName} 
                  size={20} 
                  color={props.iconColor ? props.iconColor: Colors.Gray_Light} />
            </View>

            {/* Input */}
            <TextInput
              secureTextEntry={props.type === 'password' ? hidePassword : false}
              {...props}
              style={[
                styles.input,
                {textAlign: I18nManager.isRTL ?'right' : 'left'},
                props.inputStyle
              ]}
              onChangeText={props.onChangeText}
              value={props.value}
              placeholder={props.placeholder}
              placeholderTextColor={Colors.grey}
              keyboardType={props.keyboardType}
            />

            {/* password hide eye */}
            {props.type === 'password' && (
              <TouchableOpacity
                style={styles.iconRight}
                activeOpacity={0.8}
                onPress={() => setHide(!hidePassword)}>
                <Icon
                  name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                  color={Colors.Main_Color}
                  size={19}
                />
              </TouchableOpacity>
            )}

            {/* select dropdown */}
            {props.type === 'select' && (
                <Icon
                  style={styles.iconRight}
                  name='chevron-down'
                  color={Colors.Gray_Light}
                  size={25}
                />
            )}
        </View>
      </View>
      {props.isRequired && props.type !=="phone"?
      <Error style={{paddingTop:10}}>{translate('auth.req')}</Error>
      : null}
    </View>
    );
};
const styles = StyleSheet.create({
  cont: {
    // borderBottomColor: Colors.Gray_Light,
    // borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:20
  },
  input_cont:{
    justifyContent: 'center',
  },
  input: {
    color: '#919191',
    fontSize: 18,
    fontFamily: Fonts.RegularFont,
    paddingVertical: 15,
    borderRadius:10,
    paddingHorizontal:15,
    backgroundColor:Colors.grey_Background_Light
  },
  iconCont: {
    position: 'absolute',
    left: 0,
    width: 20,
  },
  iconRight:{
    position: 'absolute', right: 10
  },
  label:{
    fontSize:16,
    color:Colors.Black,
    marginBottom:9
  },
  optional:{
    color:Colors.Gray_Light,
    fontSize:16
  }
});
export default InputField;
