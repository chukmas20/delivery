import { Button, Card, Table } from 'antd'
import React from 'react';
import { Link } from 'react-router-dom';
import dishes from "../../assets/data/dishes";


const RestaurantMenu = () => {
    const tableColumns =[
       {
        title:"Menu Item",
        dataIndex: "name",
        key:"name"
       },
       {
        title:"Price",
        dataIndex: "price",
        key:"price",
        render:(price)=> `${price} ₦`
       },
       {
        title:"Action",
        key:"action",
        render:()=> <Button danger>Remove</Button>
       },
    ];

    const renderNewItemButton =()=>(
        <Link to={"create"}>
            <Button type='primary'> New Item</Button>
        </Link>
    )

    
  return (
    <Card title={"Menu"} style={{margin:20}} extra={renderNewItemButton()}>
        <Table  dataSource={dishes} columns={tableColumns} rowKey="id" />
    </Card>
  )
}

export default RestaurantMenu