import { Dimensions, ScrollView, StyleSheet, TextInput, View,Button, Text } from 'react-native';

import Header from '@/components/header';
import AppButton from '@/components/AppButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TabTwoScreen() {



  function DatePicker() {
    const [date, setDate] = useState(new Date());
    const [visible, setVisible] = useState(false);

    const handleConfirm = (selectedDate: Date) => {
      setDate(selectedDate);
      setVisible(false);
    };

    return (
      <View style={{ padding: 20 }}>
        <Text>
          Date : {date.toLocaleDateString("fr-FR")}
        </Text>

        <Button
          title="Choisir une date"
          onPress={() => setVisible(true)}
        />

        <DateTimePickerModal
          isVisible={visible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setVisible(false)}
        />
      </View>
    );
  }

  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setBirthDate(selectedDate);
    setShowPicker(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.home}>
        <Header />

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
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Prenom :</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Votre prenom"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>
              Date de naissance :
            </ThemedText>

            <AppButton
              title={birthDate.toLocaleDateString("fr-FR")}
              onPress={() => setShowPicker(true)}
            />

            <DateTimePickerModal
              isVisible={showPicker}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => setShowPicker(false)}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Email :</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Votre email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Mot de passe :</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <AppButton
            title="Créer un compte"
            onPress={() => alert('Connexion')}
          />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#2F8F5B',
    paddingVertical: 40,
    paddingHorizontal: '5%',
    gap: 35,
    minHeight: height - 100,
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
});