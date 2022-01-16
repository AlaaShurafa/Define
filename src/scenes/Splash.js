import React from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { Main_Color, White } from '../styles/Colors';
import { connect } from 'react-redux'
import { AppText } from '../component'
import { is_logged_user } from '../store/actions/auth'
class Splash extends React.Component {
  componentDidMount(){
    this.props.is_logged_user()
  }
  render(){
      return (
        <View style={styles.cont}>
          <StatusBar hidden={true} />
          <ImageBackground 
            style={{width:'100%',height:'100%', alignItems:'center', justifyContent:'center'}}
            source={require('../assets/images/splash_bg.png')}>
          <Image source={require('../assets/images/logo.png')} style={{height:140,resizeMode:'contain', tintColor:Main_Color}} />
          </ImageBackground>
         
          {/* <AppText semibold style={styles.text}>Lets Order</AppText> */}
        </View>
      );
  }

}
const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    color: White,
    fontSize: 35,
    marginVertical: 5
  }
});
export default connect(null,{is_logged_user})(Splash)