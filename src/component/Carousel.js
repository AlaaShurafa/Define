import React,{useEffect, useRef, useState} from 'react'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import {View, Text, Dimensions, StyleSheet,  ImageBackground, TouchableOpacity} from 'react-native'
import * as Colors from '../styles/Colors'
import { useSelector } from 'react-redux';
import { url } from '../services/config';
import ImageZoomer from './ImageZoomer'
import Image from './Image'
const { width, height } = Dimensions.get("window")

export default function RestCarousel ({media}) {
    const _sliderRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [activeUrl, setActiveUrl] = useState('')
    const [slider,setSlider] = useState([
      ])
    const [sliderActiveSlide, setSliderActiveSlide] = useState(0);
    const { Advertisements } = useSelector(({ app }) => ({
        Advertisements : app.appData?.Advertisements,
    }))
    useEffect(()=>{
      // setSlider([
      //   {"id": 1, "image": "https://asmai.online/storage/media/35263c381cde610e5cba321547837374.jpg", "title": "Reklame"},
      //   {"id": 1, "image": "https://asmai.online/storage/media/35263c381cde610e5cba321547837374.jpg", "title": "Reklame"},
      //   {"id": 1, "image": "https://asmai.online/storage/media/35263c381cde610e5cba321547837374.jpg", "title": "Reklame"},

      // ])
      media && setSlider(media)

    },[media, slider])
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity 
              onPress={()=>{
                console.log('test')
                setVisible(true)
                setActiveUrl(item.file)
              }}
              style={{height:320}}>
                <Image source={{uri:item.file}} url = {item.file} style={styles.imageSlider}/>
                {/* <Image source={item.image} style={styles.imageSlider}/> */}
            </TouchableOpacity>
        );
    }

        return (
            <View style={{alignItems:'center',justifyContent:'center'}}>

                {media?.length > 0 ? <>
                <Carousel
                    ref={_sliderRef}
                    data={slider}
                    renderItem={_renderItem}
                    sliderWidth={width}
                    itemWidth={width}
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
                    containerStyle={{backgroundColor:'red', margin:40}}
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
                </> : 
                    <ImageBackground 
                      source={require('../assets/images/logo.png')}
                      imageStyle={[{resizeMode:'contain'}]}
                      style={[{width:width , height: height *.45, backgroundColor:Colors.Main_Color}]}
                />
              }
              <ImageZoomer visible={visible} url={activeUrl} onClose={()=>setVisible(false)}/>
                
             </View>
        );
    // return <Text>Hi</Text>
    
}
const styles = StyleSheet.create({
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: Colors.Main_Color,
        margin:0,
        padding:0
      },
      inactiveDot: {
        backgroundColor:Colors.Main_Color,
        width: 8,
        height: 8,
        borderRadius: 8,
      },
      imageSlider:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
      },
      paginationContainer:{
        marginBottom:10,
        zIndex:10,
        paddingTop:8,
      }
})