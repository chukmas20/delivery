import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container:{
        backgroundColor:'lightblue', flex:1
    },
    handleIndicator:{
        marginTop:10,flexDirection:"row", alignItems:'center', justifyContent:'center', marginBottom:20
    },
    routeDetailsText:{
        fontSize:25, letterSpacing:0.1
    },
    deliveryDetailsContainer:{
        paddingHorizontal:20
    },
    restaurantName:{
        fontSize:20, letterSpacing:0.5, paddingVertical:20
    },
    addressContainer:{
        flexDirection:"row", alignItems:'center'
    },
    addressText:{
        fontSize:20,
        letterSpacing:0.5,
        paddingVertical:20,
        marginLeft:10      
    },
    orderDetailsContainer:{
        borderTopWidth:1, borderColor:'lightgrey',paddingTop:20
    },
    orderItemText:{
        fontSize:18,color:"grey",fontWeight:"500", letterSpacing:0.5,marginBottom:5
    },
    buttonContainer:{
         marginTop:"auto", marginVertical:30, marginHorizontal:10, borderRadius:10
    },
    buttonText:{
        color:"white", paddingVertical:15, fontSize:25,fontWeight:"500", textAlign:"center",letterSpacing:0.5
    }
})