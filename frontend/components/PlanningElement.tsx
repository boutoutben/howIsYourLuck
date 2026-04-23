import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { Image } from "expo-image";

export default function PlanningElement({text,editable}) {
    return (
        <View style={styles.row}>
             <ThemedText style={[styles.task, styles.white,styles.text]}>{text}</ThemedText>
            {editable && (<Image source={require("@/assets/icons/check.svg")} style={styles.img} />)}
        </View>
       
    )
}

const styles = StyleSheet.create({
      task : {
    paddingHorizontal:10,
    paddingVertical: 30,
    backgroundColor: "#145A32",
    borderColor:"#ffff",
    borderWidth:4,
    borderRadius:10,
    textAlign:"center",
    width:"100%"
  },
  row: {
    flexDirection:"row", 
    gap: 10,
    alignItems:"center"
  },
  white: {
    color: "white"
  },
  text:{
    fontSize:17
  },
  img: {
    width:45,
    height:45,
  }
})