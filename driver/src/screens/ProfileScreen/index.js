import { View, Text, TextInput, StyleSheet, Button, Alert, Pressable } from "react-native";
import React, {useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import {useNavigation} from "@react-navigation/native"
import { Courier, TransportationModes } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";



const Profile = () => {
  const {dbCourier, sub, setDbCourier} = useAuthContext()
  const [name, setName] = useState(dbCourier?.name || "");

  const [transportationMode, setTransportationMode] = useState(TransportationModes.DRIVING)
  

  const navigation = useNavigation()


 const onSave = async () => {
    if (dbCourier) {
      await updateCourier();
    } else {
      await createCourier();
    }
    navigation.goBack();
  };

  const updateCourier = async () => {
    const courier = await DataStore.save(
      Courier.copyOf(dbCourier, (updated) => {
        updated.name = name;
        updated.transportationMode = transportationMode;
      })
    );
    setDbCourier(courier);
  };

  const createCourier = async () => {
    try {
      const courier = await DataStore.save(
        new Courier({
          name,
          sub,
          transportationMode,
        })
      );
      setDbCourier(courier);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
       <View style={{flexDirection:"row"}}>
           <Pressable 
                 onPress={()=> setTransportationMode(TransportationModes.CYCLING)}
                 style={{ 
                  backgroundColor:
                  transportationMode === TransportationModes.CYCLING ? 
                  'lightgreen': "white",
                   margin:10,padding:10,
                   borderWidth:1,
                   borderColor:'gray',
                   borderRadius: 10
                }}>
              <MaterialIcons name="pedal-bike" size={40} color="black" />
           </Pressable>
           <Pressable 
                  onPress={()=> setTransportationMode(TransportationModes.DRIVING)}
                  style={{
                  backgroundColor:
                   transportationMode === TransportationModes.DRIVING ? 
                  'lightgreen': "white",
                  margin:10,padding:10,
                  borderWidth:1,
                  borderColor:'gray',
                  borderRadius: 10
              }}
             >
              <FontAwesome name="car" size={40} color="black" />
           </Pressable>
       </View>
     
      <Button onPress={onSave} title="Save" styles={{margin:10}} />
      <Text onPress={()=> Auth.signOut()} style={{textAlign:"center", color:"red", margin:10}}> Sign Out</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
