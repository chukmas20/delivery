import { View, Text } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import {Ionicons } from "@expo/vector-icons";



const CustomMarker = ({data, type}) => {
  return (
    <Marker
    coordinate={{
      latitude:data.lat,
      longitude: data.lng
    }}
    title={data.name}
    description={data.address}
    >  
    <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
        {type === "RESTAURANT" ?
         (<Ionicons name="restaurant" size={24} color="white" /> ):(
          <Ionicons name="person" size={24} color="white" />
         )
       }
     </View>               
   </Marker>
  )
}

export default CustomMarker