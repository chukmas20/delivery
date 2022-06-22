import { StyleSheet, Text, View } from "react-native"

const BasketDishItem =({basketDish})=>{
    return(
     <View style={styles.row}>
     <View style={styles.quantityContainer}> 
         <Text>{basketDish.quantity}</Text>
     </View>
     <Text style={{fontWeight:"600"}}>{basketDish.Dish?.name}</Text>
     <Text style={{marginLeft:"auto"}}> ₦ {basketDish.Dish?.price}</Text>
   </View>
    )
 }

 const styles = StyleSheet.create({
     name:{
        fontSize:24,
        fontWeight:"600",
        marginVertical:10
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
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
    }
 })

 export default BasketDishItem