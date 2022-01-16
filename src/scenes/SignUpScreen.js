import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { connect } from 'react-redux'
// import Geolocation from 'react-native-geolocation-service';
// import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AppText, Input, Button, Link, Loader, Error } from '../component';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import { signUpUser } from '../store/actions/auth'
import * as yup from 'yup';
class SignUp extends React.Component {
    state = {
        email: '',
        emailError: false,

        password: '',
        passwordError: '',


        mobile: '',
        mobileError: '',

        name: '',
        nameError: false,

        cvr_nr: '',
        cvr_nrError: false,

        city: '',
        cityId:1,
        cityError: false,

        privacy: true,
        privacyError:false,
        errors: {}
    }

    validate(email, password, mobile, name, privacy, city, cvr_nr) {
        if (email === '' || password === '' || mobile === '' || name === '' || !privacy) {
            email === '' ? this.setState({ emailError: true }) : this.setState({ emailError: false })
            password === '' ? this.setState({ passwordError: true }) : this.setState({ passwordError: false })
            mobile === '' ? this.setState({ mobileError: true }) : this.setState({ mobileError: false })
            name === '' ? this.setState({ nameError: true }) : this.setState({ nameError: false })
            city === '' ? this.setState({ cityError: true }) : this.setState({ cityError: false })
            cvr_nr === '' ? this.setState({ cvr_nrError: true }) : this.setState({ cvr_nrError: false })
            !privacy ? this.setState({ privacyError: true }) : this.setState({ privacyError: false })
            return false
        }
        return true
    }
    signUpButton = async () => {
        const { email, password, name, mobile, privacy, city, cityId, cvr_nr } = this.state
        console.log(cityId , 'cityId')
        this.setState({ errors: {} })
        if (this.validate(email, password,mobile, name, privacy, city, cvr_nr)) {
            try {

                await schema
                    .validate({
                        email,
                        password
                    },
                    { abortEarly: false })
                    this.props.signUpUser(email, password, name, mobile,cityId, cvr_nr)
                    // if (Platform.OS === 'ios') {
                    //     Geolocation.getCurrentPosition(
                    //         async(position) => {
                    //             this.props.signUpUser(email, password, name, mobile,cityId,position)
                    //         },
                    //         (er) => {
                    //         console.log(er)
                    //         },
                    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    //     );
                    // }
                    // else{
                    //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //         Geolocation.getCurrentPosition(
                    //             async(position) => {
                    //                 this.props.signUpUser(email, password, name, mobile,cityId,position)
                    //             },
                    //             (er) => {
                    //             console.log(er)
                    //             },
                    //             { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                    //         );
                    //     }       
                    //     else {
                    //         console.log("location permission denied")
                    //         alert("Location permission denied");
                    //     }
                    // }
                
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
    render() {
        const { password, passwordError, email, emailError, errors, nameError, name, mobileError, mobile, privacy, privacyError, city, cityError, cvr_nr, cvr_nrError } = this.state;
        const { push } = this.props.navigation
        return (
            <View style={styles.cont}>
                {/* <Loader 
                    loading={this.props.loadingLogin}
                /> */}
                <View style={[{ flex: 1 }, Platform.OS=='ios'&& {paddingTop:30}]}>
                    <AppText semibold style={[{ color: Colors.Black, fontSize: 30, 
                        textAlign:'center',marginTop:37 }, Platform.OS == 'ios' && {lineHeight:35}]}>{translate('auth.create_account')}</AppText>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '90%', alignSelf: 'center', flex: 1 }}>
                        <Input
                            isRequired={nameError}
                            value={name}
                            onChangeText={(name) => {
                                this.setState({ nameError: false, name })
                            }
                            }
                            label={translate('app.full_name')}
                            placeholder={translate('app.full_name')}
                        />
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
                            keyboardType="phone-pad"
                            isRequired={mobileError}
                            value={mobile}
                            onChangeText={(mobile) => {
                                this.setState({ mobileError: false, mobile })
                            }
                            }
                            label={translate('auth.phone')}
                            placeholder={translate('auth.phone')}
                        />
                        <Input
                            keyboardType="phone-pad"
                            isRequired={cvr_nrError}
                            value={cvr_nr}
                            onChangeText={(cvr_nr) => {
                                this.setState({ cvr_nrError: false, cvr_nr })
                            }
                            }
                            label={translate('auth.cvr')}
                            placeholder={translate('auth.cvr')}
                        />
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
                        {errors.password && <Error>{translate('auth.error_password')}</Error>}
                        {/* <RNPickerSelect
                            placeholder={{label:translate('auth.select_city'),value:'',color:'#888888'}}
                            onValueChange={(city,index) => {
                                
                                console.log({id:this.props.Countries[index-1], index, city} , 'city')
                                this.setState({city,cityError:false,
                                    cityId: this.props.Countries[index-1]?.key
                                })
                            }
                            }
                            items={this.props.Countries}
                        >
                            <Input
                                label={translate('auth.select_city')}
                                isRequired={cityError}
                                value={city}
                                type="select"
                                placeholder={translate('auth.select_city')}
                            /> 
                        </RNPickerSelect> */}
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ privacy: !privacy, privacyError:false })}
                                style={[styles.check, privacy && { backgroundColor: Colors.Main_Color, borderWidth: 0 }]}>
                                {privacy && <Icon
                                    name="check"
                                    color={Colors.White}
                                />}
                            </TouchableOpacity>
                            <AppText semibold style={{ fontSize: 11, color: Colors.grey }}>{translate('auth.agree')} </AppText>
                            <Link
                                onPress={() => push('Privacy')}
                            > {translate('app.privacy')}</Link>
                        </View>
                        {privacyError && <Error>{translate('auth.agree_error')}</Error>}
                        <Button
                            onPress={() => this.signUpButton()}
                            style={styles.button}> {translate('auth.sign_up')}</Button>
                        <View style={styles.no_account}>
                            <AppText regular style={{ fontSize: 15, color: Colors.Gray_Light }}>{translate('auth.have_account')} </AppText>
                            <Link
                                style={{ color: Colors.Main_Color, fontSize: 15 }}
                                onPress={() => push('Login')}> {translate('auth.sign_in')}</Link>
                        </View>
                    </ScrollView>

                </View>

            </View>
        )
    }
}
let schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(6)
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
    check: {
        borderWidth: 1,
        borderColor: Colors.grey_Border,
        width: 15,
        height: 15,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }
})
const mapStateToProps = ({app}) =>{
    return {
        Countries: app.appData?.Countries
    }
}
export default connect(mapStateToProps, { signUpUser })(SignUp)