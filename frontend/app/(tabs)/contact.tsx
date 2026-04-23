import { Image } from 'expo-image';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';

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

export default function TabTwoScreen() {
  return (
    <ScrollView>
        <ThemedView style={styles.home}>
          <Header />
            <ThemedText style={[styles.title, styles.white]}>Qui contacter</ThemedText>
            <View style={styles.btnContainer}>
                <AppButton title={"Ajouter un contact"} onPress={() => alert("cc")} />
            </View>
            <View style={styles.items}>
              <PersonElement img={"benjamin"} nom={"Boutout"} prenom={"Benjamin"} statue={"Copain"} />
              <PersonElement img={"benjamin"} nom={"Facq"} prenom={"Cassandre"} statue={"Mère"} />
            </View>

        </ThemedView>
    </ScrollView>
  );
}
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    margin: 0,
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 35,
    minHeight:height-100
  },
   btnContainer: {
    alignItems:"flex-end"
  },
   items: {
        gap: 15,
        marginHorizontal:"5%",
    }, 
});
