import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsPage from '../screens/RestaurantDetailsScreen';
import OrderDetails from '../screens/OrderDetailsSrceen';
import { Foundation,AntDesign,FontAwesome5  } from '@expo/vector-icons';
import DishDetailsScreen from '../screens/DishDetailScreen';
import Basket from '../screens/Basket';
import OrdersScreen from '../screens/OrdersScreen';
import Profile from '../screens/ProfileScreen';
import { useAuthContext } from '../context/AuthContext';
import OrderDetailsNavigation from './OrderDetailsNavigation';

const Stack = createNativeStackNavigator();

const RootNavigator= ()=> {
  
  const {dbUser} = useAuthContext()
  return (
    
    <Stack.Navigator screenOptions={{headerShown: false}}>
       {dbUser ? (
           <Stack.Screen name="HomeTabs" component={HomeTabs} />
       ):(
        <Stack.Screen name="Profile" component={Profile} />
       )
      }
       
     
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const HomeTabs =()=> {
  return (
    <Tab.Navigator  
       screenOptions={{headerShown: false, tabBarStyle:{backgroundColor:"orange"}}}
     >
      <Tab.Screen name="Home" component={HomeStackNavigator}
       options={{tabBarIcon:({color})=> <Foundation name="home" size={24} color={color}/>}} 
       />
      <Tab.Screen name="OrdersTab" component={OrderStackNavigator} 
         options={{tabBarIcon:({color})=> <FontAwesome5 name="first-order-alt" size={24} color={color} />}}  
         />
      <Tab.Screen name="Profile" component={Profile}
        options={{tabBarIcon:({color})=> <AntDesign name="user" size={24} color={color} />}}  
        />

    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = ()=>{
    return(
      <HomeStack.Navigator>
       <HomeStack.Screen name="Restaurants"  component={HomeScreen} 
       />
       <HomeStack.Screen name="Restaurant"  component={RestaurantDetailsPage} options={{headerShown:false}}
         />
       <HomeStack.Screen name="Dish"  component={DishDetailsScreen}/>
       <HomeStack.Screen name="Basket"  component={Basket}/>


     </HomeStack.Navigator>
    )
}

const OrdersStack = createNativeStackNavigator();

const OrderStackNavigator = ()=>{
    return(
      <OrdersStack.Navigator>
       <HomeStack.Screen name="Orders"  component={OrdersScreen}/>
       <HomeStack.Screen name="Order"  component={OrderDetailsNavigation}/>
       
     </OrdersStack.Navigator>
    )
}

export default RootNavigator;