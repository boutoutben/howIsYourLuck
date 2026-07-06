import { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Button,
  Platform,
} from "react-native";
import axios from "axios";

import Header from "@/components/header";
import PlanningElement from "@/components/PlanningElement";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AppButton from "@/components/AppButton";
import { Text } from "@react-navigation/elements";
import { Calendar } from 'react-native-calendars';
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from '@react-native-community/datetimepicker';

function generateCalendar(year, month) {
  const calendar = [];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let week = [];

  const start = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = start - 1; i >= 0; i--) {
    week.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push({
      day,
      currentMonth: true,
    });

    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  let nextDay = 1;

  while (week.length > 0 && week.length < 7) {
    week.push({
      day: nextDay++,
      currentMonth: false,
    });
  }

  if (week.length) {
    calendar.push(week);
  }

  return calendar;
}

export default function TabTwoScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [visible, setVisible] = useState(false);
   const [cellSize, setCellSize] = useState(
    (Dimensions.get("window").width * 0.9) / 7
  );
  const [data, setData] = useState({
    activity: "",
    date: new Date()
  })

  const [open, setOpen] = useState(false);

  const checkActivity = async (id) => {
    try {
      await axios.put(
        "http://192.168.1.91:3000/planning/check/" + id
      );

      await loadActivity(selectedDate);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  const calendar = generateCalendar(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const monthName = currentDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

 
  const loadActivity = async (date) => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.91:3000/planning/" + date.toISOString()
      );
      setActivities(data);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    loadActivity(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
  const subscription =
    Dimensions.addEventListener("change", ({ window }) => {
      setCellSize((window.width * 0.9) / 7);
    });

  return () => subscription.remove();
}, []);

  const registerActivity = async () => {

    try {
      await axios.post(
        "http://192.168.1.91:3000/planning",
        {
          planning_name: data.activity,
          planning_date: data.date,
          planning_check:false
        }
      );

      
      setVisible(false);

      await loadActivity(selectedDate);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  return (
    <View>
      <View style={styles.header}>
          <Header />
        </View>
      <ScrollView  contentContainerStyle={{ paddingTop: 160 }}>
        <ThemedView style={styles.home}>
          <ThemedText style={[styles.title, styles.white]}>
            Mon calendrier
          </ThemedText>
          <AppButton
            title="Ajouter un accomplissement"
            onPress={() => setVisible(true)}
          />
          <View>
            {/* HEADER CALENDAR */}
            <View style={styles.headerCalender}>
              <Pressable
                onPress={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                <Image
                  source={require("@/assets/icons/arrow.svg")}
                  style={styles.arrow}
                />
              </Pressable>

              <ThemedText style={[styles.text, styles.white]}>
                {monthName}
              </ThemedText>

              <Pressable
                onPress={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                <Image
                  source={require("@/assets/icons/arrow.svg")}
                  style={[styles.arrow, styles.reverse]}
                />
              </Pressable>
            </View>

            {/* CALENDAR GRID */}
            <View style={styles.table}>
              {calendar.map((week, i) => (
                <View key={i} style={styles.row}>
                  {week.map((item, j) => {
                    const isToday =
                      item.currentMonth &&
                      item.day === selectedDate.getDate() &&
                      currentDate.getMonth() === selectedDate.getMonth() &&
                      currentDate.getFullYear() === selectedDate.getFullYear();

                    return (
                      <Pressable
                        key={`${i}-${j}`}
                        onPress={() => {
                          if (item.currentMonth) {
                            const date = new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              item.day
                            );
                            setSelectedDate(date);
                          }
                        }}
                      >
                        <View
                          style={[
                            styles.cell,
                            {
                              width:cellSize,
                              height:cellSize/2
                            },
                            isToday && styles.today,
                          ]}
                        >
                          <ThemedText
                            style={[
                              styles.cellText,
                              !item.currentMonth && styles.muted,
                              isToday && styles.todayText,
                            ]}
                          >
                            {item.day}
                          </ThemedText>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        

          {/* ACTIVITIES */}
          <View style={styles.items}>
            {activities?.map((act) => (
              !act.planning_check &&
                <PlanningElement
                  key={act.planning_id}
                  text={act.planning_name}
                  editable
                  onclick={() => checkActivity(act.planning_id)}
                />
            ))}
          </View>
        </ThemedView>
        <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
              >
                <View style={styles.overlay}>
                  <View style={styles.alertbox}>
                    <ThemedText style={[styles.white, styles.modalTitle]}>
                      Ajouter une activité
                    </ThemedText>
        
                    <View style={styles.field}>
                      <Text style={[styles.white, styles.label]}>
                        Activité :
                      </Text>
        
                      <TextInput
                        style={styles.input}
                        placeholder="Activité..."
                        placeholderTextColor="#999"
                        value={data.activity}
                        onChangeText={(text) =>
                          setData((prev) => ({
                            ...prev,
                            activity: text,
                          }))
                        }
  />
                    </View>

                    <View style={styles.field}>
                      <Text style={[styles.white, styles.label]}>
                        Date :
                      </Text>
                      <AppButton
                        title={
                          data.date
                            ? data.date.toLocaleDateString("fr-FR")
                            : "Choisir une date"
                        }
                        onPress={() => setOpen(true)}
                      />
                    
                  {open && (
                    <View style={styles.calendarOverlay}>
                      <Calendar
                        theme={{
                          selectedDayBackgroundColor: "#E9C46A",
                          todayTextColor: "#2F8F5B",
                          arrowColor: "#E9C46A",
                        }}
                        onDayPress={(day) => {
                          setOpen(false);
                          setData((prev) => ({
                            ...prev,
                            date: new Date(day.dateString),
                          }));
                        }}
                      />
                    </View>
                  )}


                  </View>
                                  
                    <AppButton
                      title={"Ajouter"}
                    onPress={registerActivity}
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
      </ScrollView>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#2F8F5B",
    paddingVertical: 40,
    paddingHorizontal: "5%",
    gap: 25,
    minHeight: height - 100,
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

  white: {
    color: "#fff",
  },

  title: {
    fontSize: 32,
  },

  text: {
    fontSize: 17,
  },

  headerCalender: {
    flexDirection: "row",
    backgroundColor: "#145A32",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderTopEndRadius:7,
    borderTopStartRadius:7,
  },

  arrow: {
    width: 30,
    height: 35,
  },

  reverse: {
    transform: [{ rotate: "180deg" }],
  },

  table: {
    marginTop: 0,
    width:"100%",
    
  },

  row: {
    flexDirection: "row",
     width: "100%",
  },

  cell: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#145A32",
    borderWidth: 2,
    borderColor: "#fff",
  },

  cellText: {
    color: "white",
    fontSize: 16,
  },

  muted: {
    color: "#bbb",
  },

  today: {
    backgroundColor: "#E9C46A",
  },

  todayText: {
    color: "black",
  },

  items: {
    gap: 15,
    marginHorizontal: "5%",
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
  calendarOverlay: {
  position: "absolute",
  top: 100,        // ajuste selon ton header
  left: 20,
  right: 20,

  zIndex: 999,
  elevation: 10,   // important sur Android

  backgroundColor: "white",
  borderRadius: 12,

  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 10,
}
});