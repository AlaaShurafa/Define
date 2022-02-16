import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  AppText,
  SearchBar,
  Carousel,
  Header,
  FoodItem,
  MostOrderedItem,
} from '../component';
import * as Colors from '../styles/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {getFoods, getCategories} from '../store/actions/app';
import {loginGuest} from '../store/actions/auth';
import {translate} from '../translations/i18n';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default Home = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {categories, loadingCategories, foods, loadingMostOrder, user} =
    useSelector(({app, auth}) => ({
      categories: app.categories,
      loadingCategories: app.loadingCategories,
      loadingMostOrder: app.loadingMostOrder,
      user: auth.user,
      foods: app.foods,
    }));
  const getCategoriesData = () => dispatch(getCategories());
  useEffect(() => {
    getCategoriesData();
  }, []);
  const favBtn =  () =>{
    if(user){
        navigation.navigate('Favorites')
    }
    else{
        Alert.alert(
            translate('auth.sign_in'),
            null,
            [
              { text: "CANCEL", onPress: () => null},
              { text: "OK", onPress: () => dispatch(loginGuest(false))}
            ]
          );
    }
 
    
}
  return (
    <View style={styles.viewCont}>
      <StatusBar
        backgroundColor={Colors.Main_Color}
        animated={true}
        barStyle={'light-content'}
      />

      <Header
        title={translate('app.app')}
        style={Platform.OS == 'ios' && {height: 90, paddingTop: 30}}
      />
      <View style={{paddingHorizontal: '4.5%', paddingTop: 20, flex: 1}}>
        {!loadingCategories ? (
          <FlatList
            data={categories}
            ListHeaderComponent={() => {
              return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={favBtn}
                    style={[styles.btn, {backgroundColor: Colors.Red}]}>
                        <Icon name="heart" color={Colors.White} size={60}/>
                    {/* <Image
                      source={{uri: item?.image}}
                      style={{width: 60, height: 60, resizeMode: 'contain'}}
                    /> */}
                    <AppText bold style={{color: Colors.White, fontSize: 24}}>
                      {translate('app.fav')}
                    </AppText>
                  </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{paddingTop: 5}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
              item.parent_id == null && <Item item={item} />
            }
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={refreshing}
                onRefresh={getCategoriesData}
              />
            }
          />
        ) : (
          <ActivityIndicator color={Colors.Main_Color} />
        )}
      </View>
    </View>
  );
};
const Item = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        item?.id == 2
          ? navigation.navigate('NewCategories', {title: item?.name, item})
          : navigation.navigate('NewProducts', {title: item?.name, item});
      }}
      style={[styles.btn, {backgroundColor: item?.color}]}>
      <Image
        source={{uri: item?.image}}
        style={{width: 60, height: 60, resizeMode: 'contain'}}
      />
      <AppText bold style={{color: Colors.White, fontSize: 24}}>
        {item?.name}
      </AppText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewCont: {
    flex: 1,
    backgroundColor: Colors.White,
    // alignItems:'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 11,
  },
  btn: {
    width: '100%',
    height: 140,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
});
