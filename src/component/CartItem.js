import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Black, Green, grey, orange, White, Main_Color} from '../styles/Colors'
import AppText from './AppText'
import CountButton from './CountButtons';
import { translate } from '../translations/i18n';
export default Item = ({ style, item, onAdd, total,onMinus }) => {
    let price = 0
    if(item?.deliveryItem){
        price = item?.price - parseFloat(item?.deliveryItem?.price)
    }
    else{
        price = item?.price
    }
    return (
        <View style={[styles.rowView, styles.rowCont, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                {/* <View style={[styles.img,{marginRight:0}]}> */}
                    <Image source={item?.Media?.length > 0 ? {uri:item?.Media[0].file} : require('../assets/images/logo.png')} style={[styles.img]} />
                {/* </View> */}
                <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 1 }}>
                    <AppText style={styles.title} semibold>{item?.name}</AppText>
                    <AppText style={styles.grey} semibold>{item?.size}</AppText>
                    <AppText style={styles.orange} semibold>{`${price.toFixed(2)} ${translate('app.currency')}`}</AppText>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <CountButton
                    value={item?.quantity}
                    onAdd={() => onAdd(item.id)}
                    onMinus={() => onMinus(item.id)}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    rowCont: {
        marginBottom: 20,
        backgroundColor: '#FBFBFB',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    markLabel: {
        color: White,
        backgroundColor: Green,
        width: 50,
        textAlign: 'center',
        borderRadius: 15,
        fontSize: 10,
        paddingVertical: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,

    },
    title: {
        fontSize: 15,
        color: Black
    },
    grey: {
        fontSize: 12,
        color: grey,
    },
    orange: {
        fontSize: 13,
        color: orange,
    },
    mainColor: {
        fontSize: 13,
        color: Main_Color,
        width: '60%',
        textAlign: 'center',
        alignSelf: 'flex-end'
    },
    time: {
        color: Green,
        fontSize: 11
    },
    img: {
        width: 70,
        height: 59,
        marginRight: 11,
        backgroundColor: Main_Color,
        borderRadius: 9,
    }

})