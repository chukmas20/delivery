import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
// import orders from "../../../assets/data/orders.json"
import OrderItem from '../../components/OrderItem';
import MapView, {Marker} from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataStore } from 'aws-amplify';
import { Order } from '../../models';
import * as Location from "expo-location";
import CustomMarker from '../../components/CustomMarker';



const OrdersScreen = () => {
  const [orders, setOrders] = useState([])
  const [driverLocation, setDriverLocation] = useState(null);

  const {width, height} = useWindowDimensions()
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(()=> ["12%","95%"], [])

  const fetchedOrders=()=>{
    DataStore.query(Order, (order)=>
     order.status("eq", "READY_FOR_PICKUP"))
     .then(setOrders)
  }

  useEffect(()=>{
     fetchedOrders();

     const subscription = DataStore.observe(Order).subscribe(msg =>{
        if(msg.opType === "UPDATE"){
          fetchedOrders();
        }
     })
       return ()=> subscription.unsubscribe()
  }, [])

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
},[])

 if(!driverLocation){
   return <ActivityIndicator size={"large"} color="gray" />
 }

  return (
    <GestureHandlerRootView style={{ backgroundColor: "lightblue", flex:1}}>
      <MapView style={{height, width}} 
         showsUserLocation
         followsUserLocation
         initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta:0.07,
          longitudeDelta: 0.07
        }}
      >
         {orders.map((order)=>(
            
             <CustomMarker 
               key={order.id}
               data={order.Restaurant}
               type="RESTAURANT" 
             />
         ))}
      </MapView>
      <BottomSheet ref={bottomSheetRef}  snapPoints={snapPoints}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              letterSpacing: 0.5,
              paddingBottom: 5,
            }}
          >
            You're Online
          </Text>
          <Text style={{ letterSpacing: 0.5, color: "grey" }}>
            Available Orders: {orders.length}
          </Text>
        </View>
        <BottomSheetFlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
    </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default OrdersScreen