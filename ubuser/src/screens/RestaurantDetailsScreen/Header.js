
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import styles from './styles';


const Header = ({restaurant}) => {
  return (
    <View style={styles.page}>
      <Image source={{uri:restaurant.image}} style={styles.image} />
      <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.subtitle}>
           ₦{restaurant.deliveryFee.toFixed(1)} &#8226;
            {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime}minutes
       </Text>
       <Text style={styles.menuTitle}> Menu</Text>
      </View>
    </View>
  )
}

export default Header

