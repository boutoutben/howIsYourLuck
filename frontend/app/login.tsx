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
import { Label } from '@react-navigation/elements';

export default function TabTwoScreen() {
  return (
    <ScrollView>
        <ThemedView style={styles.home}>
          <Header />
            <ThemedText style={[styles.title, styles.white]}>Connection</ThemedText>
            <table>
                <tr style={styles.field}>
                    <td><Label>Email : </Label></td>
                    <td><input type="text" name="email" id="email" /></td>
                </tr>
                <tr style={styles.field}>
                    <td><Label>Mot de passe : </Label></td>
                    <td><input type="password" name="password" id="password" /></td>
                </tr>
            </table>
            <View style={styles.btnContainer}>
                <AppButton title={"Connecter"} onPress={() => alert("cc")} />
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
  field: {
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
    alignItems:"center"
  },
   items: {
        gap: 15,
        marginHorizontal:"5%",
    }, 
});
