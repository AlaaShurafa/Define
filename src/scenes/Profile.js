import React, { useState } from 'react'
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import {AppText, Button, Error, Input, Link, BackButton, Header, Header2} from '../component'
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import * as yup from 'yup';
import { updateUser } from '../store/actions/auth';
import ImagePicker from 'react-native-image-crop-picker';
class Profile extends React.Component{
    state={
        email:'',
        emailError:false,
        
        mobile:'',
        mobileError:'',

        name:'',
        nameError:false,

        errors:{}
    }
    componentDidMount(){
        const { user } = this.props
        console.log(user,'user')
        this.setState({
            email:user?.email,
            name: user?.name,
            mobile: user?.mobile
        })
    }
    validate(email, mobile, name) {
        if (email === '' || mobile === '' || name === '') {
            email === '' ? this.setState({ emailError: true }) : this.setState({ emailError: false })
            mobile === '' ? this.setState({ mobileError: true }) : this.setState({ mobileError: false })
            name === '' ? this.setState({ nameError: true }) : this.setState({ nameError: false })
            return false
        }
        return true
    }
    updateButton = async () => {
        const { email, name, mobile, image } = this.state
        this.setState({ errors: {} })
        if (this.validate(email, mobile, name)) {
            try {

                await schema
                    .validate({
                        email,
                    },
                        { abortEarly: false })
                this.props.updateUser(email, name, mobile, image)
            }
            catch (error) {
                console.log(error)
                const objError = {};
                error.inner.forEach(fielderror => {
                    objError[fielderror.path] = fielderror.message;
                });
                return this.setState({ errors: objError });
            }
        }
    }

    changeAvatar = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropperCircleOverlay:true,
            cropping: true
          }).then(image => {
              this.setState({
                source : image.path,
                image,
              })
          });
    }

    render(){
        const {email, emailError,errors, nameError, name, mobileError, mobile} = this.state;
        return (
            <View style={styles.viewCont}>
               <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"}/>
                {/* <BackButton style={{alignSelf:'flex-end', marginRight:20, marginTop:10, tintColor:Colors.Main_Color}}/> */}
                <Header2 title={translate('app.profile')}/>
                <ScrollView 
                    contentContainerStyle={{flexGrow: 1,paddingHorizontal:'4.5%',}}
                    style={{width:'100%',flex:1}}>
                    <View style={{flex:1,justifyContent:'space-between'}}>
                        <View>
                            <View style={styles.info}>
                                <TouchableOpacity onPress={this.changeAvatar}>
                                    {/* <Image source={require('../assets/images/img.jpg')} style={styles.avatar}/> */}
                                    <Image source={{uri:this.state.source ?? this.props.user?.avatar}} style={styles.avatar}/>
                                </TouchableOpacity>
                                <View>
                                    <AppText style={styles.text} semibold>{this.props.user?.name}</AppText>
                                    <AppText style={styles.text} semibold>{this.props.user?.email}</AppText>
                                </View>
                            </View>
                            <Input
                                isRequired={nameError}
                                value={name}
                                onChangeText={(name)=>{
                                    this.setState({nameError:false,name})
                                    }
                                }
                                label={translate('app.full_name')}
                                placeholder={translate('auth.username')}
                            />
                            <Input
                                keyboardType="email-address"
                                isRequired={emailError}
                                label={translate('auth.email')}
                                value={email}
                                onChangeText={(email)=>{
                                    this.setState({emailError:false,email})
                                    }
                                }
                                placeholder={translate('auth.email')}
                            />
                            {errors.email && <Error>{translate('auth.error_email')}</Error>}
                            <Input
                                keyboardType="phone-pad"
                                isRequired={mobileError}
                                value={mobile}
                                onChangeText={(mobile)=>{
                                    this.setState({mobileError:false,mobile})
                                    }
                                }
                                label={translate('auth.phone')}
                                placeholder={translate('auth.phone')}
                            />
                            <Link
                                style={{ marginTop: 8, fontSize:15}}
                                onPress={() => this.props.navigation.navigate('ChangePassword')}
                            >{translate('auth.change_password')}</Link>
                        </View>
                        <Button
                            onPress={()=>this.updateButton()} 
                            buttonStyle={styles.button}
                            style={{marginTop:20}}
                            >{translate('app.update')}</Button>
                    </View>

                </ScrollView>
            </View>
        )
    }
}
let schema = yup.object().shape({
    email: yup.string().email(),
});
const styles = StyleSheet.create({
    viewCont:{
        flex:1,
        backgroundColor:Colors.White,
        alignItems:'center',
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:11
    },
    button:{
        width:'100%',
        marginBottom:30
    },
    info:{
        backgroundColor:Colors.Main_Color,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:24,
        paddingHorizontal:18,
        marginTop:22
    },
    avatar:{
        width:70,
        height:70,
        borderRadius:35,
        
    },
    text:{
        color:Colors.White,
        fontSize:16,
        marginLeft:9
    }
})
const mapStateToProps = ({auth}) =>{
    return({
        user:auth.user
    })
}
export default connect(mapStateToProps , { updateUser })(Profile)