import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
// import restaurants from "../../../assets/data/restaurants.json";
import {Ionicons} from "@expo/vector-icons"
import DishListItem from '../../components/DishListItem';
import styles from './styles';
import  Header  from "./Header";
import {useNavigation, useRoute} from "@react-navigation/native";
import { DataStore } from 'aws-amplify';
import { Dish, Restaurant } from '../../models';
import { useBasketContext } from '../../context/BasketContext';

// const restaurant = restaurants[0]
const RestaurantDetailsPage = () => {
  const[restaurant, setRestaurant] = useState(null)
  const[dishes, setDishes] = useState([])

  const route = useRoute()
  const navigation = useNavigation()

  const id = route.params?.id;
  // console.warn(id)

  const {setRestaurant: setBasketRestaurant, basket, basketDishes} = useBasketContext()

  const onPress =()=>{
    navigation.navigate("Basket")
  }
  useEffect(()=>{
    if(!id){
      return;
    }
    setBasketRestaurant(null);
        // fetch restaurant with id
    DataStore.query(Restaurant, id).then(setRestaurant);
    DataStore.query(Dish, (dish)=>dish.restaurantID("eq", id)).then(setDishes)
  },[id])

   useEffect(()=>{
     setBasketRestaurant(restaurant)
   }, [restaurant])

  if(!restaurant){
    return <ActivityIndicator  size={"large"} color="black" style={{flex:1}}/>
  }
 

  return (
    <View style={styles.page}>
      <FlatList 
         ListHeaderComponent={()=><Header restaurant={restaurant} />}   
         data={dishes}
         renderItem={({item}) => <DishListItem dish={item}/>}
         keyExtractor={(item)=> item.name}
      />
       <View style={styles.iconContainer}>
         <Ionicons name="arrow-back-circle" 
            size={45} color="white"
             style={styles.imageIcon} onPress={onPress} 
           />
      </View>
       {basket && (
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}> Open Basket ({basketDishes.length})</Text>
          </Pressable>
       )
       }
         
    </View>
  )
}

export default RestaurantDetailsPage

