import { Image } from 'expo-image';
import { Button, Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import Header from '@/components/header';
import AchementElement from '@/components/AchementElement';
import AppButton from '@/components/AppButton';


export default function TabTwoScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.home}>
        <Header/>
        <ThemedText style={[styles.white,styles.title]}>Mes accomplissements</ThemedText>
        <View style={styles.btnContainer}>
           <AppButton title={"Ajouter un accomplissement"} onPress={() => console.log('Pressed')}/>
        </View>
        <View style={styles.items}>
           <AchementElement text={"J'ai réussi à sortir de la maison pour aller marcher"} date={"08/04/2026"} editable={true} />
            <AchementElement text={"J'ai eu une bonne note en maths"} date={"02/03/2026"} editable={true} />
            <AchementElement text={"J'ai arrêté de fummer"} date={"09/09/2025"} editable={true} />
            <AchementElement text={"J'ai bien réussi mon code"} date={"08/07/2025"} editable={true} />
        </View>
       
      </ThemedView>
    </ScrollView>
  );
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
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
  white: {
    color: "#ffff"
  },
  title: {
    fontSize:32,
  },
  items: {
    gap: 15,
     marginHorizontal:"5%",
  }, 
});
