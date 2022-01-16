import React from 'react';
import {View , StyleSheet,SafeAreaView, PermissionsAndroid, Platform, Alert} from 'react-native';
import {BackButton, Button, CurrentPositionButton, Modal, ModalMap} from '../component';
import {translate} from '../translations/i18n';
import {  Gray_Background, Black, White } from '../styles/Colors';
import MapView , {Marker} from 'react-native-maps';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Geolocation from 'react-native-geolocation-service';
import { storeOrder } from '../store/actions/app'

class MapLocation extends React.Component {

    state={
        currentPosition:{

        },
        position:{
            latitude: parseFloat("37.78825"),
            longitude: parseFloat("-121.78324"),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          visible:false,
          address :'',
          addressError:false
    }

    async componentDidMount(){ 
        if(this.props.user.type === 2){
            const lng = parseFloat(this.props.route.params?.lng)
            const lat = parseFloat(this.props.route.params?.lat)
            this.setState({
                position:{
                    ...this.state.position,
                    longitude:lng,
                    latitude:lat
                }
            })
            this.map.animateCamera({center:{latitude:lat,longitude:lng } }, { duration: 2000 });
        }
        if(Platform.OS === 'ios'){
            Geolocation.getCurrentPosition(
                async(position) => {
                    console.log(position, 'ppdddd;dkdksldklskdlskdlsdkpooooosss')
                this.setState({
                    currentPosition:{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    position:{
                        ...this.state.position,
                        longitude:position.coords.longitude,
                        latitude:position.coords.latitude,
                    }

                })
                this.map.animateCamera({center:{latitude:position.coords.latitude,longitude:position.coords.longitude, } }, { duration: 2000 });
                
                },
                (er) => {
                console.log('error',er)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        else{
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  Geolocation.getCurrentPosition(
                      async(position) => {
                        console.log(position , 'granted')  

                      this.setState({
                          currentPosition:{
                              latitude:position.coords.latitude,
                              longitude:position.coords.longitude,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                          },
                          position:{
                            ...this.state.position,
                            longitude:position.coords.longitude,
                            latitude:position.coords.latitude,
                        }
                      })
                      this.map.animateCamera({center:{latitude:position.coords.latitude,longitude:position.coords.longitude, } }, { duration: 2000 });

                      },
                      () => {
                      console.log('error')
                      },
                      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                  );
              }       
              else {
                  alert("Location permission denied");
              } 
        }
        
      }
    setCurrentPosition =async () =>{
        console.log(this.state.position , 'this.state.currentPosition')
        this.setState({
            position:this.state.currentPosition
        })
        const {latitude , longitude} = this.state.currentPosition
        this.map.animateCamera({center:{latitude , longitude} }, { duration: 2000 });

    }

    savePosition = () =>{
       
        console.log(this.map?.__lastRegion , 'this.map?.__lastRegion')
        if(this.map?.__lastRegion){
            this.props.setPosition(this.map?.__lastRegion?.latitude, this.map?.__lastRegion?.longitude)
        }
        else{
            Alert.alert(
                "Location",
                "Please select location",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
    }

    render() {
    return (
        <Modal
        transparent={true}
        animationType={'slide'}
        visible={visible}
        >
        <View style={styles.viewCont}>
            <MapView
                ref={(map) => { this.map = map; }}
                style={{flex:1}}
                initialRegion={this.state.position}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={false}
                    showsCompass={false}
                    loadingEnabled={true}
            >
            </MapView>
                 
            {/* </MapView> */}
            <View style={{position:'absolute', right:40,top:Platform.OS == 'ios'? 40:20}}>
                <BackButton />
            </View>
           
            <Button 
                onPress={this.savePosition}
                style={styles.button}>
                    {translate('app.addlocation')}</Button>
            <CurrentPositionButton 
                onPress={()=>this.setCurrentPosition()}
                style={styles.currentPositionButton}/>
            <Icon 
                name="circle-medium"
                style={styles.icon}
                color={Black}
                size={20}
            />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  cont:{
    backgroundColor:Gray_Background,
    flex:1
  },
  viewCont:{
      flex:1,
    //   paddingTop:20
  },
  button:{
      position:'absolute',
    //   bottom:30,
   
      width:'100%'
    },
    currentPositionButton:{
        position:'absolute',
        top:50,
        left:20
    },
    icon:{
        position:'absolute',
        top:'49%',
        right:'48%'
    }
})
const mapStateToProps = ({auth}) =>{
    return {
        user: auth.user
    }
}
export default connect(mapStateToProps, { storeOrder })(MapLocation);
