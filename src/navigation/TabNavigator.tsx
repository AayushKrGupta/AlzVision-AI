import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InsightsScreen from '../screens/InsightsScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 65, // slightly taller for rounded top
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: -5 },
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    paddingTop: 8,
                    paddingBottom: 8,
                    position: 'absolute', // Needed to float *just* on top of content to show rounded corners properly against background
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#2563eb', // blue-600
                tabBarInactiveTintColor: '#94a3b8',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Scan') {
                        iconName = focused ? 'scan' : 'scan-outline';
                    } else if (route.name === 'History') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Insights') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: 'History' }} />
            <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarLabel: 'Scan' }} />
            <Tab.Screen name="Insights" component={InsightsScreen} options={{ tabBarLabel: 'Insight' }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator >
    );
};

export default TabNavigator;
