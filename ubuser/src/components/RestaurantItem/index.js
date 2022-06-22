import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {useNavigation} from "@react-navigation/native"

const RestaurantItem =({restaurant})=>{
   const navigation = useNavigation();

   const onPress=()=>{
      navigation.navigate("Restaurant", {id: restaurant.id})
   }
    return(
     <Pressable style={styles.restaurantContainer} onPress={onPress}>
     <Image source={{uri:restaurant.image}}
        style={styles.image}
      />
      <View style={styles.row}>
      <View>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.subtitle}>
           ₦{restaurant.deliveryFee.toFixed(2)} &#8226;
            {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime}minutes
       </Text>
      </View>
      <View style={styles.rating}>
          <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
      </View>
     </View>
     </Pressable>
    )
 }

 export default RestaurantItem

 const styles = StyleSheet.create({
    restaurantContainer:{
      width:"100%",
      marginVertical:10
    },
    image:{
      width:"100%",
      aspectRatio: 5/3,
      marginBottom:5
    },
    title:{
       fontSize:16,
       fontWeight:"500",
       marginVertical:5,
    },
    subtitle:{
       color:"grey"
    },
    row:{
       flexDirection:'row',
       alignItems:'center'
    },
    rating:{
        marginLeft:"auto",
        backgroundColor:'lightgray',
        width:30,
        height:30,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    }
  });
  

