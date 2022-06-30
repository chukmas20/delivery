import { Card, Table, Tag } from 'antd';
import React from 'react'
import ordersHistory from "../../assets/data/orders-history.json";


const OrderHistory = () => {

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
            render:(status)=> <Tag color={status ==="Delivered" ? "green":"red"}>{status}</Tag>
         },
    ]
  return (
    <Card title={"Orders History"} style={{margin: 20}}>
    <Table  
       dataSource={ordersHistory}
       columns={tableColumns}
       rowKey="orderID"
    />
 </Card>
  )
}

export default OrderHistory