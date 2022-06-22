import {useEffect, useState} from "react"
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
// import restaurants from "../../../assets/data/restaurants.json";
import {AntDesign} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useBasketContext } from "../../context/BasketContext";


// const dish = restaurants[0].dishes[0]


const DishDetailsScreen = () => {
    const[dish, setDish] = useState(null)
    const [quantity, setQuantity] = useState(1)


    const navigation = useNavigation()
    const route = useRoute()
    const id = route.params?.id

    const {addDishToBasket} = useBasketContext();


    useEffect(()=>{
      if(id){
        DataStore.query(Dish, id).then(setDish)
      }
   }, [id])

    const onAddToBasket = async()=>{
       await addDishToBasket(dish, quantity)
       navigation.goBack()
    }

    const onMinus =()=>{
    if(quantity > 1){
        setQuantity(quantity - 1)
      }
    }

    const onPlus =()=>{
        setQuantity(quantity + 1)
    }

    const getTotal =()=>{
       return (dish.price * quantity).toFixed(2)
    }

    

    if(!dish){
      return <ActivityIndicator   size={"large"} color ="grey" />
    }

  return (
    <View style={styles.page} >
        <Text  style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <View  style={styles.separator} />
        <View style={styles.row}>
            <AntDesign name="minuscircleo" size={60} color={"black"} onPress={onMinus}/>
             <Text style={styles.quantity}>{quantity}</Text>
            <AntDesign name="pluscircleo" size={60} color={"black"} onPress={onPlus}/>
        </View>
        <Pressable onPress={onAddToBasket} style={styles.button}>
            <Text style={styles.buttonText}> Add {quantity} to basket (₦ {getTotal()})</Text>
        </Pressable>
    </View>
  )
}

export default DishDetailsScreen

const styles = StyleSheet.create({
   page:{
       flex:1,
       width:"100%",
       paddingVertical:30,
       padding:10
   },
    name:{
       fontSize:30,
       fontWeight:"600",
       marginVertical:10
   },
   separator:{
       height:2,
       backgroundColor:"lightgrey",
       marginVertical:10
   },
   row:{
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"center",
       marginTop:50,
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
   }
})