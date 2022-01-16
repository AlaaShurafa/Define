import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import {AppText, Button} from '.';
import {connect} from 'react-redux'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as  Colors  from '../styles/Colors';
import { translate } from '../translations/i18n';

import * as yup from 'yup'; 

class ModalMap extends React.Component {
    state={
        e_payment:false
    }

    render(){
        const {
          visible,
          organizer_name,
          closeModal,
          sendButton,
          onPress,
          ...attributes
        } = this.props;
        

        return (
          <Modal
            transparent={true}
            animationType={'none'}
            visible={visible}
            >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Icon 
                            name="close"
                            color={Colors.Main_Color}
                            size={25}
                        />
                    </TouchableOpacity>
                    <AppText
                        regular
                        style={styles.label}
                    >{translate('app.payment_method')}</AppText>

                    
                    {this.state.e_payment && <AppText
                        regular
                        style={styles.label}
                    >{translate('app.no_payment')}</AppText>}
                 
              <View style={[styles.buttonsCont,{flexDirection:'row'}]}>
                       <Button                             
                            style={styles.button}
                            buttonStyle={[styles.buttonStyle,{marginRight:10}]}
                            onPress = {()=>this.setState({e_payment:true})}
                            textButton={{fontSize:15}}
                            outline> 
                            {translate('app.e_payment')}
                        </Button>
                        <Button 
                            style={[styles.button]} 
                            buttonStyle={[styles.buttonStyle]}
                            onPress = {onPress}
                            >
                                <AppText semibold style={{color:Colors.White,fontSize:15}}>{translate('app.payment')}</AppText>
                        </Button>
                    </View>
                </View>
            </View>
          </Modal>
        )
    }
}
let schema = yup.object().shape({
    phoneNumber:yup.number(),
  });
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop:10,
    paddingBottom:30,
  },
    
    label:{
        fontSize:17,
        lineHeight:35,
        color:Colors.Black,
        width:'90%',
        alignSelf:'center',
        color:Colors.Gray_Light
      },
      closeButton:{
        width:25,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        marginHorizontal:10,
    },
    buttonsCont:{
      width:'100%',
      // flexDirection:'row',
      justifyContent:'center',
      paddingVertical:18,
  },
  buttonStyle:{
    height:60,
    margin:0,
    width:'100%'
  },
  button:{
      width:'45%',
  },
});

export default ModalMap;