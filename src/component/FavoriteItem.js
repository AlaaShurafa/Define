import React from 'react';
import {View, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Black, Green, grey, Main_Color_op, White} from '../styles/Colors';
import AppText from './AppText';
import {Main_Color, grey_Background_Light, grey_Text} from '../styles/Colors';
import {translate} from '../translations/i18n';
import RenderHtml from 'react-native-render-html';
// import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

export default Item = ({style, item, orderDetails, fav, navigation}) => {
  console.log(item, 'item');
  return (
    <TouchableOpacity
      activeOpacity={fav ? 0.5 : 1}
      onPress={() => fav && navigation.navigate('ItemDetails', {item})}
      style={{flex: 1}}>
      <View style={[styles.rowCont, style, {flex: 1}]}>
        <View style={[styles.rowView, {paddingBottom: 10}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 4,
              flexGrow: 1.5,
            }}>
            <View
              style={[
                {marginRight: 11, borderRadius: 9},
                item?.Media?.length == 0 && {backgroundColor: Main_Color},
              ]}>
              <Image
                source={
                  item?.Media?.length > 0
                    ? {uri: item?.Media[0].file}
                    : require('../assets/images/logo.png')
                }
                style={[
                  styles.img,
                  item?.Media?.length == 0 && {resizeMode: 'contain'},
                ]}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <AppText style={[styles.title]} semibold>
                {item?.name}
              </AppText>
              {/* <AppText style={[styles.grey,{lineHeight:15}]} numberOfLines={2} semibold>{item?.description}</AppText> */}
              {/* <RenderHtml
                        contentWidth={'100%'}
                        source={{
                            html:item?.description
                        }}
                    /> */}

              {  orderDetails && <AppText style={styles.grey} semibold>{translate('app.count')}= {item?.Quantity}</AppText>}
            </View>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1, marginLeft: 10}}>
            <AppText style={styles.orange} semibold>{`${item?.price?.toFixed(
              2,
            )}${translate('app.currency')}`}</AppText>
          </View>
        </View>

        {orderDetails && (
            <>
           {item?.color && <View style={[styles.rowView, {paddingTop: 5}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AppText regular style={styles.option_name}>{translate('app.color')} </AppText>
                    {/* <AppText regular>{item.color}</AppText> */}
                    <View style={[styles.color, {backgroundColor: item?.color}]} />

                </View>
              </View>}
              {item?.OrderProductOption.map((item, index)=>{
              return <View style={[styles.rowView, {paddingTop: 5}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AppText regular style={styles.option_name}>{item.option_name} : </AppText>
                  <AppText regular>{item.product_option}</AppText>
              </View>
              {/* <AppText style={styles.orange} semibold>{`${item?.price}${translate('app.currency')}`}</AppText> */}
            </View>
            })}
          {/* <FlatList
            data={item?.OrderProductOption}
            renderItem={({item}) => (
              <View style={[styles.rowView, {paddingTop: 5}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AppText regular style={styles.option_name}>{item.option_name} : </AppText>
                    <AppText regular>{item.product_option}</AppText>
                </View>
                <AppText style={styles.orange} semibold>{`${item?.price}${translate('app.currency')}`}</AppText>
              </View>
            )}
          /> */}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rowCont: {
    marginBottom: 27,
    backgroundColor: grey_Background_Light,
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
  },
  title: {
    fontSize: 17,
    color: Black,
  },
  grey: {
    fontSize: 14,
    color: grey,
  },
  orange: {
    fontSize: 17,
    color: Main_Color,
  },
  mainColor: {
    fontSize: 13,
    color: Main_Color,
    width: '60%',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  time: {
    color: Green,
    fontSize: 11,
  },
  img: {
    width: 74,
    height: 61,
    borderRadius: 9,
  },
  option_name: {
    fontSize: 17,
    color: Black,
  },
  color: {
    backgroundColor: Black,
    width: 18,
    height: 18,
    borderRadius: 18,
    marginTop:-5
  },
});
