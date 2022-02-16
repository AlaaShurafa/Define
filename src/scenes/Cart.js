import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Platform, StatusBar, TouchableOpacity, Alert, I18nManager} from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Dash from 'react-native-dash';
import { AppText, Button, CartItem, HeaderText, BackButton, Header2 } from '../component'
import * as Colors from '../styles/Colors'
import deviceStorage from '../services/deviceStorage'
import { translate } from '../translations/i18n';
import { storeOrder } from '../store/actions/app'
import { loginGuest} from '../store/actions/auth'
import { addToCart } from '../services/api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default Carts = ({navigation}) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    const [totalShipping, setTotalShipping] = useState(0)
    const storeCartOrder = (cart) => dispatch(storeOrder(cart))
    const loginGuestBtn = (start) => dispatch(loginGuest(start))
    const { user } = useSelector(({ auth }) => ({
        user : auth.user
    }))
    const _setCart = async () => {
        let cartData = await deviceStorage.getItem('cart')
        if (cartData) {
            cartData = JSON.parse(cartData)
            setCart(cartData.cart)
        }
    }
    const _setTotal = (cart) =>{
        let totalValue = 0
        let deliveryPrice = 0
        
         cart.map((item)=>{
            deliveryPrice = 0
            if(item?.deliveryItem){
                deliveryPrice = parseFloat(item?.deliveryItem?.price) 
            }
            totalValue += item.price - deliveryPrice
        })
        return  totalValue
    }
    const _setTotalShipping = (cart) =>{
        let totalShipping = 0
        cart.map((item)=>{
            if(item?.deliveryItem){
                totalShipping = totalShipping + parseFloat(item?.deliveryItem?.price) 
            }
        })
        if(totalShipping == 0){
            totalShipping = 100
        }
        return totalShipping
    }
    const onAdd = (id) => {
        const elementsIndex = cart.findIndex(element => element.id == id )
        let updatedCart = [...cart]
        let deliveryPrice = 0
        if(updatedCart[elementsIndex].deliveryItem){
            deliveryPrice = parseFloat(updatedCart[elementsIndex].deliveryItem?.price)
        }
        let price = ((cart[elementsIndex].price-deliveryPrice) / updatedCart[elementsIndex].quantity) * (updatedCart[elementsIndex].quantity +1 )
        updatedCart[elementsIndex] ={...updatedCart[elementsIndex], quantity : updatedCart[elementsIndex].quantity +1, price: price + deliveryPrice }
        addToCart(
            updatedCart[elementsIndex] , 
            updatedCart[elementsIndex].quantity,
            // updatedCart[elementsIndex].logo,
            // updatedCart[elementsIndex].quantity,
            updatedCart[elementsIndex].color,
            updatedCart[elementsIndex].delivery,
            updatedCart[elementsIndex].deliveryItem,
            updatedCart[elementsIndex].option,
            updatedCart[elementsIndex].activeOption,
            updatedCart[elementsIndex].price
            )
        setCart(updatedCart)
    }
    const onMinus = (id) => {
        const elementsIndex = cart.findIndex(element => element.id == id )
        let updatedCart = [...cart]
        let deliveryPrice = 0
        if(updatedCart[elementsIndex].deliveryItem){
            deliveryPrice = parseFloat(updatedCart[elementsIndex].deliveryItem?.price)
        }
        let price = ((cart[elementsIndex].price-deliveryPrice) / updatedCart[elementsIndex].quantity) * (updatedCart[elementsIndex].quantity -1 )
        if(updatedCart[elementsIndex].quantity > 1){
            updatedCart[elementsIndex] ={...updatedCart[elementsIndex], quantity : updatedCart[elementsIndex].quantity -1, price: price + deliveryPrice }
            addToCart(updatedCart[elementsIndex] , 
                updatedCart[elementsIndex].quantity,
                // updatedCart[elementsIndex].logo,
                // updatedCart[elementsIndex].quantity,
                updatedCart[elementsIndex].color,
                updatedCart[elementsIndex].delivery,
                updatedCart[elementsIndex].deliveryItem,
                updatedCart[elementsIndex].option,
                updatedCart[elementsIndex].activeOption,
                updatedCart[elementsIndex].price, 
                )            
            setCart(updatedCart)
        }
    }
    useEffect(() => {
        _setCart()
    }, [isFocused])

    useEffect(()=>{
        const totalValue =  _setTotal(cart)
        const totalShipping = _setTotalShipping(cart)
        setTotal(totalValue )
        setTotalShipping(totalShipping)
    },[isFocused,cart])

    const confirmOrder = async () =>{
        if(user){
            navigation.navigate('Locations',{cart})
        }
        else{
            Alert.alert(
                translate('auth.sign_in'),
                null,
                [
                  { text: "CANCEL", onPress: () => null},
                  { text: "OK", onPress: () => loginGuestBtn(false)}
                ]
              );
        }
     
        
    }
    const deleteItem=(id)=>{
        let updatedCart = cart.filter( el => el.id !== id ); 
        let cartString = JSON.stringify({'cart':[...updatedCart]})
        deviceStorage.saveItem('cart',cartString)
        setCart(updatedCart)
    }
    useEffect(()=>{
        let totalFinal = total + (total * .25)
        console.log(totalFinal , 'totalFinal')
        if(totalFinal >= 1000){
            setTotalShipping(0)
        }
    },[total])
    return (
        <View style={styles.viewCont} >
           <StatusBar backgroundColor={Colors.White} animated={true} barStyle={"dark-content"} />
            <View style={{ paddingHorizontal: '4.5%', flex: 1 }}>
                <Header2 title={translate('app.cart')}/>
                {/* <OrderStatus 
                    backgroundColor={Colors.Main_Color_op}
                    color={Colors.Main_Color}
                    text={"تمتع بخصم يصل إلى 15"}
                    style={{marginBottom:15}}
                /> */}
                {cart?.length > 0 &&

                    <SwipeListView
                        data={cart}
                        style={{ flex: 1 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <CartItem item={item} total={total} onAdd={onAdd} onMinus={onMinus} />
                        }
                        renderHiddenItem={ ({item}, rowMap) => (
                            <View style={{justifyContent:'center',flex:1,marginBottom:20,alignItems:I18nManager.isRTL ? 'flex-end': 'flex-start'}}>
                                <TouchableOpacity style={styles.deleteCont} onPress={()=>deleteItem(item.id)}>
                                    <Icon name="delete" color={Colors.Main_Color} size={25}/>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={60}
                        // rightOpenValue={-75}
                    />
                }
                {cart.length > 0 &&
                <View>
                    <View style={{}}>
                        <Dash
                            style={{ width: '100%', height: 1 }}
                            dashColor={'#A3A3A3'}
                            dashGap={5}
                            dashLength={5}
                            dashThickness={1} />
                        <View style={styles.total}>
                            <AppText bold style={{color:Colors.Black,fontSize:16}}>{translate('app.product_cost')}</AppText>
                            <AppText bold style={{color:Colors.Black,fontSize:16}}>{`${total?.toFixed(2)}${translate('app.currency')}`}</AppText>
                        </View>
                        <View style={styles.total}>
                            <AppText bold style={{color:Colors.Black,fontSize:16}}>{translate('app.product_tax')}</AppText>
                            <AppText bold style={{color:Colors.Black,fontSize:16}}>{total * .25}{translate('app.currency')}</AppText>
                        </View>
                        <View style={styles.total}>
                            <AppText bold style={{color:Colors.Black,fontSize:16}}>{translate('app.deliveryShopping')}</AppText>
                            <AppText bold style={{color:Colors.Black,fontSize:16}}>{totalShipping}{translate('app.currency')}</AppText>
                        </View>
                        <View style={[styles.total,{marginBottom:10}]}>
                            <AppText bold style={{color:Colors.Main_Color,fontSize:20}}>{translate('app.total')}</AppText>
                            <AppText bold style={{color:Colors.Main_Color,fontSize:20}}>{(total+totalShipping + (total * .25))}{translate('app.currency')}</AppText>
                        </View>
                    </View>
                    <Button
                        onPress={confirmOrder}
                        buttonStyle={{ width: '100%', marginBottom: 10 }}
                    >{translate('app.confirm_order')}</Button>
                </View> }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    viewCont: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 11
    },
    header: {
        paddingTop: 20,
        paddingBottom: 27,
        alignSelf: 'center'
    },
    total:{
        flexDirection:'row',
        // marginBottom:10,
        justifyContent:'space-between',
        marginTop:10
    },
    deleteCont:{
        // width:36,
        width:50,
        height:50,
        textAlign:'center',
        // alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:12,
        borderRadius:5,
        backgroundColor:Colors.grey_Background_Light,

    }
})