import { View, Image, StyleSheet, Platform } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';


export default function Header({ count = 0 }) {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/assets/icons/howIsYoursLuckLogo.png')} 
        style={styles.logo}
      />

      <ThemedText type="title" style={[styles.title,styles.white]}>
        HowIsYourLuck
      </ThemedText>

      <ThemedView style={styles.count}>
        <ThemedText>
          {count}
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
 header: {
  position: "fixed",
  top: 50,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: "#2F8F5B",
  width:"100%",
  paddingHorizontal:20,
  paddingVertical:25,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},


  count: {
  backgroundColor: "#2F8F5B",
  borderWidth: 2,
  borderColor: "#ffff",
  borderRadius: 50,
  paddingHorizontal: 22,
    paddingVertical: 15,
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 4, // Android
},

  title: {
    fontSize:25,
  },

  white:{
    color:"#ffff"
  },
  logo: {
    height: 60,
    width: 70,
  },
});

