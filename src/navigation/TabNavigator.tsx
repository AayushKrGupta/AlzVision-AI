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
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 25,
                    height: 70,
                    borderTopWidth: 0,
                },
                tabBarBackground: () => (
                    <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="light" />
                ),
                tabBarShowLabel: false,
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

                    const isScan = route.name === 'Scan';

                    if (isScan) {
                        return (
                            <View className="mb-10 p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-300 border-4 border-white dark:border-slate-900">
                                <Ionicons name="scan" size={30} color="white" />
                            </View>
                        )
                    }

                    return <Ionicons name={iconName} size={24} color={focused ? '#007AFF' : '#94a3b8'} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarStyle: { display: 'none' } }} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
