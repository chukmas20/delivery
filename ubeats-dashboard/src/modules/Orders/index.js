import { Card, Table, Tag } from 'antd'
// import orders from "../../assets/data/orders";
import {useNavigate} from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import { useRestaurantContext } from '../../contexts/RestaurantContext';

const Orders = () => {
   const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const {restaurant} = useRestaurantContext()

    useEffect(()=>{
       if(!restaurant){
         return;
       }
       DataStore.query(Order, (order)=>
         order.orderRestaurantId("eq", restaurant.id).or(orderStatus => 
         orderStatus.status("eq", "NEW")
         .status("eq","COOKING")
         .status("eq","ACCEPTED")
         .status("eq","READY_FOR_PICKUP")))
         .then(setOrders)
    }, [restaurant])

    const renderOrderStatus =(orderStatus)=>{
      const statusToColor = {
        [OrderStatus.NEW]: "yellow",
        [OrderStatus.COOKING]: "orange",
        [OrderStatus.READY_FOR_PICKUP]: "red",
        [OrderStatus.ACCEPTED]: "green",
      };
  
      return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>;

    }
    const tableColumns = [
        {
           title:"Order ID",
           dataIndex:"id",
           key: "id",
        },
        {
            title:"Created At",
            dataIndex:"createdAt",
            key: "createdAt",
         },
         {
            title:"Price",
            dataIndex:"total",
            key: "total",
            render:(price)=> `${price.toFixed(2)} ₦`
         },
         {
            title:"Status",
            dataIndex:"status",
            key: "status",
            render:renderOrderStatus
         },
    ]

  return (
    <Card title={"Orders"} style={{margin: 20}}>
        <Table  
           dataSource={orders}
           columns={tableColumns}
           rowKey="orderID"
           onRow={(orderItem)=>({
             onClick:()=> navigate(`/order/${orderItem.id}`)
           })}
        />

    </Card>
  )
}

export default Orders