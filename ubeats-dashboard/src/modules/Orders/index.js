import { Card, Table, Tag } from 'antd'
import orders from "../../assets/data/orders";
import {useNavigate} from "react-router-dom"
import React from 'react'

const Orders = () => {
    const navigate = useNavigate()
    const renderOrderStatus =(orderStatus)=>{
       if(orderStatus === "Accepted"){
         return <Tag color={'green'}> {orderStatus} </Tag>
       }
       if(orderStatus === "Pending"){
        return <Tag color={'yellow'}> {orderStatus} </Tag>
      }
      if(orderStatus === "Declined"){
        return <Tag color={'red'}> {orderStatus} </Tag>
      }
    }
    const tableColumns = [
        {
           title:"Order ID",
           dataIndex:"orderID",
           key: "orderID",
        },
        {
            title:"Delivery Address",
            dataIndex:"deliveryAddress",
            key: "deliveryAddress",
         },
         {
            title:"Price",
            dataIndex:"price",
            key: "price",
            render:(price)=> `${price} ₦`
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
             onClick:()=> navigate(`/order/${orderItem.orderID}`)
           })}
        />

    </Card>
  )
}

export default Orders