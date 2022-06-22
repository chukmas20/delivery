import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import orders from "../../../assets/data/orders.json";
import restaurants from "../../../assets/data/restaurants.json";
import BasketDishItem from '../../components/BasketDishItem';
import { useOrderContext } from '../../context/OrderContext';
import OrderDetailsHeader from './Header';
import styles from "./styles";
// const order = orders[0]


const OrderDetails =()=>{
    const {getOrder} = useOrderContext()
    const [order, setOrder] = useState()
    const [orderDishItems, setOrderDishItem] = useState()
    const route = useRoute()
    
    const id = route.params?.id

    useEffect(()=>{
       getOrder(id).then(setOrder)
    },[])

    if(!order){
        return <ActivityIndicator  size={"large"} color="black" />
    }

    return(
        <FlatList
          ListHeaderComponent={<OrderDetailsHeader order={order}/>}  
          data={order.dishes}
          renderItem={({item})=> <BasketDishItem  basketDish={item}/>}  
         />
    )
}

export default OrderDetails