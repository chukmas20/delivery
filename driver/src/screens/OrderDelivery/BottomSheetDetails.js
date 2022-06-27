import { View, Text, useWindowDimensions, ActivityIndicator, Pressable } from 'react-native'
import { useMemo, useRef, useEffect, useState} from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {FontAwesome5, Fontisto,Ionicons } from "@expo/vector-icons";
import styles from './styles';

import { useOrderContext } from '../../contexts/OrderContext';

const BottomSheetDetails = ({totalKm,totalMinutes, onAccepted}) => {
    const isDriverClose = totalKm <= 1; //decrease for more accuracy
    const {order, acceptOrder, user, dishes, completeOrder, pickUpOrder} = useOrderContext()

    const bottomSheetRef = useRef();
    const snapPoints = useMemo(()=> ["12%","95%"], [])

    const navigation = useNavigation()

    const STATUS_TO_TITLE = {
      READY_FOR_PICKUP:"Accept order",
      ACCEPTED: "Pick-Up Order",
      PICKED_UP: "Complete Delivery"
  }



    const onButtonPressed = async ()=>{
      const {status} = order;
        if(status === "READY_FOR_PICKUP"){
          bottomSheetRef.current?.collapse()
           await acceptOrder()
          onAccepted();
       }
        else if(status === "ACCEPTED"){
          bottomSheetRef.current?.collapse()
           await pickUpOrder()
       }
        else if(status === "PICKED_UP"){
         await completeOrder()
        bottomSheetRef.current?.collapse();
        navigation.goBack();
     }
    }

    const isButtonDisabled =()=>{
       const {status} = order;
      if(status === "READY_FOR_PICKUP"){
          return false;
        }
        if((status === "ACCEPTED" || status === "PICKED_UP") && isDriverClose){
          return false;
        }
        return true;
    }

  return (
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
                 {STATUS_TO_TITLE [order.status]}
              </Text>
          </Pressable>
      </BottomSheet>
  )
}

export default BottomSheetDetails