import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify"; 
import { Courier, Order, OrderDish, User } from "../models";
import { useAuthContext } from "./AuthContext";


const OrderContext = createContext({})

const OrderContextProvider =({children})=>{
    const {dbCourier} = useAuthContext();
    const [order, setOrder] = useState()
    const [user, setUser] = useState()
    const [dishes, setDishes] = useState()


    const fetchOrder = async(id)=>{
        if(!id){
            setOrder(null);
            return;
        }
         
          const fetchedOrder = await DataStore.query(Order, id)
          setOrder(fetchedOrder);

          DataStore.query(User, fetchedOrder.userID).then(setUser)

           DataStore.query(OrderDish,
             (od) => od.orderID("eq", fetchedOrder.id)).then(
             setDishes
            )

    }

    useEffect(()=>{
      if(!order){
        return;
      }
      const subscription = DataStore.observe(Order,order.id).subscribe(({opType, element}) =>{
        if(opType === "UPDATE"){
          // console.log("Order has been updated", element)
          // setOrder((existingOrder)=> ({...existingOrder, ...element}))
          fetchOrder(element.id)
        }
      })
      return ()=> subscription.unsubscribe()
    },[order?.id])

    const acceptOrder = async() =>{
     //update the order, and change status and assign driver
      const updatedOrder = await DataStore.save(
        Order.copyOf(order,(updated)=>{
            updated.status = "ACCEPTED";//update to accepted
            updated.Courier = dbCourier;
        })
      )
      console.log(updatedOrder)
      setOrder(updatedOrder);
    }

    const pickUpOrder = async() =>{
        //update the order, and change status and assign driver
         const updatedOrder =  await DataStore.save(
           Order.copyOf(order,(updated)=>{
               updated.status = "PICKED_UP";//update to accepted
           })
         )
         setOrder(updatedOrder)
       }

       const completeOrder = async() =>{
        //update the order, and change status and assign driver
        const updatedOrder = await DataStore.save(
           Order.copyOf(order,(updated)=>{
               updated.status = "COMPLETED";//update to accepted
               updated.Courier = dbCourier;
           })
         )
         setOrder(updatedOrder)
       }
     return(
        <OrderContext.Provider value={{acceptOrder, order,user, dishes, fetchOrder,pickUpOrder, completeOrder }}>
              {children}
        </OrderContext.Provider>
     )
}

export default OrderContextProvider

export const useOrderContext =()=> useContext(OrderContext)
