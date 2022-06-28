import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'

const OrderListItem = ({order}) => {
    const navigation = useNavigation()
    
    
    const onPress =()=>{
        navigation.navigate("Order", {id: order.id})
    }


  return (
    <Pressable  onPress={onPress} style={styles.page}>
        <Image source={{uri:order.Restaurant?.image }}   style={styles.image}/>
        <View>
             <Text style={styles.name}>{order.Restaurant?.name}</Text>
             <Text style={styles.items}>3 items &#8226; ₦15000{order.Restaurant?.price}</Text>
             <Text style={styles.status}> 2 days ago &#8226; {order.status}</Text>

        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    image:{
        width:75,
        height:75,
        marginRight:10
    },
    page:{
        flexDirection:"row",
        margin:10,
        alignItems:"center"
    },
    name:{
        fontWeight:"600",
        fontSize:16
    },
    items:{
       marginVertical:5,
    },
    status:{

    }
})

export default OrderListItem