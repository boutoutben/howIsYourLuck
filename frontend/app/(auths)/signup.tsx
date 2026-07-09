import { Dimensions, ScrollView, StyleSheet, TextInput, View,Button, Text } from 'react-native';

import Header from '@/components/header';
import AppButton from '@/components/AppButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { useNavigation, useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();
  const [showPicker, setShowPicker] = useState(false);

  const [data, setData] = useState({
    nom: "",
    prenom: "",
    date: new Date(),
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      console.log(data);

      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user`,
        {
          user_firstname: data.nom,
          user_lastname: data.prenom,
          birth_day: data.date.toISOString().split("T")[0],
          email: data.email,
          user_password: data.password,
        }
      );

      setData({
        nom: "",
        prenom: "",
        date: new Date(),
        email: "",
        password: "",
      });

    } catch (error: any) {
      console.log(
        "API ERROR:",
        error.response?.data ?? error.message
      );
    }
  };

  return (
    <View>
              <View style={styles.header}>
                  <Header />
                </View>
  <ScrollView contentContainerStyle={{ paddingTop: 130 }}>
    <ThemedView style={styles.home}>

      <ThemedText style={[styles.title, styles.white]}>
        Créer un compte
      </ThemedText>

      <View style={styles.form}>
        <View style={styles.field}>
  <ThemedText style={styles.label}>Nom :</ThemedText>

  <TextInput
    style={styles.input}
    placeholder="Votre nom"
    placeholderTextColor="#999"
    autoCapitalize="none"
    value={data.nom}
    onChangeText={(text) => {
      setData((prev) => ({
        ...prev,
        nom: text,
      }));
    }}
  />
</View>

<View style={styles.field}>
  <ThemedText style={styles.label}>Prenom :</ThemedText>

  <TextInput
    style={styles.input}
    placeholder="Votre prenom"
    placeholderTextColor="#999"
    autoCapitalize="none"
    value={data.prenom}
    onChangeText={(text) => {
      setData((prev) => ({
        ...prev,
        prenom: text,
      }));
    }}
  />
</View>

<View style={styles.field}>
  <ThemedText style={styles.label}>
    Date de naissance :
  </ThemedText>

  <AppButton
    title={
      data.date
        ? data.date.toLocaleDateString("fr-FR")
        : "Choisir une date"
    }
    onPress={() => setShowPicker(true)}
  />

  {showPicker && (
    <View style={styles.calendarOverlay}>
      <Calendar
        theme={{
          selectedDayBackgroundColor: "#E9C46A",
          todayTextColor: "#2F8F5B",
          arrowColor: "#E9C46A",
        }}
        onDayPress={(day) => {
          setShowPicker(false);

          setData((prev) => ({
            ...prev,
            date: new Date(day.dateString),
          }));
        }}
      />
    </View>
  )}
</View>

<View style={styles.field}>
  <ThemedText style={styles.label}>Email :</ThemedText>

  <TextInput
    style={styles.input}
    placeholder="Votre email"
    placeholderTextColor="#999"
    keyboardType="email-address"
    autoCapitalize="none"
    value={data.email}
    onChangeText={(text) => {
      setData((prev) => ({
        ...prev,
        email: text,
      }));
    }}
  />
</View>

<View style={styles.field}>
  <ThemedText style={styles.label}>Mot de passe :</ThemedText>

  <TextInput
    style={styles.input}
    placeholder="Votre mot de passe"
    placeholderTextColor="#999"
    secureTextEntry
    value={data.password}
    onChangeText={(text) => {
      setData((prev) => ({
        ...prev,
        password: text,
      }));
    }}
  />
</View>
      </View>

      <View>
        <AppButton
          title="Créer un compte"
          onPress={register}
        />
      </View>

      <View>
        <AppButton
          title="Se connecter"
          onPress={() => router.push("/(auths)/login")}
        />
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
    paddingTop:30,
    minHeight:height-100
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

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  white: {
    color: 'white',
  },

  form: {
    gap: 20,
  },

  field: {
    gap: 8,
  },

  label: {
    color: 'white',
    fontSize: 16,
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },

  btnContainer: {
    alignItems: 'center',
  },
   calendarOverlay: {
  position: "absolute",
  top: 100,        // ajuste selon ton header
  left: 20,
  right: 20,

  zIndex: 999,
  elevation: 10,   // important sur Android

  backgroundColor: "white",
  borderRadius: 12,

  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 10,
},
});