import { View, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { Image } from "expo-image";

export default function SettingAttr({name,value}) {
    return (
        <View style={styles.row}>
            <ThemedText style={[styles.white, styles.text]}>{name} : {value}</ThemedText>
            <Image source={require("@/assets/icons/edit.svg")} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    white: {
        color: "white"
    },
    img: {
        width: 30,
        height:30
    },
    text:{
        fontSize:17
    },
    
})