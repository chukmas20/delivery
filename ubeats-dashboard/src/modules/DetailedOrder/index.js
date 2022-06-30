import React from 'react'
import {Card, Descriptions, Divider,List, Button} from "antd";
import dishes from "../../assets/data/dishes";
import { useParams } from 'react-router-dom';


const DetailedOrder = () => {
    const {id} = useParams()
  return (
    <Card title={`Order ${id}`} style={{margin:20}}>
    <Descriptions bordered column={{lg:1, md:1, sm:1}}>
         <Descriptions.Item label="Customer Name">John Markus</Descriptions.Item>
         <Descriptions.Item label="Customer Address"> Isheri Lagos</Descriptions.Item>
    </Descriptions>
     <Divider />
        <List 
        dataSource={dishes}
        renderItem={(dishItem)=>(
            <List.Item>
                <div style={{fontWeight:"bold"}}>{dishItem.name} x {dishItem.quantity}</div>
                <div>{dishItem.price}</div>
            </List.Item>
        )}
        />
     <Divider />
     <div style={styles.totalSumContainer}>
        <h2> Total :</h2>
        <h2 style={styles.totalPrice}> ₦6500</h2>
     </div>
     <Divider />
     <div style={styles.buttonsContainer}>
       <Button block type="danger" size="large" style={styles.button}>
           Decline Order
       </Button>
       <Button block type="primary" size="large" style={styles.button}>
           Accept  Order
       </Button>
     </div>
     <Button block type="primary" size="large" >
            Food Is Done
       </Button>
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