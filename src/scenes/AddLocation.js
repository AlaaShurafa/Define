import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Platform, Image, ScrollView, TouchableOpacity, } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Button, HeaderText, Error, Header2, MapLocation, AppText, } from '../component';
import * as Colors from '../styles/Colors'
import { translate } from '../translations/i18n';
import { addLocation } from '../store/actions/app'
import modal from '../store/reducers/modal';
export default AddLocation = ({ navigation }) => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false)
    const [location, setLocation] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [locationError, setLocationError] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const onAdd = () => dispatch(addLocation(lat, lng, address))
 
    const validate = () => {
        if (address === '' || location === '') {
            address === '' ? setAddressError(true) : setAddressError(false) 
            location === '' ? setLocationError(true) : setLocationError(false)
            return false
        }
        return true
    }
    const sendButton = async () => {
        if (validate()) {
            onAdd()
        }
    }
    const setPosition = (lat, lng) =>{
        setLocation(`${lat},${lng}`)
        setLat(lat)
        setLng(lng)
        setLocationError(false)
        setModalVisible(false)

    }
    return (
        <View style={styles.cont}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1}}>

                <Header2 title={translate('app.addlocation')}/>
                <View>
                    <Input
                        isRequired={addressError}
                        value={address}
                        onChangeText={(address) => {
                            setAddress(address)
                            setAddressError(false)
                        }
                        }
                        label={translate('app.address')}
                        placeholder={translate('app.address')}
                    />
                    <View>
                        <AppText semibold style={styles.label}>{translate('app.maplocation')}</AppText>
                        <TouchableOpacity 
                            onPress={()=>setModalVisible(true)}
                            style={styles.inputCont}>
                            <AppText style={styles.input}>{location}</AppText>
                        </TouchableOpacity>
                        {!!locationError && <Error style={{paddingTop:10}}>{translate('auth.req')}</Error>}
                    </View>
                    {/* <Input
                        isRequired={locationError}
                        value={location}
                        onChangeText={(location) => {
                            setLocation(location)
                            setLocationError(false)
                        }
                        }
                        label={translate('app.maplocation')}
                    /> */}
                    <Button
                        onPress={sendButton}
                        // onPress={()=>navigation.navigate('MapLocation')}
                        buttonStyle={styles.button}
                    >{translate('app.addlocation')}</Button>
                </View>
                <MapLocation 
                    visible={modalVisible}
                    onClose={()=>setModalVisible(false)} 
                    setPosition={setPosition}/>
            </ScrollView>
        </View>
    )
    
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
    label:{
        fontSize:16,
        color:Colors.Black,
        marginBottom:9,
        marginTop:20
      },
      inputCont:{
        color: '#919191',
        fontSize: 18,
        paddingVertical: 15,
        borderRadius:10,
        paddingHorizontal:15,
        backgroundColor:Colors.grey_Background_Light
      }
})
