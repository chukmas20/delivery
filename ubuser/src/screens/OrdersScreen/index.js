import { View, Text, FlatList, StyleSheet } from 'react-native'
// import orders from "../../../assets/data/orders.json"
import OrderListItem from '../../components/OrderListItem'
import { useOrderContext } from '../../context/OrderContext'

const OrdersScreen = () => {
  const {orders} = useOrderContext()
  return (
    <View style={styles.page}>
        <FlatList 
              data={orders} 
              renderItem={({item})=> <OrderListItem order={item}/> }    
           />
    </View>
  )
}

const styles = StyleSheet.create({
   page:{
     flex:1,
     width:"100%",
   }
})

export default OrdersScreen