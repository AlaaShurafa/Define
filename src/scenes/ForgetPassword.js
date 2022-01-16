import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Image, StatusBar, ScrollView } from 'react-native'
import { BackButton, Input, Button, HeaderText, AppText, Error, Header2 } from '../component'
import * as Colors from '../styles/Colors'
import { sendEmailCode } from "../store/actions/auth";
import { translate } from '../translations/i18n';
import { useDispatch } from 'react-redux'
import * as yup from 'yup'; 
export default ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailValid, setEmailVaild] = useState(false)
    const dispatch = useDispatch();
    const sendCode = (email) => dispatch(sendEmailCode(email))

    const sendCodeButton = async () => {
        if (email !== '') {
            try {
                await schema
                    .validate({
                        email,
                    },
                        { abortEarly: false })
                    sendCode(email)
            }
            catch (error) {
                const objError = {};
                error.inner.forEach(fielderror => {
                    objError[fielderror.path] = fielderror.message;
                });
                setEmailVaild(true);
            }
        }
        else{
            setEmailError(true)
            console.log(emailError)
        }

    }
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"} />
            <View style={{ paddingHorizontal: '4.5%', paddingTop: 20, flex: 1 }}>
                <Header2 title={translate('auth.restore_password')}/>
                <ScrollView

                    showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <AppText semibold style={styles.title}>{translate('auth.restore_password')}</AppText>
                    <AppText semibold style={styles.title2}>{translate('auth.enter_email')}</AppText>
                    <Input
                        keyboardType="email-address"
                        isRequired={emailError}
                        value={email}
                        onChangeText={(email) => {
                            setEmail(email)
                            setEmailError(false)
                        }
                        }
                        placeholder={translate('auth.email')}
                        />
                        {emailValid && <Error>{translate('auth.error_email')}</Error>}
                    <Button
                        onPress={() => sendCodeButton()}
                        buttonStyle={{ width: '100%', marginTop: 60 }}>{translate('auth.send_code')}</Button>
                </ScrollView>
            </View>
        </View>
    )
}
let schema = yup.object().shape({
    email: yup.string().email(),
});
const styles = StyleSheet.create({
    viewCont: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        alignSelf: 'center'
    },
    title: {
        color: Colors.Black,
        fontSize: 28,
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    title2: {
        color: Colors.grey_Text,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 50
    },
})