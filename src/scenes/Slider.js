import React,{useEffect, useRef, useState} from 'react'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import {View, Text, Dimensions, StyleSheet, Image, StatusBar} from 'react-native'
import * as Colors from '../styles/Colors'
import { useSelector } from 'react-redux';
import { url } from '../services/config';
import { AppText, Link } from '../component';
const { width, height } = Dimensions.get("window")
export default function RestCarousel ({ navigation }) {
    const _sliderRef = useRef(null)
    const [slider,setSlider] = useState([
      ])
    const [sliderActiveSlide, setSliderActiveSlide] = useState(0);
    // const { Advertisements } = useSelector(({ app }) => ({
    //     Advertisements : app.appData?.Advertisements,
    // }))
    useEffect(()=>{
      setSlider([
          {id:0,image:require('../assets/images/slider1.png')},
          {id:0,image:require('../assets/images/slider2.png')},
          {id:0,image:require('../assets/images/slider3.png')},
          ])
    },[])
    const _renderItem = ({item, index}) => {
        return (
            <View style={{height:'50%'}}>
                <Image source={item.image} style={styles.imageSlider}/>
                <View style={{alignItems:'center',paddingTop:20}}>
                    <AppText semibold style={{fontSize:21, color:Colors.Black,marginBottom:15}}>التطبيق الأفضل في السويد</AppText>
                    <AppText semibold style={{fontSize:16, color:Colors.grey, textAlign:'center'}}>لوريم إيبسوم طريقة لكتابة النصوص في التصميم
الجرافيكي تستخدم بشكل شائع لتوضيح الشكل
المرئي للمستند أو الخط دون الاعتماد محتوى ذي
معنى يمكن استخدام قبل نشر النسخة النهائية</AppText>
                </View>
            </View>
        );
    }

        return (
            <View style={styles.cont}>
                View barStyle="dark-content" />
                <View>
                    <Carousel
                        ref={_sliderRef}
                        data={slider}
                        renderItem={_renderItem}
                        sliderWidth={width * .9}
                        itemWidth={width *.9}
                        loop={true}
                        autoplay={true}
                        layout={"default"}
                        autoplayDelay={5000}
                        autoplayInterval={5000}
                        onSnapToItem={(index) => setSliderActiveSlide(index)}

                    />
                    <Pagination
                        dotsLength={slider ? slider.length : 0}
                        activeDotIndex={sliderActiveSlide}
                        dotStyle={styles.activeDot}
                        containerStyle={styles.paginationContainer}
                        inactiveDotStyle={styles.inactiveDot}
                        // inactiveDotStyle={styles.inactiveDot}
                        inactiveDotColors={Colors.Main_Color}
                        inactiveDotOpacity={.5}
                        inactiveDotScale={1}
                        carouselRef={_sliderRef}
                        tappableDots={!!_sliderRef}
                    />
                </View>
                <View style={{alignSelf:'flex-start',paddingHorizontal:'5%'}}>
                    <Link 
                    onPress={()=>navigation.navigate('Login')}
                    style={{fontSize:20,marginBottom:30}}>تخطي</Link>
                </View>
             </View>
        );
    // return <Text>Hi</Text>
    
}
const styles = StyleSheet.create({
    cont:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.White,
        flex:1,
        paddingTop:50
    },
    activeDot: {
        width: 18,
        height: 6,
        borderRadius: 6,
        backgroundColor: Colors.Main_Color,
        margin:0,
        padding:0
      },
      inactiveDot: {
        backgroundColor:Colors.Main_Color,
        width: 6,
        height: 6,
        borderRadius: 6,
        elevation:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      imageSlider:{
        width:'100%',
        height:'100%',
        // resizeMode:'cover',
        // borderRadius:17
      },
      paginationContainer:{
        paddingBottom:5,
        paddingTop:8,
        alignItems:'center',
        justifyContent:'center'
      }
})