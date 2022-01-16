import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, I18nManager, ScrollView} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Black, Main_Color_op, Main_Color, White } from '../styles/Colors';
import AppText from './AppText'
import Switch from './Switch'
import { connect, useSelector } from 'react-redux';
import { logout, loginGuest } from '../store/actions/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import deviceStorage from '../services/deviceStorage'
import {setI18nConfig, translate} from '../translations/i18n' 
import { Platform } from 'react-native';
function CustomDrawerContent(props) {
    const [switchLang, setSwitchLang] = useState(true)
    const { user } = useSelector(({ auth }) => ({
        user: auth.user,
    }))
    useEffect(()=>{
        I18nManager.isRTL ? setSwitchLang(false) : setSwitchLang(true)
    },[])
    return (
        <ScrollView
            contentContainerStyle={{ justifyContent: 'space-between', paddingBottom: 20}}
            style={{ flex: 1, flexGrow: 1, }}
            {...props}>
            <View >
                <View style={styles.header}>
                    <Image source={require('../assets/images/logo.png')} style={{height:'100%', resizeMode:'contain', }} />
                </View>
                <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'home'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.home')}</AppText>}
                    onPress={() => props.navigation.navigate('NewHome')}
                />
                {user  && <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'account'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.profile')}</AppText>}
                    onPress={() => props.navigation.navigate('Profile')}
                />}
               <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'cart'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.cart')}</AppText>}
                    onPress={() => props.navigation.navigate('Cart')}
                />
           
               {user && <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'order-bool-ascending'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.orders')}</AppText>}
                    onPress={() => props.navigation.navigate('Orders')}
                />}
                <DrawerItem
                    // style={{backgroundColor:'pink'}}
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'eye-outline'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.privacy')}</AppText>}
                    onPress={() => props.navigation.navigate('Privacy')}
                />
                {user && <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'phone'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.contact')}</AppText>}
                    onPress={() => props.navigation.navigate('Tickets')}
                />}
                <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'information-outline'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.about')}</AppText>}
                    onPress={() => props.navigation.navigate('About')}
                />
               {user && 
               <>
                    <DrawerItem
                        icon={() =>
                            <View style={styles.icon}>
                                <Icon color={White} size={22} name={'heart'} />
                            </View>
                        }
                        label={({ focused, color }) => <AppText semibold
                            style={{ color: Black, fontSize: 15 }}>{translate('app.fav')}</AppText>}
                        onPress={() => props.navigation.navigate('Favorites')}
                    />
                    {/* <DrawerItem
                        icon={() =>
                            <View style={styles.icon}>
                                <Icon color={White} size={22} name={'map'} />
                            </View>
                        }
                        label={({ focused, color }) => <AppText semibold
                            style={{ color: Black, fontSize: 15 }}>{translate('app.locations')}</AppText>}
                        onPress={() => props.navigation.navigate('Locations')}
                    /> */}
                    <DrawerItem
                        icon={() =>
                            <View style={styles.icon}>
                                <Icon color={White} size={22} name={'hand-heart'} />
                            </View>
                        }
                        label={({ focused, color }) => <AppText semibold
                            style={{ color: Black, fontSize: 15 }}>{translate('app.points')}</AppText>}
                        onPress={() => props.navigation.navigate('Points')}
                    />
                </>
                }
           
                <DrawerItem
                    icon={() =>
                        <View style={styles.icon}>
                            <Icon color={White} size={22} name={'alphabet-latin'} />
                        </View>
                    }
                    label={({ focused, color }) => <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        
                            <AppText semibold
                            style={{ color: Black, fontSize: 15 }}>{translate('app.lang')}</AppText>
                            {/* <Switch 
                                onValueChange = {async (value)=>{
                                    setSwitchLang(value)
                                    await deviceStorage.saveItem('lang', I18nManager.isRTL ? 'en' : 'ar')
                                    setI18nConfig();
                                }}
                                value={switchLang}/> */}
                        </View>

                    }
                    onPress={async()=>{
                        props.navigation.navigate('Language')
                        // setSwitchLang(!switchLang)
                        // await deviceStorage.saveItem('lang', I18nManager.isRTL ? 'sw' : 'sw')
                        // setI18nConfig();
                    }}
                />
            </View>
           {user &&  <View>
                <DrawerItem
                    icon={({ focused, color, size }) =>
                        <View style={[styles.icon, { backgroundColor: '#E50001', marginLeft: 20,  }]}>
                            <Icon color={White} size={22} name={'logout'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('app.log_out')}</AppText>}
                    onPress={() => props.logout()}
                />
            </View>}
           {!user &&  <View>
                <DrawerItem
                    icon={({ focused, color, size }) =>
                        <View style={[styles.icon, { backgroundColor: '#E50001', marginLeft: 20,  }]}>
                            <Icon color={White} size={22} name={'account'} />
                        </View>
                    }
                    label={({ focused, color }) => <AppText semibold
                        style={{ color: Black, fontSize: 15 }}>{translate('auth.sign_in')}</AppText>}
                    onPress={() => props.loginGuest(false)}
                />
            </View>}

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    header: {
        marginTop:-5,
        paddingTop:30,
        backgroundColor:Main_Color,
        alignItems:'center',
        paddingBottom:30,
        height:200
        // paddingHorizontal: 13,
        // borderColor:grey,
        // borderStyle:'dashed',
        // borderWidth:1

    },
    text: {
        color: Main_Color,
        fontSize: 24,
    },
    icon: {
        backgroundColor: Main_Color,
        padding: 8,
        justifyContent: 'center',
        borderRadius: 11,
        alignItems: 'center'
    },
})

// export default CustomDrawerContent
export default connect(null,{logout, loginGuest})(CustomDrawerContent)