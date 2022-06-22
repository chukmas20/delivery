import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page:{
      flex:1,
    },
    iconContainer:{
        position:"absolute",
        top:40,
        left:10,
        borderRadius:50,
    },
    image:{
       width:"100%",
       aspectRatio:4 / 3
    },
    title:{
        fontSize:35,
        fontWeight:"600",
        marginVertical:10    
    },
    menuTitle:{
      marginTop: 10,
      fontSize:18,
      letterSpacing:0.7
    },
    subtitle:{
        fontSize: 20,
        color:"lightgray"
    },
    container:{
        margin:10
    },
    button:{
        backgroundColor:'black',
        marginTop:"auto",
        padding:20,
        alignItems:"center",
        margin:10
      },
      buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize: 18
      }
})