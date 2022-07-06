import { Auth, DataStore } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { Restaurant } from "../models";

const RestaurantContext = createContext({})

const RestaurantContextProvider =({children})=>{
    const [user, setUser] = useState()
    const [restaurant, setRestaurant] = useState()

    const sub = user?.attributes?.sub

    useEffect(()=>{
       Auth.currentAuthenticatedUser({bypassCache:true}).then(setUser)
    }, [])

    useEffect(()=>{
        if(!sub){
            return;
        }
       // fetch restaurant and filter by admin sub
       DataStore.query(Restaurant,(r) => r.adminSub("eq", sub))
       .then((restaurants)=> setRestaurant(restaurants[0]))
    }, [sub, restaurant])
    // console.log(sub)
    return(
        <RestaurantContext.Provider  value={{restaurant, sub, setRestaurant,user, setUser}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider

export const useRestaurantContext =()=> useContext(RestaurantContext)