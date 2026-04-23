import { Image } from "expo-image";
import { ThemedText } from "./themed-text";
import { View,StyleSheet } from "react-native";

export default function PersonElement({prenom,nom,statue,img}) {
    const images = {
        benjamin: require('@/assets/images/benjaminPhoto.jpg'),
        };
    return (
        <View style={[styles.person,styles.textImg]}>
             <Image
                source={images[img]}
                style={styles.personImg}
            />
            <View style={styles.personText}>
                <ThemedText style={[styles.text,styles.white]}>{prenom} {nom}</ThemedText>
                <ThemedText style={[styles.text,styles.white]}>{statue}</ThemedText>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    person: {
    backgroundColor: "#145A32",
    borderWidth:6,
    borderColor:"#ffff",
    borderRadius:15,
    paddingVertical:25,
    paddingHorizontal:25,
    justifyContent:"center",
  },
    personImg: {
    width:75,
    height:75,
    borderRadius:15
  },
  personText: {
    gap:15,
    alignSelf:"center"
  },
  textImg: {
    flexDirection: "row",
    gap:30,
  },
   text:{
    fontSize:17
  },
  white: {
    color:"white"
  }
})