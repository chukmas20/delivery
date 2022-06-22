import { DataStore } from "aws-amplify";
import { createContext, useState, useEffect, useContext } from "react";
import { Basket, BasketDish } from "../models";
import { useAuthContext } from "./AuthContext";



const BasketContext = createContext({})

const BasketContextProvider =({children})=>{
    const [basket, setBasket] = useState(null)
    const [restaurant, setRestaurant] = useState(null)
    const [basketDishes, setBasketDishes] = useState([])
    const {dbUser} = useAuthContext()

    const totalPrice = basketDishes.reduce((sum, basketDish) =>
        sum + basketDish.quantity * basketDish.Dish.price,
        restaurant?.deliveryFee
     )

    useEffect(()=>{
       DataStore.query(Basket, (b)=>
        b.restaurantID("eq", restaurant.id).UserID('eq', dbUser.id)
       ).then((baskets)=> setBasket(baskets[0]))
    },[dbUser, restaurant])

    useEffect(()=>{
      if(basket){
          DataStore.query(BasketDish, bd=> bd.basketID("eq", basket.id)).then(setBasketDishes)
      }
    }, [basket])

    const addDishToBasket = async (dish, quantity)=>{
     //get existing basket or create new one
     let theBasket = basket || (await createNewBasket())

     //create a new basket dish item and save
     const newDish = await DataStore.save(new BasketDish({quantity, Dish: dish, basketID: theBasket.id}))
      setBasketDishes([...basketDishes, newDish])
    }
    
    const createNewBasket = async()=>{
        const newBasket = await DataStore.save(
            new Basket({ userID : dbUser.id, restaurantID: restaurant.id})
        )
        setBasket(newBasket);
        return newBasket;
    }

   return(
       <BasketContext.Provider value={{
            addDishToBasket, setRestaurant,
            basket, basketDishes,
            restaurant, totalPrice
          }}
        >
            {children}
       </BasketContext.Provider>
   )
}

export default BasketContextProvider;

export const useBasketContext =()=> useContext(BasketContext);