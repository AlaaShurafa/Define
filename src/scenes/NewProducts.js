import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
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
import {getFoods, getMostOrdered, getMoreProducts} from '../store/actions/app';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '../translations/i18n';
export default Home = ({navigation, route}) => {
  const [tabIndex, setTabIndex] = useState(2);
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState(undefined);
  const dispatch = useDispatch();
  const {
    Categories,
    loadingFoods,
    foods,
    loadingMostOrder,
    searchProducts,
    pagingProducts,
    loadingMore,
  } = useSelector(({app}) => ({
    Categories: app.appData?.Categories,
    loadingFoods: app.loadingFoods,
    loadingMostOrder: app.loadingMostOrder,
    mostOrderFoods: app.mostOrderFoods,
    foods: app.foods,
    pagingProducts: app.pagingProducts,
    loadingMore: app.loadingMore,
    searchProducts: app.searchProducts,
  }));
  const {item} = route.params;
  const getMore = page =>
    dispatch(getMoreProducts(item?.id, null, 10, value, page));
    const getDataHome = () => dispatch(getFoods(item?.id, null, 10,value));

  // const getMostOrder = () => dispatch(getMostOrdered(item?.id, 1, 100));
  useEffect(() => {
    // getMostOrder();
    getDataHome();
  }, []);
  useEffect(() => {
    page > 1 && getMore(page);
  }, [page]);
  const onScroll = e => {
    let paddingToBottom = 10;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    var currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset ? 'down' : 'up';
    if (direction === 'down') {
      if (
        e.nativeEvent.contentOffset.y >=
        e.nativeEvent.contentSize.height - paddingToBottom
      ) {
        if (
          pagingProducts.last_page !== 1 &&
          pagingProducts.last_page >= page
        ) {
          setPage(page + 1);
          //   this.setState({isLoading: true});
          //   setTimeout(() => {
          // getMoreProducts();
          //   }, 20);
        }
      }
    }
  };
  const handleSearch = () => {
    dispatch(getFoods(item?.id, null, 10,value));
  };
  return (
    <View style={styles.viewCont}>
      <StatusBar
        backgroundColor={Colors.Main_Color}
        animated={true}
        barStyle={'light-content'}
      />
      <View
        style={{width: '100%', flex: 1}}>
        <Header title={route?.params?.title} backBtn />
        <View style={{marginTop:-20}}>
            <SearchBar value={value} setValue={setValue} onSubmit={handleSearch}/>
        </View>
        <View style={styles.rowView}>
          <Item
            active={tabIndex == 0}
            image={require('../assets/images/one.png')}
            onPress={() => setTabIndex(0)}
          />
          <Item
            active={tabIndex == 1}
            image={require('../assets/images/four.png')}
            onPress={() => setTabIndex(1)}
          />
          <Item
            active={tabIndex == 2}
            image={require('../assets/images/two.png')}
            onPress={() => setTabIndex(2)}
          />
        </View>
        <View style={[{marginTop: 10,},
          foods?.length > 0 &&{flex:1}
          ]}>
          {!loadingFoods ? (
            <>
              {tabIndex == 2 && (
                <FlatList
                  removeClippedSubviews={true}
                  data={foods}
                  // style={{backgroundColor:'red', flex:1}}
                  contentContainerStyle={{
                    paddingHorizontal: '4.5%',
                    paddingTop: 5,
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={onScroll}
                  renderItem={({item}) => (
                    <>
                      <FoodItem
                        onPress={() =>
                          navigation.navigate('ItemDetails', {item})
                        }
                        item={item}
                      />
                      {/* <FoodItem onPress={()=>navigation.navigate('ItemDetails',{item})} item={item}/>
                                <FoodItem onPress={()=>navigation.navigate('ItemDetails',{item})} item={item}/>
                                <FoodItem onPress={()=>navigation.navigate('ItemDetails',{item})} item={item}/> */}
                    </>
                  )}
                  refreshControl={
                    <RefreshControl
                      //refresh control used for the Pull to Refresh
                      refreshing={refreshing}
                      onRefresh={getDataHome}
                    />
                  }
                />
              )}
              {tabIndex == 0 && (
                <FlatList
                  data={foods}
                  numColumns={3}
                  contentContainerStyle={{
                    paddingHorizontal: '4.5%',
                    paddingTop: 5,
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={onScroll}
                  renderItem={({item}) => (
                    <>
                      <MostOrderedItem
                        onPress={() =>
                          navigation.navigate('ItemDetails', {item})
                        }
                        item={item}
                        style={{flex: 0.33}}
                      />
                    </>
                  )}
                  refreshControl={
                    <RefreshControl
                      //refresh control used for the Pull to Refresh
                      refreshing={refreshing}
                      onRefresh={getDataHome}
                    />
                  }
                />
              )}
              {tabIndex == 1 && (
                <FlatList
                  data={foods}
                  numColumns={2}
                  contentContainerStyle={{
                    paddingHorizontal: '4.5%',
                    paddingTop: 5,
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={onScroll}
                  renderItem={({item}) => (
                    <>
                      <MostOrderedItem
                        onPress={() =>
                          navigation.navigate('ItemDetails', {item})
                        }
                        item={item}
                        style={{flex: 0.5}}
                      />
                    </>
                  )}
                  refreshControl={
                    <RefreshControl
                      //refresh control used for the Pull to Refresh
                      refreshing={refreshing}
                      onRefresh={getDataHome}
                    />
                  }
                />
              )}
            </>
          ) : (
            <ActivityIndicator color={Colors.Main_Color} />
          )}
          
          {loadingMore && !loadingFoods && 
            <ActivityIndicator color={Colors.Main_Color} />}
        </View>
        {!loadingFoods && foods?.length == 0 && (
            <AppText semibold style={{textAlign: 'center'}}>
              {translate('app.no_products')}
            </AppText>
          )}
        
      </View>
    </View>
  );
};
const Item = ({item, onPress, image, active}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, active && {backgroundColor: Colors.Main_Color}]}>
      <Image
        source={image}
        style={{tintColor: active ? Colors.White : Colors.grey}}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewCont: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11,
    paddingHorizontal: '4.5%',
    marginTop: 15,
  },
  btn: {
    width: 22,
    height: 22,
    backgroundColor: '#F5F4F9',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
