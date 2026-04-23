import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor:"#2F8F5B",
          height:100
        },
        tabBarItemStyle: {
          paddingVertical: 30,
        }
      }}>
     <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require("@/assets/icons/home.svg")}
              style={{width:50, height: 50 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="achevement"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require("@/assets/icons/achevement.svg")}
              style={{ width: 45, height: 50 }}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="planning"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require("@/assets/icons/planning.svg")}
              style={{ width: 58, height: 50 }}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="contact"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require("@/assets/icons/contact.svg")}
              style={{ width: 48, height: 50 }}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="setting"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require("@/assets/icons/setting.svg")}
              style={{ width: 50, height: 50 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
