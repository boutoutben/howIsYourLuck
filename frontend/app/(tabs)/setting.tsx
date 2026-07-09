import { Image } from 'expo-image';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import Header from '@/components/header';
import SettingAttr from '@/components/SettingAttr';

export default function TabTwoScreen() {
  return (
    <View>
      <View style={styles.header}>
                <Header />
              </View>
      <ScrollView  contentContainerStyle={{ paddingTop: 130 }}>
        <ThemedView style={styles.home}>
          <View style={styles.row}>
            <ThemedText style={[styles.title,styles.white]}>Paramètre</ThemedText>
            <Image 
              source={require("@/assets/images/juliette.png")}
              style={styles.img}
            />
          </View>
          <View style={styles.items}>
              <SettingAttr name={"Nom"} value={"Morrez-facq"} />
              <SettingAttr name={"Prenom"} value={"Juliette"} />
              <SettingAttr name={"Date de naissance"} value={"08/01/2008"} />
              <SettingAttr name={"Email"} value={"juliette.morrez@gmail.com"} />
              <SettingAttr name={"Téléphone"} value={"06 56 66 67 69"} />
              <SettingAttr name={"Passions"} value={"Animaux"} />
            </View>
        </ThemedView>
      </ScrollView>
   </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#2F8F5B",
    margin: 0,
    paddingVertical: 30,
    paddingHorizontal: "5%",
    gap: 25,
    paddingTop:0
  },
 header: {
  position: "absolute",
  backgroundColor: "#2F8F5B",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  elevation: 1000, // important sur Android
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
   white:{
    color:"white"
  },
  title: {
    fontSize:32,
  },
  home: {
    backgroundColor: "#2F8F5B",
    margin: 0,
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 35,
    minHeight:height-175
  },
   btnContainer: {
    alignItems:"flex-end"
  },
  img: {
    width:125,
    height:100,
    objectFit:"cover",
    borderWidth:2,
    borderRadius:15
  },
  row: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",

  },
  items: {
        gap: 15,
        marginHorizontal:"5%",
    }, 
});
