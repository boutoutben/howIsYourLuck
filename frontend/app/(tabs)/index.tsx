import { Image } from 'expo-image';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useNavigation } from 'expo-router';
import Header from '@/components/header';
import AchementElement from '@/components/AchementElement';
import PersonElement from '@/components/PersonElement';
import PlanningElement from '@/components/PlanningElement';
import { useState } from 'react';
import AppButton from '@/components/AppButton';




export default function HomeScreen() {
  const navigate = useNavigation();
  const [textHover, setTextHover] = useState(false);
  return (
   // 
    <ScrollView  >  
      <ThemedView style={styles.home}>

      
      <Header/>
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, styles.white]}>Bienvenue Juliette!</ThemedText>
        </View>
        <View style={styles.container}>
            <ThemedText style={[styles.subtitle, styles.white]}>Tes Accomplissements</ThemedText>
            <View style={[styles.items]}>   
              <AchementElement text={"J'ai réussi à sortir de la maison pour aller marcher"} date={"08/04/2026"}  editable={false} />
              <AchementElement text={"J'ai eu une bonne note en maths"} date={"02/03/2026"} editable={false} />
          </View>
          <View style={styles.btnContainer}>
            <AppButton title={"Ajouter un accomplissement"} onPress={() => navigate.navigate("achevement")}/>
          </View>
          
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <ThemedText style={[styles.subtitle,styles.white]}>Planning</ThemedText>
            <ThemedText
            onMouseEnter={() => setTextHover(true)}
            onMouseLeave={() => setTextHover(false)}
            onPress={() => navigate.navigate('planning')}
            style={[
              styles.text,
              styles.white,
              textHover && styles.textHover,
            ]}
          >
            Aujourd'hui
          </ThemedText>
          </View>
          <View style={styles.items}>
            <PlanningElement text={"Faire les courses à LIDL"} editable={false} />
            <PlanningElement text={"Réviser mon code"} editable={false} />
          </View>
        </View >



        <View style={styles.container}>
          <ThemedText style={[styles.subtitle, styles.white]}>A qui parler</ThemedText>
          <View style={[styles.items]}>   
          <PersonElement img={"benjamin"} nom={"Boutout"} prenom={"Benjamin"} statue={"Copain"} />
          <PersonElement img={"benjamin"} nom={"Facq"} prenom={"Cassandre"} statue={"Mère"} />
          
          </View>
          <View style={styles.btnContainer}>
            <AppButton title={"Ajouter un contact"} onPress={() => navigate.navigate("contact")} />
          </View>
        </View>
        </ThemedView>
      </ScrollView >
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#2F8F5B",
    margin: 0,
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 25,
  },
  header: {
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between"
  },
  container: {
    gap: 30,
  },
  items: {
    gap: 15,
     marginHorizontal:"5%",
  }, 
  btnContainer : {
    paddingHorizontal: "5%",
  },
  person: {
    backgroundColor: "#145A32",
    borderWidth:6,
    borderColor:"#ffff",
    borderRadius:15,
    paddingVertical:25,
    paddingHorizontal:25,
    justifyContent:"center",
  },
  
  textHover: {
    color: "#E9C46A"
  },
  task : {
    paddingHorizontal:10,
    paddingVertical: 30,
    backgroundColor: "#145A32",
    borderColor:"#ffff",
    borderWidth:4,
    borderRadius:10,
    textAlign:"center"
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 30
  },
  title: {
    fontSize:32,
    fontWeight:"bold"
  },
  subtitle: {
    fontSize:25,
    fontWeight:"bold"
  },
  text:{
    fontSize:17
  },
  row: {
    flexDirection:"row",
    justifyContent:"space-between",
    gap:15
  },
  white:{
    color:"#ffff"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 80,
    width: 80,
  },
});
