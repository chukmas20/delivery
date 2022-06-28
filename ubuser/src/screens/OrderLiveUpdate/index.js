import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {DataStore} from "aws-amplify";
import MapView, { Marker } from 'react-native-maps';
import { Courier, Order } from '../../models';
import { FontAwesome } from '@expo/vector-icons';

const OrderLiveUpdate = ({id}) => {
    const {width, height} = useWindowDimensions();
    const [order, setOrder] = useState(null);
    const [courier, setCourier] = useState(null)
    const mapRef = useRef(null)

   
     useEffect(()=>{
        DataStore.query(Order,id).then(setOrder)
    },[])
     console.log(order)

     useEffect(()=>{
        if(!order){
            return;
        }
        const subscription = DataStore.observe(Order, order.id).subscribe(msg=>{
            if(msg.opType === "UPDATE"){
                setOrder(msg.element)
            }
        })
        return ()=> subscription.unsubscribe()
     },[order])

     useEffect(()=>{
       if(order?.orderCourierId){
          DataStore.query(Courier, order.orderCourierId).then(setCourier)
       }
     }, [order?.orderCourierId])

     useEffect(()=>{
        if(courier?.lng && courier?.lat){
            mapRef.current.animateToRegion({
                latitude: courier.lat,
                longitude: courier.lng,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007
            })
        }
      }, [courier?.lng, courier?.lat])

      useEffect(()=>{
         if(!courier){
            return;
         }
         const subscription =  DataStore.observe(Courier, courier.id).subscribe((msg)=>{
            if(msg.opType === "UPDATE"){
                setCourier(msg.element)
            }
        })
        return ()=> subscription.unsubscribe()
      },[])
  return (
    <View>
        <Text> Status: {order?.status || "Loading"}</Text>
       <MapView  style={{width,height}} ref={mapRef} showsUserLocation>
          {courier && (
             <Marker coordinate={{latitude: courier.lat, longitude:courier.lng}}>
                <View style={{
                     padding:5,
                     backgroundColor:'green',
                      borderRadius:20,
                      borderWidth:1,
                      borderColor:"orange"

                     }}
                    >
                   <FontAwesome name="motorcycle" size={24} color="white" />
                </View>
             </Marker>
          )}
          
       </MapView>
    </View>
  )
}


const styles = StyleSheet.create({
    map:{
        width: "100%",
        height:"100%"
    }
})

export default OrderLiveUpdate
