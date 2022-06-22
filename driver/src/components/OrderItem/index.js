import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import orders from "../../../assets/data/orders.json";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../../models';


// const order = orders[0]

const OrderItem = ({order}) => {
   const [user, setUser] = useState(null)
   const navigation = useNavigation()

   useEffect(()=>{
     DataStore.query(User, order.userID).then(setUser)
   }, [])
    return (
        <Pressable 
           style={{
                    flexDirection:"row",
                    borderWidth:2,
                    margin:10,
                    borderRadius:10,
                    borderColor:"#3fc060"
                    }}
                    onPress={()=> navigation.navigate("OrdersDelivery",{id:order.id})}
              >
           <Image  source={{uri:order.Restaurant.image}} style={styles.image} />
          <View style={{flex: 1, marginLeft:10, paddingVertial:5}} >
            <Text style={{fontSize:14, fontWeight:'500'}}>{order.Restaurant.name}</Text>
            <Text>{order.Restaurant.address}</Text>
            <Text style={{marginTop:10, fontWeight:'bold'}}>Delivery Details:</Text>
            <Text>{user?.name}</Text>
            <Text>{user?.address}</Text>
          </View>
          <View style={{marginLeft:'auto',
           backgroundColor:"orange",
            borderBottomRightRadius:10,
            borderTopRightRadius:10,
            alignItems:"center",
            justifyContent:"center",
          }}
            >
              <Entypo name="check" size={24} color="white" style={{padding:5}} />
          </View>
        </Pressable>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        },
        image:{
            height:"100%",
            width: "25%",
            borderBottomLeftRadius:10,
            borderTopLeftRadius:10,
            
        }
      });

export default OrderItem