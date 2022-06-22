import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import orders from "./assets/data/orders.json"
import OrderDelivery from './src/screens/OrderDelivery';
import OrdersScreen from './src/screens/OrdersScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from './src/navigation';
import {Amplify} from "aws-amplify";
import awsconfig from "./src/aws-exports";
import {withAuthenticator} from "aws-amplify-react-native";
import AuthContextProvider from './src/contexts/AuthContext';
import OrderContextProvider from './src/contexts/OrderContext';

Amplify.configure({...awsconfig, Analytics:{
  disabled: true
}})


 function App() {
  return (
       <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
           <AuthContextProvider>
            <OrderContextProvider>
               <Navigation />
            </OrderContextProvider>
           </AuthContextProvider>
          </GestureHandlerRootView>
          <StatusBar style="auto" />
      </NavigationContainer>
  );
}

export default withAuthenticator(App);

