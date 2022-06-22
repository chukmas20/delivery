import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
// import restaurants from "../../../assets/data/restaurants.json";
import RestaurantItem from '../../components/RestaurantItem';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';





export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([])

 

  useEffect(()=>{
      DataStore.query(Restaurant).then(setRestaurants)
  }, [])
  return (
       <View style={{margin:10}} >
            <FlatList   data={restaurants}
             renderItem={({item})=> <RestaurantItem  restaurant={item}  />} 
              showsVerticalScrollIndicator={false}
             />
       </View>
      
    );
}


