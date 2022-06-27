import { View, Text, ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDelivery from '../screens/OrderDelivery';
import Profile from '../screens/ProfileScreen';
import { useAuthContext } from '../contexts/AuthContext';


const Stack = createNativeStackNavigator();

const Navigation = () => {

  const { dbCourier } = useAuthContext();

  if(dbCourier === null){
     return <ActivityIndicator   size={"large"}  color="gray"     />
  }
  
  
  return (
 <Stack.Navigator screenOptions={{headerShown:false}}>
    {dbCourier ? (
       <>
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="OrdersDelivery" component={OrderDelivery} />
       </> 
    ):(
       <Stack.Screen name="Profile" component={Profile} />
    )}
    
 </Stack.Navigator>
  )
}

export default Navigation

