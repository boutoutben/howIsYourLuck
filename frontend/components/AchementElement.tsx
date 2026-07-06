import { View, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import axios from "axios";



export default function AchementElement({text, date,editable,id=null, update=() => console.log("cc")}) {
    return (
        <View style={styles.row}>
            <ThemedText style={[styles.white, styles.text]}>{text}</ThemedText>
            <View style={styles.group}>
                 <ThemedText style={[styles.white, styles.text]}>{date}</ThemedText>
                 {editable && (<ThemedText style={[styles.edit,styles.white]} onPress={update}>modifier</ThemedText>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection:"row",
        justifyContent:"space-between",
        gap:15
    },
    white: {
        color:"#ffff"
    },
    text:{
        fontSize:17
    },
    edit: {
        fontSize:15,
        textDecorationLine:"underline",
    },
    group: {
        alignItems:"center"
    }
    
})