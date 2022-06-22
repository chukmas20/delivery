import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import orders from "../../../assets/data/orders.json"
import OrderItem from '../../components/OrderItem';
import MapView, {Marker} from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';
import { DataStore } from 'aws-amplify';
import { Order } from '../../models';



const OrdersScreen = () => {
  const [orders, setOrders] = useState([])
  const {width, height} = useWindowDimensions()
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(()=> ["12%","95%"], [])


  useEffect(()=>{
     DataStore.query(Order, (order)=> order.status("eq", "READY_FOR_PICKUP")).then(setOrders)
  }, [])

  return (
    <GestureHandlerRootView style={{ backgroundColor: "lightblue", flex:1}}>
      <MapView style={{height, width}} 
         showsUserLocation
         followsUserLocation
         
      >
         {orders.map((order)=>(
             <Marker 
              key={order.id}
              title={order.Restaurant.name}
               description={order.Restaurant.address} 
               coordinate={{
               latitude:order.Restaurant.lat,
               longitude: order.Restaurant.lng
             }}>
                <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                   <Entypo name="shop" size={24} color="white" />
                </View>
             </Marker>
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