import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { BackButton, HeaderText, Input, Button, AppText, Error, Loader, Header2 } from '../component';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import { connect } from 'react-redux';
import { ChangeUserPassword } from '../store/actions/auth'

import * as yup from 'yup';


class ChangePassword extends React.Component {
    state = {

        cPassword: '',
        cPasswordError: '',

        password: '',
        passwordError: '',

        rePassword: '',
        rePasswordError: '',

        passwordConfirmation: false,

        errors: {}


    }
    validate(cPassword, password, rePassword) {
        if (cPassword === '' || password === '' || rePassword === '') {
            cPassword === '' ? this.setState({ cPasswordError: true }) : this.setState({ cPasswordError: false })
            password === '' ? this.setState({ passwordError: true }) : this.setState({ passwordError: false })
            rePassword === '' ? this.setState({ rePasswordError: true }) : this.setState({ rePasswordError: false })
            return false
        }
        return true
    }
    passwordConfirmation(password, rPassword) {
        if (password === rPassword) {
            this.setState({ passwordConfirmation: false })
            return true
        }
        else {
            this.setState({ passwordConfirmation: true })
            return false
        }
    }
    ChangePasswordButton = async () => {
        const { cPassword, password, rePassword } = this.state
        this.setState({ errors: {} })
        if (this.validate(cPassword, password, rePassword) && this.passwordConfirmation(password, rePassword)) {
            try {

                await schema
                    .validate({
                        password,
                        rePassword,
                    },
                        { abortEarly: false })
                await this.props.ChangeUserPassword(cPassword, password, rePassword)

            }
            catch (error) {
                console.log(error, 'error')
                const objError = {};
                error.inner.forEach(fielderror => {
                    console.log(fielderror, 'fff')
                    objError[fielderror.path] = fielderror.message;
                });
                return this.setState({ errors: objError });
            }
        }
    }
    render() {
        const { password, passwordError,
            rePassword, rePasswordError, errors,
            cPassword, cPasswordError, passwordConfirmation
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.cont} showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: '4.5%', paddingTop: 20, flex: 1 }}>
                        <Header2 title= {translate('auth.change_password')}/>
                        <View>
                            <Input
                                isRequired={cPasswordError}
                                value={cPassword}
                                onChangeText={(cPassword) => {
                                    this.setState({ cPasswordError: false, cPassword })
                                }
                                }
                                iconName="lock-outline"
                                placeholder={translate('auth.cPassword')}
                                type="password"
                            />
                            <Input
                                isRequired={passwordError}
                                value={password}
                                onChangeText={(password) => {
                                    this.setState({ passwordError: false, password })
                                }
                                }
                                iconName="lock-outline"
                                placeholder={translate('auth.password')}
                                type="password"
                            />
                            <Input
                                isRequired={rePasswordError}
                                value={rePassword}
                                onChangeText={(rePassword) => {
                                    this.setState({ rePasswordError: false, rePassword })
                                }
                                }
                                iconName="lock-outline"
                                placeholder={translate('auth.rePassword')}
                                type="password"
                            />
                            {errors.password && <Error>{translate('auth.error_password')}</Error>}
                        </View>


                        <View style={styles.password_confirm}>
                            {passwordConfirmation &&
                                <AppText regular style={{ color: Colors.Red }}>{translate('auth.confirm_password')}</AppText>}
                        </View>

                        <Button
                            onPress={() => this.ChangePasswordButton()}
                            style={styles.button}>{translate('auth.verify')}</Button>
                    </View>

                </ScrollView>
            </View>
        )
    }
}
let schema = yup.object().shape({
    password: yup.string().min(6),
    rePassword: yup.string().min(6),
});
const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: Colors.White
    },
    text: {
        fontSize: 18,
    },
    header: {
        marginHorizontal: '5%',
        marginTop: 10,
        marginBottom: 50
    },
    span: {
        color: Colors.Gray,
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        marginVertical: 36
    },
    link: {
        alignSelf: 'flex-end',
        marginRight: '5%'
    },
    no_account: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
    },
    password_confirm: {
        width: '95%',
        alignItems: 'center'
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        alignSelf: 'center'
    }
})
export default connect(null, { ChangeUserPassword })(ChangePassword);