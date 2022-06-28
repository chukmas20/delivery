import { useNavigation } from "@react-navigation/native";
import {useState} from "react"
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
// import restaurants from "../../../assets/data/restaurants.json";
import BasketDishItem from "../../components/BasketDishItem";
import { useBasketContext } from "../../context/BasketContext";
import { useOrderContext } from "../../context/OrderContext";



// const restaurant = restaurants[0]\



const Basket= () => {
  const {restaurant, basketDishes, totalPrice} = useBasketContext();
  const {createOrder} = useOrderContext()
  const navigation = useNavigation()

  const onCreateOrder= async()=>{
    const newOrder = await createOrder();
    navigation.navigate("OrdersTab", {
      screen:"Order",
      params:{id: newOrder.id}
    })
  }
  return (
    <View style={styles.page}>
        <Text  style={styles.name}>{restaurant?.name}</Text>

        <Text  style={styles.yourItems}>Your Items</Text>

          <FlatList  data={basketDishes} renderItem={({item})=> <BasketDishItem  basketDish={item}/>}/>

        <View  style={styles.separator} />
       
        <Pressable style={styles.button} onPress={onCreateOrder}>
            <Text style={styles.buttonText}> Create Order ₦ {totalPrice.toFixed(2)}</Text>
        </Pressable>
    </View>
  )
}

export default Basket

const styles = StyleSheet.create({
   page:{
       flex:1,
       width:"100%",
       paddingVertical:30,
       padding:10
   },
    name:{
       fontSize:24,
       fontWeight:"600",
       marginVertical:10
   },
   separator:{
       height:2,
       backgroundColor:"lightgrey",
       marginVertical:10
   },
 
   quantity:{
       fontSize:25,
       color:"red",
       fontWeight: "bold",
       marginHorizontal:20
   },
   button:{
     backgroundColor:'black',
     marginTop:"auto",
     padding:20,
     alignItems:"center"
   },
   buttonText:{
     color:"white",
     fontWeight:"bold",
     fontSize: 18
   },
   quantityContainer:{
     backgroundColor:'lightgray',
     paddingHorizontal:5,
     paddingVertical:2,
     margin:5,
     marginRight:5,
     borderRadius:3
   },
   yourItems:{
     fontWeight:'bold',
     marginTop:20,
     fontSize:19
   }
})