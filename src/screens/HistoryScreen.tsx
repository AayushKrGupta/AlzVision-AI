import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { getScans, ScanResult } from '../utils/storage';

const HISTORY_DATA = [
    { id: 1, date: 'Today, 2:30 PM', result: 'Healthy', confidence: '98%', status: 'completed' },
    { id: 2, date: 'Yesterday, 10:15 AM', result: 'Mild Impairment', confidence: '85%', status: 'attention' },
    { id: 3, date: 'Feb 15, 2026', result: 'Healthy', confidence: '99%', status: 'completed' },
];

const HistoryScreen = () => {
    const [historyData, setHistoryData] = useState<ScanResult[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchScans = async () => {
                const scans = await getScans();
                setHistoryData(scans);
            };
            fetchScans();
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">History</Text>
                <Text className="text-gray-500 mt-1">Review past analysis results</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {historyData.length > 0 ? (
                    historyData.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeInDown.delay(index * 100).duration(600)}
                            className="bg-white dark:bg-slate-800 p-4 rounded-2xl mb-4 shadow-sm border border-gray-100 dark:border-slate-700"
                        >
                            <View className="flex-row justify-between items-start mb-3">
                                <View className="flex-row items-center">
                                    <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${item.label === 'Non_Demented' ? 'bg-green-100' : 'bg-orange-100'
                                        }`}>
                                        <Ionicons
                                            name={item.label === 'Non_Demented' ? "checkmark-circle-outline" : "alert-circle-outline"}
                                            size={24}
                                            color={item.label === 'Non_Demented' ? "#15803d" : "#c2410c"}
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-lg font-bold text-gray-900 dark:text-white">MRI Scan #{item.id}</Text>
                                        <Text className="text-gray-500 text-sm">{new Date(item.timestamp).toLocaleString()}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons name="ellipsis-horizontal" size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row space-x-3 mt-2">
                                <View className="bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg">
                                    <Text className="text-gray-600 dark:text-gray-300 text-xs font-semibold">Label: {item.label.replace(/_/g, ' ')}</Text>
                                </View>
                                <View className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg">
                                    <Text className="text-blue-600 dark:text-blue-400 text-xs font-semibold">Conf: {item.confidence}%</Text>
                                </View>
                            </View>
                        </Animated.View>
                    ))
                ) : (
                    <View className="items-center py-20">
                        <Ionicons name="documents-outline" size={64} color="#E5E7EB" />
                        <Text className="text-gray-400 mt-4 text-center">No history available yet.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HistoryScreen;
