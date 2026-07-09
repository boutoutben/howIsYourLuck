import { Image } from 'expo-image';
import { Button, Dimensions, Modal, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import AppButton from '@/components/AppButton';
import PersonElement from '@/components/PersonElement';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { Text } from '@react-navigation/elements';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
  

export default function TabTwoScreen() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    nom: "",
    prenom:"",
    roles:"",
    img:""
  });
  const [contact, setContact] = useState<any[]>([]);

  const [image, setImage] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

     if (!result.canceled) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        name: asset.fileName ?? asset.uri.split("/").pop()!,
      });
    }
  }

  

  const registerContact = async () => {
    try {
      let filename = null;

      if (!image) {
        return;
      }

      const formData = new FormData();

      formData.append("file", {
        uri: image.uri,
        name: image.name,
        type: "image/jpeg",
      } as any);

      const uploadResponse = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      filename = uploadResponse.data.filename;

      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/contact`,
        {
          contact_name: data.prenom + " " + data.nom,
          contact_role: data.roles,
          contact_img: filename,
        }
      );

      setVisible(false);

      setData({
        nom: "",
        prenom:"",
        roles:"",
        img:""
      })

      await loadContact();

    } catch (error: any) {
      console.log(
        "API ERROR:",
        error.response?.data ?? error.message
      );
    }
  };

    const loadContact = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/contact`
      );

      setContact(data);
    } catch (e) {
      console.log(e);
    }
  };

   useEffect(() => {
    console.log("API:", process.env.EXPO_PUBLIC_API_URL);
      loadContact();
    }, []);

  return (
    <View>
      <View style={styles.header}>
                <Header />
              </View>
      <ScrollView contentContainerStyle={{ paddingTop: 130 }}>
          <ThemedView style={styles.home}>
            
              <ThemedText style={[styles.title, styles.white]}>Qui contacter</ThemedText>
              <View style={styles.btnContainer}>
                  <AppButton title={"Ajouter un contact"} onPress={() => setVisible(true)} />
              </View>
              <View style={styles.items}>
                {contact.map((item) => (
                  <PersonElement
                     key={item.contact_id}
                    img={`${process.env.EXPO_PUBLIC_API_URL}/uploads/${item.contact_img}`}
                    nom={item.contact_name}
                    statue={item.contact_role}
                  />
                ))}
              </View>
              <Modal
                      visible={visible}
                      transparent
                      animationType="fade"
                      onRequestClose={() => setVisible(false)}
                    >
                      <View style={styles.overlay}>
                        <View style={styles.alertbox}>
                          <ThemedText style={[styles.white, styles.modalTitle]}>
                            "Ajouter un contact"
                          </ThemedText>
              
                          <View style={styles.field}>
                            <Text style={[styles.white, styles.label]}>
                              Nom :
                            </Text>
              
                            <TextInput
                              style={styles.input}
                              placeholder="Nom..."
                              placeholderTextColor="#999"
                              value={data.nom}
                              onChangeText={(text) =>
                                  setData((prev) => ({
                                    ...prev,
                                    nom: text,
                                  }))
                                }
                            />
                          </View>
                          <View style={styles.field}>
                            <Text style={[styles.white, styles.label]}>
                              prenom :
                            </Text>
              
                            <TextInput
                              style={styles.input}
                              placeholder="Nom..."
                              placeholderTextColor="#999"
                              value={data.prenom}
                              onChangeText={(text) =>
                                  setData((prev) => ({
                                    ...prev,
                                    prenom: text,
                                  }))
                                }
                            />
                          </View>
                          <View style={styles.field}>
                            <Text style={[styles.white, styles.label]}>
                              Roles :
                            </Text>
              
                            <TextInput
                              style={styles.input}
                              placeholder="Nom..."
                              placeholderTextColor="#999"
                              value={data.roles}
                              onChangeText={(text) =>
                                  setData((prev) => ({
                                    ...prev,
                                    roles: text,
                                  }))
                                }
                            />
                          </View>
                          <View style={styles.field}>
                            <Text style={[styles.white, styles.label]}>
                              Image :
                            </Text>
              
                            <Button title="Choisir une image" onPress={pickImage} />
                          </View>
              
                          <AppButton
                            title={"Ajouter"}
                            onPress={() => {
                              registerContact()
                            }}
                          />
              
                          <AppButton
                            title="Fermer"
                            onPress={() => {
                              setVisible(false);
                            }}
                          />
                        </View>
                      </View>
                    </Modal>
          </ThemedView>
      </ScrollView>
    </View>
  );
}
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  title: {
    fontSize:32,
  },
  white:{
    color:"white"
  },
 home: {
    backgroundColor: "#2F8F5B",
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 25,
    minHeight: height - 175,
    paddingTop: 30
  },
   btnContainer: {
    alignItems:"flex-end"
  },
   items: {
        gap: 15,
        marginHorizontal:"5%",
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
