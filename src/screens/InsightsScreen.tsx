import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Activity } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const InsightsScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">Insights</Text>
                <Text className="text-gray-500 mt-1">Analysis trends & brain health</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                {/* Stats Grid */}
                <View className="flex-row flex-wrap justify-between mb-6">
                    <Animated.View entering={FadeInDown.delay(100)} className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4">
                        <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mb-3">
                            <TrendingUp size={20} color="#9333ea" />
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white">12</Text>
                        <Text className="text-gray-500 text-sm">Total Scans</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200)} className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4">
                        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-3">
                            <Activity size={20} color="#16a34a" />
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white">92%</Text>
                        <Text className="text-gray-500 text-sm">Avg. Clarity</Text>
                    </Animated.View>
                </View>

                {/* Placeholder Chart */}
                <Animated.View entering={FadeInDown.delay(300)} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Confidence Trends</Text>
                    <View className="h-40 items-center justify-center bg-gray-50 dark:bg-slate-900 rounded-xl border border-dashed border-gray-300 dark:border-slate-600">
                        <Text className="text-gray-400">Chart Visualization Placeholder</Text>
                    </View>
                </Animated.View>

                {/* Info Card */}
                <Animated.View entering={FadeInDown.delay(400)} className="bg-blue-600 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                    <View className="z-10">
                        <Text className="text-white text-lg font-bold mb-2">Did you know?</Text>
                        <Text className="text-blue-100">Consistent monitoring with AI can help track subtle changes in brain patterns over time.</Text>
                    </View>
                    <View className="absolute -right-5 -bottom-5 w-32 h-32 bg-white/10 rounded-full" />
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default InsightsScreen;
