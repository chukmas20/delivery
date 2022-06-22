import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const DishListItem = ({dish}) => {
  const navigation = useNavigation()
  const onPress=()=>{
    navigation.navigate("Dish",{id : dish.id})
  }
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{flex:1}}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>
        <Text style={styles.price}>₦ {dish.price}</Text>
      </View>
        { dish.image &&
           (<Image source={{uri:dish.image}}  style={styles.image} />)
         }
    </Pressable>
  )
}

export default DishListItem

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        paddingVertical:10,
        marginHorizontal:20,
        borderBottomColor:'lightgrey',
        borderBottomWidth:1,
        flexDirection:"row"
    },
    name:{
        fontWeight:"600",
        fontSize:18
    },
    description:{
        color:"grey",
        marginVertical:5
    },
    price:{
        fontSize:16
    },
    image:{
        height: 75,
        aspectRatio:1
    }
   
})