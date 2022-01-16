import React from 'react';
import { View, StyleSheet, Platform, Image, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, HeaderText, BackButton, } from '../component';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import { contactUsForm } from '../store/actions/app'
class ContactUs extends React.Component {
    state = {
        title: '',
        titleError: false,

        note: "",
        noteError: false,
    }

    validate(note, title) {
        if (title === '' || note === '') {
            title === '' ? this.setState({ titleError: true }) : this.setState({ titleError: false })
            note === '' ? this.setState({ noteError: true }) : this.setState({ noteError: false })
            return false
        }
        return true
    }
    sendButton = async () => {
        const { note, title } = this.state
        if (this.validate(note, title)) {
            this.props.contactUsForm(title, note)

        }
    }
    render() {
        const { titleError, title, note, noteError } = this.state;
        return (
            <View style={styles.cont}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1}}>

                    <View style={[styles.rowView, Platform.OS == 'ios' && {paddingTop:35}]}>
                        <View style={{width:30}}/>
                        <HeaderText style={styles.header}>{translate('app.contact')}</HeaderText>
                        <BackButton tintColor={Colors.Main_Color} />
                    </View>
                    <Image source={require('../assets/images/contact.png')} style={{ alignSelf: 'center' }} />
                    <View>
                        <Input
                            isRequired={titleError}
                            value={title}
                            onChangeText={(title) => {
                                this.setState({ titleError: false, title })
                            }
                            }
                            label={translate('app.title')}
                            placeholder={translate('app.title')}
                        />
                        <Input
                            isRequired={noteError}
                            value={note}
                            onChangeText={(note) => {
                                this.setState({ noteError: false, note })
                            }
                            }
                            label={translate('app.message')}
                            inputStyle={{ height: 135, textAlignVertical: 'top',  }}
                            multiline = {true}
                        />
                        <Button
                            onPress={() => this.sendButton()}
                            buttonStyle={styles.button}
                        >{translate('app.send')}</Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
// let schema = yup.object().shape({
//     email: yup.string().email()
//   });
const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: Colors.White,
        justifyContent: 'space-between',
        paddingHorizontal:20
    },
    text: {
        fontSize: 18,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginVertical:11,
        // backgroundColor:'red'
    },
    header: {
        paddingTop: 20,
        paddingBottom: 27,
        alignSelf: 'center'
    },
    button: {
        marginTop: 30,
        width: '100%'
    },
})
export default connect(null, { contactUsForm })(ContactUs)