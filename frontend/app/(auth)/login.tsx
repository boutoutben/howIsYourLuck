import { Dimensions, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import Header from '@/components/header';
import AppButton from '@/components/AppButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.home}>
        <Header />

        <ThemedText style={[styles.title, styles.white]}>
          Connection
        </ThemedText>

        <View style={styles.form}>
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
            title="Se connecter"
            onPress={() => alert('Connexion')}
          />
          <AppButton
            title="Créer un compte"
            onPress={() => router.push("/(auth)/signup")}
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