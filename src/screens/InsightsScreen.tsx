import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Activity, FileText } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { getScans, ScanResult } from '../utils/storage';

const screenWidth = Dimensions.get("window").width;

const InsightsScreen = () => {
    const [stats, setStats] = useState({
        totalScans: 0,
        avgClarity: 87, // Hardcoded as requested
        chartData: {
            labels: ["Start"],
            datasets: [
                {
                    data: [0],
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Confidence Trends"] // optional
        }
    });

    useFocusEffect(
        useCallback(() => {
            const fetchStats = async () => {
                const scans = await getScans();

                // Process data for chart - take last 6 entries to keep chart readable
                const recentScans = scans.slice(0, 6).reverse(); // Oldest to newest

                const labels = recentScans.map(s => `#${s.id}`);
                const dataPoints = recentScans.map(s => s.confidence);

                setStats(prev => ({
                    ...prev,
                    totalScans: scans.length,
                    chartData: {
                        labels: labels.length > 0 ? labels : ["No Data"],
                        datasets: [{
                            data: dataPoints.length > 0 ? dataPoints : [0],
                            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                            strokeWidth: 3
                        }],
                        legend: ["Confidence %"]
                    }
                }));
            };
            fetchStats();
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">Insights</Text>
                <Text className="text-gray-500 mt-1">Analysis trends & brain health</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                {/* Stats Grid */}
                <View className="flex-row flex-wrap justify-between mb-6">
                    <Animated.View entering={FadeInDown.delay(100)} className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4 items-center">
                        <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-3">
                            <FileText size={24} color="#9333ea" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalScans}</Text>
                        <Text className="text-gray-500 text-sm font-medium">Total Scans</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200)} className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-4 items-center">
                        <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-3">
                            <Activity size={24} color="#16a34a" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.avgClarity}%</Text>
                        <Text className="text-gray-500 text-sm font-medium">Avg. Clarity</Text>
                    </Animated.View>
                </View>

                {/* Chart Section */}
                <Animated.View entering={FadeInDown.delay(300)} className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6 overflow-hidden">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4 ml-2">Confidence Trend (Last 6 Scans)</Text>

                    <LineChart
                        data={stats.chartData}
                        width={screenWidth - 80} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="%"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#2563eb"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            paddingRight: 40 // Padding to avoid clipping rightmost label
                        }}
                    />
                </Animated.View>

                {/* Info Card */}
                <Animated.View entering={FadeInDown.delay(400)} className="bg-blue-600 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                    <View className="z-10">
                        <Text className="text-white text-lg font-bold mb-2">Did you know?</Text>
                        <Text className="text-blue-100 leading-6">Consistent monitoring with AI can help track subtle changes in brain patterns over time. Higher clarity scans lead to more accurate trend analysis.</Text>
                    </View>
                    <View className="absolute -right-5 -bottom-5 w-32 h-32 bg-white/10 rounded-full" />
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default InsightsScreen;
