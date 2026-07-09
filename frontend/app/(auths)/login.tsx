import { Dimensions, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import Header from '@/components/header';
import AppButton from '@/components/AppButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNavigation, useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();
  const navigate = useNavigation();
  return (
     <View>
          <View style={styles.header}>
              <Header />
            </View>
    <ScrollView contentContainerStyle={{ paddingTop: 130 }}>
      <ThemedView style={styles.home}>

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

        <View>
          <AppButton
            title="Se connecter"
            onPress={() => router.push("/(tabs)")}
          />
        </View>
        <View>
          <AppButton
            title="Créer un compte"
            onPress={() => router.push("/(auths)/signup")}
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


});