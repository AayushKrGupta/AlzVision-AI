import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Plus, Clock, Activity, ChevronRight, User } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { GradientCard } from "../components/GradientCard";
import { RootStackParamList } from "../navigation/types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const RecentScanItem = ({ date, result, index }: { date: string; result: string; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100 + 500).springify()}>
        <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white rounded-2xl mb-3 shadow-sm border border-gray-100">
            <View className="flex-row items-center">
                <View className={`w-10 h-10 rounded-full items-center justify-center ${result === 'Normal' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <Activity size={20} color={result === 'Normal' ? '#34C759' : '#FF9500'} />
                </View>
                <View className="ml-3">
                    <Text className="text-gray-900 font-semibold">MRI Scan</Text>
                    <Text className="text-gray-500 text-xs">{date}</Text>
                </View>
            </View>
            <View className="flex-row items-center">
                <Text className={`mr-2 font-medium ${result === 'Normal' ? 'text-green-600' : 'text-orange-600'}`}>
                    {result}
                </Text>
                <ChevronRight size={16} color="#C7C7CC" />
            </View>
        </TouchableOpacity>
    </Animated.View>
);

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />
            <SafeAreaView className="flex-1">
                <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 20 }}>

                    {/* Header */}
                    <Animated.View entering={FadeInUp.duration(600)} className="flex-row justify-between items-center py-4 mb-2">
                        <View>
                            <Text className="text-gray-500 text-sm font-medium">Welcome back,</Text>
                            <Text className="text-2xl font-bold text-gray-900">Dr. Anderson</Text>
                        </View>
                        <TouchableOpacity className="bg-white p-2 rounded-full border border-gray-200">
                            <User size={24} color="#007AFF" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Hero Card */}
                    <Animated.View entering={FadeInDown.delay(200).springify()}>
                        <GradientCard
                            colors={["#007AFF", "#0055FF"]}
                            className="mb-6 h-48 justify-between relative"
                        >
                            <View className="absolute top-0 right-0 opacity-10">
                                <Activity size={150} color="white" />
                            </View>
                            <View>
                                <Text className="text-white text-lg font-medium opacity-90">AI Diagnostic Assistant</Text>
                                <Text className="text-white text-3xl font-bold mt-1">New Assessment</Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("Upload")}
                                className="bg-white/20 backdrop-blur-md flex-row items-center self-start px-4 py-2 rounded-xl mt-4 border border-white/30"
                            >
                                <Plus size={20} color="white" />
                                <Text className="text-white font-semibold ml-2">Start Analysis</Text>
                            </TouchableOpacity>
                        </GradientCard>
                    </Animated.View>

                    {/* Quick Stats Grid - Placeholder for now */}
                    <View className="flex-row justify-between mb-6">
                        <Animated.View entering={FadeInDown.delay(300).springify()} className="flex-1 mr-2">
                            <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <Text className="text-2xl font-bold text-gray-900">12</Text>
                                <Text className="text-gray-500 text-xs">Patients today</Text>
                            </View>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(400).springify()} className="flex-1 ml-2">
                            <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <Text className="text-2xl font-bold text-gray-900">98%</Text>
                                <Text className="text-gray-500 text-xs">Accuracy Rate</Text>
                            </View>
                        </Animated.View>
                    </View>

                    {/* Recent Scans */}
                    <View className="mb-4 flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-gray-900">Recent Scans</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600 text-sm">View All</Text>
                        </TouchableOpacity>
                    </View>

                    <RecentScanItem date="Today, 09:41 AM" result="Mild Impairment" index={0} />
                    <RecentScanItem date="Yesterday, 04:20 PM" result="Normal" index={1} />
                    <RecentScanItem date="Mon, 12 Oct" result="Normal" index={2} />
                    <RecentScanItem date="Fri, 09 Oct" result="Early Stages" index={3} />

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
