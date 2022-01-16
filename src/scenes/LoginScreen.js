import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, StatusBar, ScrollView } from 'react-native';
import { AppText, Input, Button, Link, Loader, Error } from '../component';
import { connect } from 'react-redux'
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import { loginUser, loginGuest} from '../store/actions/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as yup from 'yup';
import { Platform } from 'react-native';
class Login extends React.Component {
    state = {
        email: '',
        emailError: false,

        password: '',
        passwordError: '',
        errors: {},
    }

    validate(email, password) {
        if (email === '' || password === '') {
            email === '' ? this.setState({ emailError: true }) : this.setState({ emailError: false })
            password === '' ? this.setState({ passwordError: true }) : this.setState({ passwordError: false })
            return false
        }
        return true
    }
    LoginButton = async () => {
        const { email, password } = this.state
        this.setState({ errors: {} })
        if (this.validate(email, password)) {
            try {

                await schema
                    .validate({
                        email,
                    },
                        { abortEarly: false })
                this.props.loginUser(email, password, 0)


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

    loginGuest = () =>{
        this.props.loginGuest(true)
    }
    render() {
        const { password, passwordError, email, emailError, errors, provider } = this.state;
        const { navigate } = this.props.navigation
        return (
            <View style={styles.cont}>
                <StatusBar backgroundColor={Colors.Main_Color} />
                <ScrollView>
                {/* <Loader 
                    loading={this.props.loadingLogin}
                /> */}
                <View style={Platform.OS == 'ios' && {paddingTop:30}}>
                    <View style={{alignItems:'center',marginTop:37}}>
                        <AppText semibold style={[{ color: Colors.Black, fontSize: 30 }, 
                            Platform.OS == 'ios' && {lineHeight:35}]}>{translate('auth.welcome')}</AppText>
                        <Image source={require('../assets/images/logo.png')} style={styles.imgLogo}/>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <Input
                            keyboardType="email-address"
                            isRequired={emailError}
                            label={translate('auth.email')}
                            value={email}
                            onChangeText={(email) => {
                                this.setState({ emailError: false, email })
                            }
                            }
                            placeholder={translate('auth.email')}
                        />
                        {errors.email && <Error>{translate('auth.error_email')}</Error>}
                        <Input
                            isRequired={passwordError}
                            value={password}
                            onChangeText={(password) => {
                                this.setState({ passwordError: false, password })
                            }
                            }
                            label={translate('auth.password')}
                            placeholder='•••••••••'
                            type="password"
                        />
                       
                        <Link
                            style={{ color: Colors.grey, marginTop: 8 }}
                            onPress={() => navigate('ForgetPassword')}
                        >{translate('auth.forgot_password')}</Link>
                    </View>
                    <View>
                        <Link
                            style={{ color: Colors.Main_Color, fontSize: 15, alignSelf:'center', marginTop:10}}
                            onPress={this.loginGuest}>{translate('auth.login_guest')}</Link>
                    </View>
                    <Button
                        onPress={() => this.LoginButton()}
                        style={styles.button}>{translate('auth.sign_in')}</Button>
                </View>
                
                    <View style={styles.no_account}>
                        <AppText regular style={{ fontSize: 15, color: Colors.Gray_Light }}>{translate('auth.no_account')} </AppText>
                        <Link
                            style={{ color: Colors.Main_Color, fontSize: 15 }}
                            onPress={() => navigate('SignUp')}>{translate('auth.sign_up')}</Link>
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
    cont: {
        flex: 1,
        backgroundColor: Colors.White,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 18,
    },
    span: {
        color: Colors.Main_Color,
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        marginTop: 60
    },
    no_account: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        // alignSelf:'flex-end'
    },
    imgLogo:{
        // width:164,
        height:80,
        resizeMode:'contain',
        marginTop:12,
        tintColor:Colors.Main_Color

    }
})

export default connect(null, { loginUser, loginGuest})(Login)