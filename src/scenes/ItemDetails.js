import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  // Image,
  ScrollView,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SearchBar,
  BackButton,
  Item,
  CountButton,
  AppText,
  Paragraph,
  Button,
  Carousel,
} from '../component';
import * as Colors from '../styles/Colors';
import {toggleFav, addToCart, startOrderDelivery} from '../store/actions/app';
import {translate} from '../translations/i18n';
import deviceStorage from '../services/deviceStorage';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {Image} from '../component'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default ItemDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState('');
  const [delivery, setDelivery] = useState(0);
  const [deliveryItem, setDeliveryItem] = useState(0);
  const [item, setItem] = useState({});
  const [number, setNumber] = useState(1);
  const [cartItemNumber, setcartItemNumber] = useState(0);
  const [Options_Product, setOptions_Product] = useState([]);
  const [activeOption, setActiveOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState(0)
  const [price, setPrice] = useState([]);
  const [tax, setTax] = useState(0);

  const toggleFavButton = id => dispatch(toggleFav(id));
  const addToCartButton = (item, number, color, shipping, deliveryItem,option) =>
    dispatch(addToCart(item, number, color, shipping, deliveryItem,option, activeOption, price + tax * number));

  const checkNumberOfCartItem = async () => {
    let cart = await deviceStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
      setcartItemNumber(cart?.cart.length);
    }
  };
  const changeFavStatus = async id => {
    try {
      await toggleFavButton(id);
      setItem({...item, is_fav: !item.is_fav});
    } catch (er) {
      console.log(er);
    }
  };
  const changeCartNumber = async (item, number) => {
    try {
        const option = []
        await activeOption?.forEach((item)=>{
            option.push(item.activeId)
        })
        console.log(option , 'option')
      await addToCartButton(item, number, activeColor, delivery, deliveryItem, option);
      checkNumberOfCartItem();
      // Alert.alert("add to cart")
    } catch (er) {
      console.log(er);
    }
  };
  const onPressOption = (option, id, price) => {
    const elementsIndex = activeOption?.findIndex(element => element.id == option?.id);
    if (elementsIndex > -1) {
      let updateActiveOption = [...activeOption]
      console.log(updateActiveOption[elementsIndex])
      if(updateActiveOption[elementsIndex].activeId != id){
        updateActiveOption[elementsIndex].activeId = id
        updateActiveOption[elementsIndex].price = price
        updateActiveOption[elementsIndex].name = option.name
        setActiveOptions(updateActiveOption)

      }
      else{
        console.log(updateActiveOption)
        updateActiveOption = updateActiveOption.filter(function( obj ) {
          return obj.activeId !== id;
        });
        setActiveOptions(updateActiveOption)
      }
    }
    else{
        console.log(elementsIndex)
        setActiveOptions([...activeOption, {id:option?.id, activeId:id, price, name:option.name}])
    }
  };

  useEffect(() => {
    const {item} = route.params;
    setPrice(item?.price)
    setItem(item);
    setOptions_Product(item.Options_Product)
    item?.tax && setTax(item?.tax_price)    
    checkNumberOfCartItem();
  }, []);
  useEffect(()=>{
    if(item){
      if(activeOption.length > 0){
        let priceOptions = 0
        activeOption.map((item)=>{
          if(item.name != 'county'){
            priceOptions += item?.price
          }
        })
        setPriceOptions(priceOptions)
      }
      else{
        setPriceOptions(0)
      }
    }
    
  },[activeOption, item])

  const setDeliveryBtn = (item) => {
    if(delivery != item?.id ){
      setDelivery(item?.id)
      setDeliveryItem(item)
    }
    else{
      setDelivery(null)
      setDeliveryItem(null)
    }
     
  }
  const calculatePrice = () =>{
    console.log(activeOption , 'activeoption')
    const elementsIndex = activeOption?.findIndex(element => element.name == 'county');
    console.warn(elementsIndex , 'elementsIndex')
    let price = item?.price
    let deliveryPrice = 0
    if(priceOptions){
      price += priceOptions
    }
    // else{
    //   price += item?.price
    // }
    if(elementsIndex > -1){
      price = price * activeOption[elementsIndex].price
    }
    if(deliveryItem){
      deliveryPrice = parseFloat(deliveryItem?.price)
    }
    setPrice(price * number + deliveryPrice)
  }

  useEffect(()=>{
    calculatePrice()
  },[number, delivery, priceOptions, item, activeOption])
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.viewCont}>
      <StatusBar
        // translucent
        barStyle="dark-content"

        content
        backgroundColor={'white'}
      />
      <Carousel media={item?.Media} />
      <View
        style={[
          styles.headerBackground,
          {position: 'absolute', left: 0, right: 0},
        ]}>
        <BackButton style={styles.backbtn} btnStyle={{alignItems: 'center'}} />
        <View style={styles.iconCont}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={styles.icon}>
              {cartItemNumber != 0 && (
                <View style={[styles.cartNumber]}>
                  <AppText
                    regular
                    style={{
                      color: Colors.White,
                      textAlign: 'center',
                      fontSize: 11,
                    }}>
                    {cartItemNumber}
                  </AppText>
                </View>
              )}
              <Icon name="cart-outline" size={20} color={Colors.Green} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeFavStatus(item?.id)}
            style={styles.icon}>
            <Icon
              name={item?.is_fav ? 'heart' : 'heart-outline'}
              size={20}
              color={Colors.Red}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.cont}>
        {/* <View style={styles.line}/> */}
        <View style={{paddingHorizontal: '4.5%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <View>
              <AppText semibold style={[styles.title, {flexShrink: 1}]}>
              {item?.name}
            </AppText>
            <AppText semibold style={[styles.title,{fontSize:13}]}>
              {translate('app.no_tax')}
            </AppText>
              </View>
            
            <AppText
              semibold
              style={{
                fontSize: 20,
                color: Colors.Main_Color,
              }}>{`${price} ${translate(
              'app.currency',
            )}`}</AppText>
          </View>
          {/* <Paragraph style={{fontSize:14,color:Colors.grey}}>
                    {item?.description }
                    </Paragraph> */}
          <View>
            <RenderHtml
              contentWidth={width}
              source={{
                html: item?.description,
              }}
            />
          </View>

          {item?.color?.length>0 && <AppText semibold style={{fontSize: 22, marginTop: 5}}>
            {translate('app.color')}
          </AppText>}
          <FlatList
            data={item?.color}
            style={{alignSelf: 'flex-start', marginTop: 10}}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setActiveColor(item.color)}
                style={[
                  styles.contColor,
                  item.color == activeColor && {borderColor: Colors.Main_Color},
                ]}>
                <View style={[styles.color, {backgroundColor: item?.color}]} />
              </TouchableOpacity>
            )}
          />
          {Options_Product?.length > 0 && (
            <View 
            // style={{paddingBottom:item?.ProductDeliveryShopping?.length > 0 ? 0 : 40}}
            >
           { Options_Product.map((item, index)=>{
              const active = activeOption.find(
                        x => x.id === item?.id,
              )?.activeId;
              return(
                <Option
                key={index}
                option={item}
                active={active}
                onPress={onPressOption}
              />
              )
            })}
            </View>
          
            // <>
            //   <FlatList
            //     data={Options_Product}
            //     style={{alignSelf: 'flex-start', marginTop: 5,
            //     paddingBottom:item?.ProductDeliveryShopping?.length > 0 ? 0 : 40}}
            //     keyExtractor={(item, index) => index.toString()}
            //     renderItem={({item}) => {
            //       const active = activeOption.find(
            //         x => x.id === item?.id,
            //       )?.activeId;

            //       return (
            //         <Option
            //           option={item}
            //           active={active}
            //           onPress={onPressOption}
            //         />
            //       );
            //     }}
            //   />
            // </>
          )}
          {/* <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // style={{flexDirection:'row', alignItems:'center'}}
                    >
                        <Btn title={translate('app.carton')} onPress={()=>setQuantity(0)} active={quantity == 0 } image={require('../assets/images/carton.png')}/>
                        <Btn title={translate('app.pallet')} onPress={()=>setQuantity(1)} active={quantity == 1 } image={require('../assets/images/pallet.png')}/>
                        <Btn title={translate('app.piece')} onPress={()=>setQuantity(2)} active={quantity == 2 } image={require('../assets/images/pallet.png')}/>
                    </ScrollView> */}
          {/* {
                        item?.logo?.length > 0 && 
                       <>
                       <AppText semibold style={{fontSize:22, marginTop:15}}>{translate('app.logo')}</AppText>
                   
                    <FlatList 
                                data={item?.ProductDeliveryShopping}
                                style={{alignSelf:'flex-start', marginTop:10}}
                                keyExtractor={(item, index)=> index.toString()}
                                horizontal
                                renderItem={({ item })=>
                                <Btn title={item?.name} onPress={()=>setDelivery(item?.id)} setDeliveryItem={item} active={delivery == item?.id } />
                            }
                            />
                    </>
                    } */}
          {item?.ProductDeliveryShopping?.length > 0 && (
            <>
              <AppText semibold style={{fontSize: 22, marginTop: 15}}>
                {translate('app.deliveryShopping')}
              </AppText>
              <FlatList
                data={item?.ProductDeliveryShopping}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  
                }}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({item}) => (
                  <Btn
                    shipping
                    item={item}
                    onPress={()=>setDeliveryBtn(item)}
                    active={delivery == item?.id}
                  />
                )}
              />
            </>
          )}
          {item?.tax && <View style={styles.total}>
            <AppText semibold style={{color:Colors.Black,fontSize:18}}>{item?.tax?.name}</AppText>
            <AppText semibold style={{color:Colors.Main_Color,fontSize:16}}>{tax * number}{translate('app.currency')}</AppText>
          </View>}
        </View>
        
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          alignItems: 'center',
        }}>
        <Button
          buttonStyle={{width: '100%', marginLeft: 15}}
          style={{flex: 1.5}}
          textButton={{fontSize: 18}}
          onPress={() => changeCartNumber(item, number)}>
          {translate('app.add_to_cart')}
        </Button>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <CountButton
            color="green"
            apperance="big"
            value={number}
            onAdd={() => setNumber(number + 1)}
            onMinus={() => number > 1 && setNumber(number - 1)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const Btn = ({onPress, active, shipping, item}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, active && {borderColor: Colors.Main_Color}]}>
      <View>
        <AppText semibold style={{fontSize: 18, textAlign:'center', paddingHorizontal:5}}>
          {item?.name}
        </AppText>
        {!!item?.image && (
          // <Image source={item?.image} style={{height: 44, width: 56}} />
          <View style={{height: 45, width: 45, alignSelf:'center'}}>
          <Image url={item?.image} style={{resizeMode:'contain'}} />
        </View>
        )}
        {/* { item?.price && (
          <AppText semibold style={{textAlign: 'center', fontSize: 14}}>
            {item?.price}
            {translate('app.currency')}
          </AppText>
        )} */}
      </View>
    </TouchableOpacity>
  );
};
const Option = ({option, active, onPress }) => {
//     console.log(option?.id , 'activeOption')
  
//   console.log(option?.option, 'item?.option');
let name = '';
if(option.name === 'logo') name = translate('app.logo')
else if(option.name === 'size') name = translate('app.size')
else if(option.name === 'shape') name = translate('app.shape')
else if(option.name === 'odor') name = translate('app.odor')
else if(option.name === 'county') name = translate('app.quantity')
else  name = option.name
  return (
    <View>
      <AppText semibold style={{fontSize: 22, marginTop: 15}}>
        {name}
      </AppText>
      <FlatList
        data={option?.option}
        renderItem={({item}) => {
          return (
            <Btn
              item={item}
              active={active  == item?.id}
              onPress={() => onPress(option, item?.id, item?.price)}
            />
          );
        }}
        horizontal
        style={{alignSelf: 'flex-start', marginTop: 10}}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  // <TouchableOpacity onPress={onPress} style={[styles.btn, active && {borderColor:Colors.Main_Color}]}>
  //     <View>
  //         <AppText semibold style={{fontSize:18}}>{title}</AppText>
  //         {!!image && <Image source={image} style={{height:44, width:56}}/>}
  //         {shipping && <AppText semibold style={{textAlign:'center',fontSize:14}}>{item?.price}{translate('app.currency')}</AppText>}
  //     </View>
  // </TouchableOpacity>
};
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
  title: {
    color: Colors.Black,
    fontSize: 26,
  },
  headerBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:Platform.OS =='ios'? '13%' : '3%',
    paddingHorizontal: screenWidth * 0.02,
  },
  iconCont: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: Colors.White,
    borderRadius: 13,
    width: 39,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  line: {
    backgroundColor: Colors.orange,
    borderRadius: 13,
    marginTop: 17,
    marginBottom: 3,
    width: 49,
    height: 5,
    alignSelf: 'center',
  },
  cont: {
    marginTop: -50,
    backgroundColor: Colors.White,
    paddingTop: 11,
    // marginBottom:20
    // borderRadius:40,
  },
  note: {
    fontSize: 23,
    color: Colors.Black,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 12,
    height: 130,
    textAlignVertical: 'top',
    textAlign: 'right',
    padding: 10,
    marginTop: 10,
  },
  cartNumber: {
    backgroundColor: Colors.Main_Color,
    width: 17,
    height: 17,
    // textAlign:'center',
    top: -4,
    right: -4,
    borderRadius: 15,
    fontSize: 9,
    position: 'absolute',
  },
  color: {
    backgroundColor: Colors.Black,
    width: 18,
    height: 18,
    borderRadius: 18,
  },
  contColor: {
    width: 34,
    height: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.grey_Border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  btn: {
    minWidth: 90,
    minHeight: 80,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey_Border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 0,
  },
  backbtn: {
    backgroundColor: Colors.Main_Color,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  total:{
    flexDirection:'row',
    paddingBottom: 40,
    justifyContent:'space-between',
    marginTop:20
},
});
