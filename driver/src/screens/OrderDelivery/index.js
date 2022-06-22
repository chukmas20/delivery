import { View, Text, useWindowDimensions, ActivityIndicator, Pressable } from 'react-native'
import { useMemo, useRef, useEffect, useState} from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import MapView, {Marker} from "react-native-maps";
// import orders from "../../../assets/data/orders.json"
import {FontAwesome5, Fontisto,Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions"
import styles from './styles';
import { DataStore } from 'aws-amplify';
import { Order, OrderDish, User } from '../../models';
import { useOrderContext } from '../../contexts/OrderContext';


// const order = orders[0]

// const ORDER_STATUSES ={
//    READY_FOR_PICKUP : "READY_FOR_PICKUP ",
//    ACCEPTED : "ACCEPTED",
//    PICKED_UP : "PICKED_UP"
// }

const OrderDelivery = () => {
  const {order, acceptOrder, user, dishes, fetchOrder, completeOrder, pickUpOrder} = useOrderContext()

  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  // const [deliveryStatus, setDeliveryStatus] = useState(ORDER_STATUSES.READY_FOR_PICKUP)
  const [isDriverClose, setIsDriverClose] = useState(false);



  const {width, height} = useWindowDimensions()

   const mapRef = useRef(null)
  const bottomSheetRef = useRef();
  const navigation = useNavigation()
  const route = useRoute();
  const id = route.params?.id;
  const snapPoints = useMemo(()=> ["12%","95%"], [])

  useEffect(()=>{
     fetchOrder(id)
  },[id])

//   useEffect(()=>{
//     if(!order){
//       return;
//     }
//     DataStore.query(User, order.userID).then(setUser)
//     DataStore.query(OrderDish, od => od.orderID("eq", order.id)).then(setDishItems)
//  },[order])

  useEffect(()=>{
    const getDeliveryLocations = async()=>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(!status === 'granted'){
       console.log("No");
       return;
    }
   let location = await Location.getCurrentPositionAsync();
   setDriverLocation({
     latitude:location.coords.latitude,
     longitude: location.coords.longitude
   })
  }
  getDeliveryLocations()
  //  const foregroundSubscription = Location.watchPositionAsync(
  //   {
  //     accuracy:Location.Accuracy.High,
  //     distanceInterval: 500
  //   }, (updatedLocation)=>{
  //      setDriverLocation({
  //        latitude: updatedLocation.coords.latitude,
  //        longitude: updatedLocation.coords.longitude
  //      })
  //   }
  // )
  //  return foregroundSubscription;
},[])

  const onButtonPressed = async ()=>{
      if(order.status === "READY_FOR_PICKUP"){
        bottomSheetRef.current?.collapse()
        mapRef.current.animateToRegion({
          latitude: driverLocation.latitude,
          longitude:driverLocation.longitude,
          latitudeDelta:0.01,
          longitudeDelta:0.01
        })
        acceptOrder()
     }
    //  if(deliveryStatus === ORDER_STATUSES.ACCEPTED){
      if(order.status === "ACCEPTED"){
        bottomSheetRef.current?.collapse()
        pickUpOrder()
     }
      if(order.status === "PICKED_UP"){
       await completeOrder()
      bottomSheetRef.current?.collapse();
      navigation.goBack();
   }
  }

  const renderButtonTitle =()=>{
    if(order.status === "READY_FOR_PICKUP"){
        return "Accept order"
      }
      if(order.status === "ACCEPTED"){
        return "pick-up order"
      }
      if(order.status === PICKED_UP){
        return "complete delivery"
      }
  }

  const isButtonDisabled =()=>{
    if(order.status === "READY_FOR_PICKUP"){
        return false;
      }
      if(order.status === "ACCEPTED" && isDriverClose){
        return false;
      }
      if(order.status === "PICKED_UP" && isDriverClose){
        return false;
      }
      return true;
  }

  const restaurantLocation = {latitude:order?.Restaurant?.lat, longitude:order?.Restaurant?.lng}
  const deliveryLocation = {latitude:user?.lat, longitude:user?.lng}

  if(!driverLocation){
    return <ActivityIndicator  size={"large"} color="gray"/>
  }
  if(!order || !user || !driverLocation){
    return <ActivityIndicator size={"large"} color="gray"/>
  }
  
  return (
    <View style={styles.container}>
      <MapView 
          ref={mapRef}
          style={{height, width}}   
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta:0.07,
            longitudeDelta: 0.07
          }}
           >
            <MapViewDirections 
             origin={driverLocation} 
              destination={
                  order.status === "ACCEPTED" ?
                 restaurantLocation : deliveryLocation
                }
                                      
              strokeWidth={10}
              waypoints={order.status === "READY_FOR_PICKUP" ? [ restaurantLocation ] :[] }
              strokeColor="#3FC060"
              apikey={'AIzaSyBr5uVMRKk7ERbHRsl2P019rq_XEA3PUTw'}
              onReady={(result)=>{
                 setIsDriverClose(result.distance <= 0.1);
                 setTotalMinutes(result.duration)
                 setTotalKm(result.distance)
              }}
            />
             <Marker
               coordinate={{
                 latitude:order.Restaurant.lat,
                 longitude: order.Restaurant.lng
               }}
               title={order.Restaurant.name}
               description={order.Restaurant.address}
             >  
               <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                  <Ionicons name="restaurant" size={24} color="white" /> 
                </View>               
              </Marker>
             <Marker
               coordinate={deliveryLocation}
               title={order?.user?.name}
               description={order?.user?.address}
             >  
               <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                  <Ionicons name="person" size={24} color="white" />
                </View>
             </Marker>
         </MapView>
          {order.status === "READY_FOR_PICKUP" && (
            <Ionicons
            onPress={()=>navigation.goBack()}
            name="arrow-back-circle"
            size={45} color="black" 
            style={{top: 40, left:15, position:"absolute"}}
            />
        )}
      <BottomSheet ref={bottomSheetRef} 
          snapPoints={snapPoints}
          handleIndicatorStyle={{backgroundColor:"grey", width:100}}
        >
          <View style={styles.handleIndicator}>
          <Text style={styles.routeDetailsText}>{totalMinutes.toFixed(0)} mins</Text>
           <FontAwesome5  
              name="shopping-bag" 
              size={30}
              color="#3fc060"
              style={{marginHorizontal:5}}
           />
           <Text style={styles.routeDetailsText}> {totalKm.toFixed(2)} km</Text>
          </View> 
          <View style={styles.deliveryDetailsContainer}>
              <Text style={styles.restaurantName}> {order.Restaurant.name} </Text>
             <View style={styles.addressContainer}>
              <Fontisto name="shopping-store" size={24} color="black" />
              <Text 
                  style={{
                     fontSize:20,
                     color:'grey',
                     fontWeight:"500",
                     letterSpacing:0.1, 
                     paddingVertical:20,
                     marginLeft:10
                    }}
                     > 
                       {order.Restaurant.address} 
                 </Text>
              </View>
            <View style={styles.addressContainer}>
            <FontAwesome5 name="map-marker-alt" size={30} color="black" />
             <Text 
                style={styles.addressText}
                  > 
                 {user?.address} 
             </Text>
            </View>
              <View style={styles.orderDetailsContainer}>
                {dishes?.map((dishItem)=>(
                    <Text style={styles.orderItemText} key={dishItem.id}>
                    {dishItem.Dish.name} x {dishItem.quantity}
                 </Text>
                ))}               
              </View>
          </View>
          <Pressable 
              style={{
                ...styles.buttonContainer, backgroundColor:isButtonDisabled()?"grey":"#3fc060"
              }}
                   onPress={onButtonPressed} disabled={isButtonDisabled()}
                  >
              <Text style={styles.buttonText}>
                 {renderButtonTitle()}
              </Text>
          </Pressable>
      </BottomSheet>
    </View>
  )
}

export default OrderDelivery