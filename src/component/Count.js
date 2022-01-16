import React from 'react';
import {View, StyleSheet} from 'react-native'
import CountDown from 'react-native-countdown-component';
import {Link} from './NisrText';
import {Main_Color,Gray_Light} from '../styles/Colors'
import { translate } from '../translations/i18n';
class Count extends React.Component{

    state={
        resend : false
    }
     render() {
         const {resend} =this.state
         return (
             <View style={styles.cont}>
                 <CountDown
                 until={ 5}
                 size={13}
                 onFinish={() =>this.setState({resend:true})}
                 digitStyle={{backgroundColor: '#FFF',width:20}}
                 digitTxtStyle={{color: Main_Color}}
                 timeToShow={['M', 'S']}
                 timeLabels={{m: null, s: null}}
                 separatorStyle={{color:Main_Color}}
                 showSeparator
               />
               {resend? 
               <Link
                    style={styles.link}
                    onPress={this.props.onPress}
                >{translate('code.resend')}</Link> :null}
             </View>
         )
     }
 }
const styles = StyleSheet.create({
    cont:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:15
    },
    link:{
        color:Gray_Light,
        fontSize:16
    }
})
 export default Count