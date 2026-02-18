import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { getScans, ScanResult } from '../utils/storage';

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
                <View className="px-6 pt-6 pb-4 flex-row justify-between items-center">
                    <View>
                        <Text className="text-gray-500 font-medium text-sm uppercase tracking-wider">Welcome Back</Text>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1">AlzVision AI</Text>
                    </View>
                    <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
                        <Ionicons name="notifications-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>

                {/* Hero Card */}
                <Animated.View entering={FadeInDown.delay(100).duration(600)} className="mx-6 mt-4">
                    <View className="bg-blue-600 rounded-3xl p-6 shadow-lg shadow-blue-200 dark:shadow-none overflow-hidden relative">
                        <View className="z-10 relative">
                            <Text className="text-white/80 font-medium mb-1">AI Health Assistant</Text>
                            <Text className="text-white text-2xl font-bold mb-4 w-2/3">Early detection can save lives.</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Scan')}
                                className="bg-white px-6 py-3 rounded-xl self-start shadow-sm"
                            >
                                <Text className="text-blue-600 font-bold">Start New Scan</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Decorative circles */}
                        <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/50 rounded-full" />
                        <View className="absolute right-10 -top-10 w-24 h-24 bg-blue-400/30 rounded-full" />
                    </View>
                </Animated.View>

                {/* Recent Activity */}
                <Animated.View entering={FadeInDown.delay(200).duration(600)} className="mx-6 mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">Recent Scans</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}>
                            <Text className="text-blue-600 font-medium">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Recent Scans List */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                        {recentScans.length > 0 ? (
                            recentScans.map((item, index) => (
                                <View key={index} className="w-72 bg-white dark:bg-slate-800 p-4 rounded-2xl mr-4 border border-gray-100 dark:border-slate-700 shadow-sm">
                                    <View className="flex-row items-center mb-3">
                                        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                                            <Ionicons name="medical" size={20} color="#007AFF" />
                                        </View>
                                        <View>
                                            <Text className="text-gray-900 dark:text-white font-bold">MRI Scan #{item.id}</Text>
                                            <Text className="text-gray-500 text-xs">{new Date(item.timestamp).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between items-end">
                                        <View className={`px-3 py-1 rounded-lg ${
                                            // Simple color mapping
                                            item.label === 'Non_Demented' ? 'bg-green-100' :
                                                item.label.includes('Very_Mild') ? 'bg-yellow-100' :
                                                    item.label.includes('Mild') ? 'bg-orange-100' : 'bg-red-100'
                                            }`}>
                                            <Text className={`text-xs font-bold ${item.label === 'Non_Demented' ? 'text-green-700' :
                                                item.label.includes('Very_Mild') ? 'text-yellow-800' :
                                                    item.label.includes('Mild') ? 'text-orange-800' : 'text-red-700'
                                                }`}>{item.label.replace(/_/g, ' ')}</Text>
                                        </View>
                                        <Text className="text-gray-400 text-xs">{item.confidence}% Confidence</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View className="w-full p-4 bg-gray-50 rounded-2xl items-center">
                                <Text className="text-gray-400">No recent scans found.</Text>
                            </View>
                        )}
                    </ScrollView>
                </Animated.View>

                {/* Daily Health Tip */}
                <Animated.View entering={FadeInDown.delay(300).duration(600)} className="mx-6 mt-8 mb-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Insight</Text>
                    <View className="bg-indigo-50 dark:bg-slate-800 p-5 rounded-2xl border border-indigo-100 dark:border-slate-700 flex-row items-start">
                        <View className="bg-indigo-100 p-2 rounded-xl mr-4">
                            <Ionicons name="bulb-outline" size={24} color="#4F46E5" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-indigo-900 dark:text-white font-bold mb-1">Stay Active</Text>
                            <Text className="text-indigo-700 dark:text-gray-300 text-sm leading-5">
                                Regular physical exercise can help delay the onset of Alzheimer's symptoms and improve brain health.
                            </Text>
                        </View>
                    </View>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
