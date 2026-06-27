import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import axios from "axios";
import Header from "@/components/header";
import AchementElement from "@/components/AchementElement";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@react-navigation/elements";

async function registerAccomplissement({ data }: { data: any }) {
  console.log(data);
  if (data != null) {
    await axios.post("http://localhost:3000/achevement", {
      "achevement_id": 8,
      "achevement_name": data, 
      "achevement_date": Date.now() 
    });
  }
}

export default function TabTwoScreen() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState("");

  return (
    <>
      <ScrollView>
        <ThemedView style={styles.home}>
          <Header />

          <ThemedText style={[styles.white, styles.title]}>
            Mes accomplissements
          </ThemedText>

          <View style={styles.btnContainer}>
            <AppButton
              title="Ajouter un accomplissement"
              onPress={() => setVisible(true)}
            />
          </View>

          <View style={styles.items}>
            <AchementElement
              text="J'ai réussi à sortir de la maison pour aller marcher"
              date="08/04/2026"
              editable
            />

            <AchementElement
              text="J'ai eu une bonne note en maths"
              date="02/03/2026"
              editable
            />

            <AchementElement
              text="J'ai arrêté de fumer"
              date="09/09/2025"
              editable
            />

            <AchementElement
              text="J'ai bien réussi mon code"
              date="08/07/2025"
              editable
            />
          </View>
        </ThemedView>
      </ScrollView>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.alertbox}>
            <ThemedText style={[styles.white, styles.modalTitle]}>
              Ajouter un accomplissement
            </ThemedText>

            <View style={styles.field}>
              <Text style={[styles.white, styles.label]}>
                Accomplissements :
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Accomplissement ..."
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={data}
                onChangeText={setData}
              />
            </View>
            <AppButton
              title="Ajouter"
              onPress={() => registerAccomplissement({data})}
            />

            <AppButton
              title="Fermer"
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#2F8F5B",
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 35,
    minHeight: height - 100,
  },

  btnContainer: {
    alignItems: "flex-end",
  },

  items: {
    gap: 15,
    marginHorizontal: "5%",
  },

  white: {
    color: "#FFF",
  },

  title: {
    fontSize: 32,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  alertbox: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#145A32",
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },

  modalTitle: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },

  field: {
    width: "100%",
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#000",
    fontSize: 16,
  },
});