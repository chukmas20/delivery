import React, { useEffect, useState } from 'react'
import {Card, Descriptions, Divider,List, Button, Tag, Spin} from "antd";
// import dishes from "../../assets/data/dishes";
import { useParams } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Order, OrderDish, OrderStatus, User } from '../../models';



  const statusToColor = {
    [OrderStatus.PICKED_UP]: "orange",
    [OrderStatus.COMPLETED]: "green",
    [OrderStatus.DECLINED_BY_RESTAURANT]: "red",
  };


const DetailedOrder = () => {
    const {id} = useParams();
    const [order, setOrder] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [dishes, setDishes] = useState([])

    const onAccept = async()=>{
      updateOrderStatus(OrderStatus.COOKING);
    }
    
    const onDecline = async()=>{
      updateOrderStatus(OrderStatus.DECLINED_BY_RESTAURANT);
    }
    
    const readyForPickup = async()=>{
      updateOrderStatus(OrderStatus.READY_FOR_PICKUP);
    }
    
    const updateOrderStatus =async( newStatus)=>{
      const updateOrder = await DataStore.save(Order.copyOf(order, updated=>{
        updated.status =  newStatus
     }))
     setOrder(updateOrder)
    }
    


    useEffect(()=>{
        DataStore.query(Order,id).then(setOrder)
    }, [id])

    useEffect(()=>{
       if(!order?.id){
         return;
       }
       DataStore.query(OrderDish, c=> c.orderID("eq", order.id)).then(setDishes)
    }, [order?.id])

   useEffect(()=>{
     if(order?.userID){
       DataStore.query(User, order.userID).then(setCustomer)
     }
   }, [order?.userID])
    // console.log(dishes)

    if(!order){
       return <Spin size='large'/>
    }
  return (
    <Card title={`Order ${id}`} style={{margin:20}}>
      <Tag color={statusToColor[order.status]}>{order.status}</Tag>
    <Descriptions bordered column={{lg:1, md:1, sm:1}}>
         <Descriptions.Item label="Customer Name">{customer?.name}</Descriptions.Item>
         <Descriptions.Item label="Customer Address"> {customer?.address}</Descriptions.Item>
    </Descriptions>
     <Divider />
        <List 
        dataSource={dishes}
        renderItem={(dishItem)=>(
            <List.Item>
                <div style={{fontWeight:"bold"}}>{dishItem?.Dish?.name} x {dishItem?.quantity}</div>
                <div> ₦ {dishItem?.Dish?.price}</div>
            </List.Item>
        )}
        />
     <Divider />
     <div style={styles.totalSumContainer}>
        <h2> Total :</h2>
        <h2 style={styles.totalPrice}> ₦ {order?.total?.toFixed(2)}</h2>
     </div>
     <Divider />
     { order?.status === OrderStatus.NEW && (
        <div style={styles.buttonsContainer}>
        <Button block type="danger" size="large" style={styles.button} onClick={onDecline}>
            Decline Order
        </Button>
        <Button block type="primary" size="large" style={styles.button} onClick={onAccept}>
            Accept  Order
        </Button>
      </div>
      )}
      {order?.status === OrderStatus.COOKING && (
           <Button block type="primary" size="large" onClick={readyForPickup} >
           Food Is Done
         </Button>
      )}
   </Card>
  )
}

const styles = {
    totalSumContainer:{
       display:"flex",
       justifyContent:"space-between"
    },
   totalprice:{
     fontWeight:"bold"
   },
   buttonsContainer:{
     display:"flex",
     paddingBottom:30
   },
   button:{
     marginRight: 10,
     marginLeft:20
   }
 }

export default DetailedOrder 