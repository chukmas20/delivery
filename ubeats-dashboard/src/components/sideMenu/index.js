import { Menu } from 'antd'
import { Auth } from 'aws-amplify'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurantContext } from '../../contexts/RestaurantContext'

const SideMenu = () => {
    const navigate = useNavigate()
    const {restaurant} = useRestaurantContext()

    const onMenuItemClick = async(menuItem)=>{
        if(menuItem.key === "signOut"){
             await Auth.signOut();
             window.location.reload()
        }else{
           navigate(menuItem.key)
        }
      }

      const mainMenuItems =[
        {
            key:"/",
            label:"Orders"
        },
        {
            key:"/menu",
            label:"Menu"
        },
        {
            key:"/order-history",
            label:"Order History"
        },
       
    ]

    const menuItems =[
        ...(restaurant ? mainMenuItems : []),
        {
            key:"/settings",
            label:"Settings"
        },
        {
            key:"signOut",
            label:"Sign out",
            danger: "true",
        }
    ]

  return (
     <>
      <h4>{restaurant && restaurant.name}</h4>
       <Menu items={menuItems} onClick={onMenuItemClick}/>    
     </>
  )
}

export default SideMenu