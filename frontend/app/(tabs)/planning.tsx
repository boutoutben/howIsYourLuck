import { Image } from 'expo-image';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

import Header from '@/components/header';
import PlanningElement from '@/components/PlanningElement';

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.home}>
        <Header />
        <ThemedText style={[styles.title, styles.white]}>Mon calendrier</ThemedText>
        <View>
          <View style={styles.headerCalender}>
            <Image source={require("@/assets/icons/arrow.svg")} style={styles.arrow} />
            <ThemedText style={[styles.text,styles.white]}>Avril 2026</ThemedText>
             <Image source={require("@/assets/icons/arrow.svg")} style={[styles.arrow, styles.reverse]} />
            
          </View>
          <table style={styles.table}>
              <tr>
                <td style={{ ...styles.cell, ...styles.muted }}>29</td>
                <td style={{ ...styles.cell, ...styles.muted }}>30</td>
                <td style={{ ...styles.cell, ...styles.muted }}>31</td>
                <td style={styles.cell}>1</td>
                <td style={styles.cell}>2</td>
                <td style={styles.cell}>3</td>
                <td style={styles.cell}>4</td>
              </tr>
              <tr>
                <td style={styles.cell}>5</td>
                <td style={styles.cell}>6</td>
                <td style={styles.cell}>7</td>
                <td style={styles.cell}>8</td>
                <td style={styles.cell}>9</td>
                <td style={styles.cell}>10</td>
                <td style={styles.cell}>11</td>
              </tr>
              <tr>
                <td style={styles.cell}>12</td>
                <td style={styles.cell}>13</td>
                <td style={styles.cell}>14</td>
                <td style={styles.cell}>15</td>
                <td style={styles.cell}>16</td>
                <td style={styles.cell}>17</td>
                <td style={{...styles.cell,...styles.today}}>18</td>
              </tr>
              <tr>
                <td style={styles.cell}>19</td>
                <td style={styles.cell}>20</td>
                <td style={styles.cell}>21</td>
                <td style={styles.cell}>22</td>
                <td style={styles.cell}>23</td>
                <td style={styles.cell}>24</td>
                <td style={styles.cell}>25</td>
              </tr>
              <tr>
                <td style={styles.cell}>26</td>
                <td style={styles.cell}>27</td>
                <td style={styles.cell}>28</td>
                <td style={styles.cell}>29</td>
                <td style={styles.cell}>30</td>
                <td style={{ ...styles.cell, ...styles.muted }}>1</td>
                <td style={{ ...styles.cell, ...styles.muted }}>2</td>
              </tr>
            </table>
        </View>
        <View style={styles.items}>
          <PlanningElement text={"Faire les courses à LIDL"} editable={true} />
          <PlanningElement text={"Réviser mon code"} editable={true} />
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
  home: {
    backgroundColor: "#2F8F5B",
    margin: 0,
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 25,
    minHeight:height-100
  },
  headerCalender: {
    flexDirection:"row",
    backgroundColor:"#145A32",
    alignItems:"center",
    width:"100%",
    justifyContent  :"center",
    paddingHorizontal:25, 
    paddingVertical: 7,
    justifyContent:"space-between"
  },
  white: {
    color: "#ffff"
  },
  items: {
    gap: 15,
     marginHorizontal:"5%",
  }, 
  reverse: {
    transform: "rotate(180deg)"
  },
  title: {
    fontSize:32,
  },
   text:{
    fontSize:17
  },
   table: {
      borderCollapse: "collapse",
      margin: "20px auto",
      fontFamily: "Arial, sans-serif"
    },
    cell: {
      width: "30px",
      height: "25px",
      textAlign: "center",
      verticalAlign: "middle",
      backgroundColor:"#145A32",
      border: "3px solid #fff",
      color:"white",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.2s"
    },
    muted: {
      color: "#bbb"
    },
    today: {
      backgroundColor: "#E9C46A",
      color:"black"
    },
    arrow: {
      width:30,
      height:35,
    }
});
