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
import { Button, Text } from "@react-navigation/elements";

export default function TabTwoScreen() {
  const [visible, setVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [data, setData] = useState("");
  const [achevements, setAchevements] = useState<any[]>([]);

  const loadAchevements = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/achevement`
      );

      setAchevements(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadAchevements();
  }, []);

  const registerAccomplissement = async () => {
    if (!data.trim()) return;

    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/achevement`,
        {
          achevement_name: data,
          achevement_date: new Date(),
        }
      );

      setData("");
      setVisible(false);

      await loadAchevements();
    } catch (error) {
      console.log("API ERROR:", error.message);
    }
  };

  const updateAchevement = async () => {
    if (!selectedId || !data.trim()) return;

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/achevement/${selectedId}`,
        {
          achevement_name: data,
        }
      );

      setVisible(false);
      setIsUpdate(false);
      setSelectedId(null);
      setData("");

      await loadAchevements();
    } catch (error) {
      console.log("API ERROR:", error.message);
    }
  };

  const openUpdate = (item: any) => {
    setSelectedId(item.achevement_id);
    setData(item.achevement_name);
    setIsUpdate(true);
    setVisible(true);
  };

  const openCreate = () => {
    setData("");
    setSelectedId(null);
    setIsUpdate(false);
    setVisible(true);
  };

  return (
    <>
      <View>
          <View style={styles.header}>
              <Header />
            </View>
        <ScrollView  contentContainerStyle={{ paddingTop: 130 }}>
          <ThemedView style={styles.home}>
            <ThemedText style={[styles.white, styles.title]}>
              Mes accomplissements
            </ThemedText>

            <View style={styles.btnContainer}>
              <AppButton
                title="Ajouter un accomplissement"
                onPress={openCreate}
              />
            </View>

            <View style={styles.items}>
              {achevements.map((item) => (
                <AchementElement
                  key={item.achevement_id}
                  id={item.achevement_id}
                  text={item.achevement_name}
                  date={new Date(
                    item.achevement_date
                  ).toLocaleDateString("fr-FR")}
                  editable
                  update={() => openUpdate(item)}
                />
              ))}
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
                {isUpdate
                  ? "Modifier un accomplissement"
                  : "Ajouter un accomplissement"}
              </ThemedText>

              <View style={styles.field}>
                <Text style={[styles.white, styles.label]}>
                  Accomplissement :
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Accomplissement..."
                  placeholderTextColor="#999"
                  value={data}
                  onChangeText={setData}
                />
              </View>

              

              <AppButton
                title={isUpdate ? "Mettre à jour" : "Ajouter"}
                onPress={() => {
                  if (isUpdate) {
                    updateAchevement();
                  } else {
                    registerAccomplissement();
                  }
                }}
              />

              <AppButton
                title="Fermer"
                onPress={() => {
                  setVisible(false);
                  setIsUpdate(false);
                  setSelectedId(null);
                  setData("");
                }}
              />
            </View>
          </View>
        </Modal>
       </View>
    </>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    home: {
    backgroundColor: "#2F8F5B",
    margin: 0,
    paddingVertical: 30,
    paddingHorizontal: "5%",
    gap: 25,
    paddingTop:30,
    minHeight:height-175
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