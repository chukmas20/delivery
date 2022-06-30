import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
    const navigate = useNavigate()
    const menuItems =[
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
        {
            key:"/settings",
            label:"Settings"
        },
    ]

    const onMenuItemClick =(menuItem)=>{
    //    console.log(menuItem)
      navigate(`${menuItem.key}`)
    }
  return (
     <Menu items={menuItems} onClick={onMenuItemClick}/>    
  )
}

export default SideMenu