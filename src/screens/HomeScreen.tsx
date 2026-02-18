import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { getScans, ScanResult } from '../utils/storage';

function QuickActionCard({ icon, label, status, onPress }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-[30%] bg-white dark:bg-slate-800 p-4 rounded-[24px] shadow-sm border border-gray-50 dark:border-slate-800 h-32 justify-between"
        >
            <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
                <Ionicons name={icon} size={20} color="#1f2937" />
            </View>
            <View>
                <Text className="font-bold text-gray-900 dark:text-white text-base">{label}</Text>
                <Text className="text-gray-400 text-xs font-medium">{status}</Text>
            </View>
        </TouchableOpacity>
    );
}

const HomeScreen = ({ navigation }: any) => {
    const [recentScans, setRecentScans] = useState<ScanResult[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchScans = async () => {
                const scans = await getScans();
                setRecentScans(scans.slice(0, 5)); // Get recent 5
            };
            fetchScans();
        }, [])
    );
    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-6 pb-4 flex-row justify-between items-center bg-transparent">
                    <View>
                        <Text className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wider">Keep moving today!</Text>
                        <Text className="text-4xl font-black text-gray-900 dark:text-white">AlzVision AI</Text>
                    </View>
                    <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center">
                        <Text className="font-bold text-xl text-gray-700">A</Text>
                    </View>
                </View>

                {/* Hero Action Card */}
                <Animated.View entering={FadeInDown.delay(100).duration(600)} className="mx-6 mt-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Scan')}
                        className="bg-blue-600 rounded-[32px] p-8 shadow-lg shadow-blue-200 flex-row items-center justify-between"
                        style={{ minHeight: 160 }}
                    >
                        <View className="flex-1 mr-4">
                            <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mb-4">
                                <Ionicons name="scan" size={24} color="white" />
                            </View>
                            <Text className="text-white text-2xl font-bold mb-1">Start New Scan</Text>
                            <Text className="text-white/90 font-medium">Analyze MRI scans instantly with high precision AI.</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={28} color="white" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Quick Actions (Your connections style) */}
                <View className="px-6 mt-8">
                    <Text className="text-gray-500 font-bold mb-4 ml-1">Quick Actions</Text>
                    <View className="flex-row justify-between">
                        <QuickActionCard icon="time" label="History" status="View" onPress={() => navigation.navigate('History')} />
                        <QuickActionCard icon="stats-chart" label="Trends" status="Analyze" onPress={() => navigation.navigate('Insights')} />
                        <QuickActionCard icon="document-text" label="Reports" status="Export" onPress={() => { }} />
                    </View>
                </View>

                {/* Recent Activity Section */}
                <Animated.View entering={FadeInDown.delay(200).duration(600)} className="mx-6 mt-8 mb-32">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <View className="bg-blue-600 px-3 py-1 rounded-full mr-3">
                                <Text className="text-white text-xs font-bold">NEW</Text>
                            </View>
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">Recent Scans</Text>
                        </View>
                        {/* Crown icon from reference image */}
                        <View className="bg-blue-50 p-2 rounded-xl">
                            <Ionicons name="medical" size={20} color="#2563eb" />
                        </View>
                    </View>

                    {/* Sim Gamepad Large Bottom Card Style for List */}
                    <View className="bg-white dark:bg-slate-800 rounded-[32px] p-2 shadow-sm min-h-[200px]">
                        {recentScans.length > 0 ? (
                            recentScans.map((item, index) => (
                                <View key={index} className="flex-row items-center p-4 border-b border-gray-50 last:border-0">
                                    <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${item.label === 'Non_Demented' ? 'bg-green-100' : 'bg-red-50'
                                        }`}>
                                        <Ionicons
                                            name={item.label === 'Non_Demented' ? "happy" : "alert-circle"}
                                            size={28}
                                            color={item.label === 'Non_Demented' ? "#16a34a" : "#dc2626"}
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Scan #{item.id}</Text>
                                        <Text className="text-gray-400 font-medium text-xs uppercase">{item.label.replace(/_/g, ' ')}</Text>
                                    </View>
                                    <View className="bg-gray-100 px-3 py-1 rounded-full">
                                        <Text className="text-gray-600 font-bold text-xs">{item.confidence}%</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View className="h-48 items-center justify-center">
                                <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                                    <Ionicons name="scan-outline" size={32} color="#9ca3af" />
                                </View>
                                <Text className="text-gray-400 font-medium">No scans yet</Text>
                            </View>
                        )}
                    </View>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
