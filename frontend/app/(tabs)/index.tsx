import { Image } from 'expo-image';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, Redirect, useNavigation } from 'expo-router';
import Header from '@/components/header';
import AchementElement from '@/components/AchementElement';
import PersonElement from '@/components/PersonElement';
import PlanningElement from '@/components/PlanningElement';
import { useEffect, useState } from 'react';
import AppButton from '@/components/AppButton';
import axios from 'axios';


export default function HomeScreen() {
  const navigate = useNavigation();

  const [textHover, setTextHover] = useState(false);
  const [achevements, setAchevements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [contacts, setContact] = useState([]);

  const loadAchevements = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.91:3000/achevement"
      );

      setAchevements(data);
    } catch (e) {
      console.log(e);
    }
  };

 const loadActivity = async (date) => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.91:3000/planning/" + date.toISOString()
      );
      setActivities(data);
      console.log(data)
    } catch (e) {
      console.log(e);
    }
  };

   const loadContact = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.91:3000/contact"
      );

      setContact(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("cc");
    loadAchevements();
    loadActivity(new Date());
    loadContact();
  }, []);

  return (
    <View>
      <View style={styles.header}>
          <Header />
        </View>
      <ScrollView contentContainerStyle={{ paddingTop: 160 }}>
        <ThemedView style={styles.home}>
          

          <View style={styles.titleContainer}>
            <ThemedText style={[styles.title, styles.white]}>
              Bienvenue Juliette!
            </ThemedText>
          </View>

          {/* ACHIEVEMENTS */}
          <View style={styles.container}>
            <ThemedText style={[styles.subtitle, styles.white]}>
              Tes Accomplissements
            </ThemedText>
            {achevements.length > 0 ? (
              achevements.map((ach) => (
                <AchementElement
                  key={ach.achevement_id}
                  text={ach.achevement_name}
                  date={new Date(ach.achevement_date).toLocaleDateString("fr-FR")}
                  editable={false}
                />
              ))
            ) : (
              <ThemedText style={{ color: "#fff" }}>
                Aucun accomplissement
              </ThemedText>
            )}
            <View style={styles.items}>
              
            </View>
            <View style={styles.btnContainer}>
              <AppButton title={"Ajouter un accomplissement"} onPress={() => navigate.navigate("achevement")}/>
            </View>
          </View>

          {/* PLANNING */}
          <View style={styles.container}>
            <View style={styles.row}>
              <ThemedText style={[styles.subtitle, styles.white]}>
                Planning
              </ThemedText>

              <ThemedText
                onPress={() => navigate.navigate("planning")}
                style={[styles.text, styles.white, textHover && styles.textHover]}
              >
                Aujourd'hui
              </ThemedText>
            </View>

            <View style={styles.items}>
              {activities.length > 0 ? (
                activities.map((act) => (
                  <PlanningElement
                    key={act.planning_id}
                    text={act.planning_name}
                    editable={false}
                  />
                ))
              ) : (
                <ThemedText style={{ color: "#fff" }}>
                  Aucun planning aujourd’hui
                </ThemedText>
              )}
            </View>
          </View>

          {/* CONTACT */}
          <View style={styles.container}>
            <ThemedText style={[styles.subtitle, styles.white]}>
              A qui parler
            </ThemedText>
            <View>
            {contacts?.length > 0 ? (
              contacts.map((con) => (
                <PersonElement
                  key={con.contact_id}
                  img={`http://192.168.1.91:3000/uploads/${con.contact_img}`}
                  nom={con.contact_name}
                  statue={con.contact_role}
                />
              ))
            ) : (
              <ThemedText style={{ color: "#fff" }}>
                Aucun contact
              </ThemedText>
            )}
            </View>
            <View style={styles.btnContainer}>
              <AppButton
                title={"Ajouter un contact"}
                onPress={() => navigate.navigate("contact")}
              />
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

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
