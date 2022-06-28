import { View, Text } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDetails from '../screens/OrderDetailsSrceen';
import OrderLiveUpdate from '../screens/OrderLiveUpdate';

const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigation = ({route}) => {
    const id = route?.params?.id
    return (
       <Tab.Navigator>
           <Tab.Screen name="Details">{() => <OrderDetails id={id} />}</Tab.Screen>

          <Tab.Screen name="Updates">
               {() => <OrderLiveUpdate id={id} />}
          </Tab.Screen>
      </Tab.Navigator>
      );
}

export default OrderDetailsNavigation