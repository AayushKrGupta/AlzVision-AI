import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
    return (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">Profile</Text>
                <Text className="text-gray-500 mt-1">Doctor's profile details</Text>
            </View>

            <View className="items-center justify-center mt-6">
                {/* Profile Image */}
                <View className="w-32 h-32 bg-gray-200 rounded-full mb-4 items-center justify-center overflow-hidden border-4 border-gray-100 dark:border-slate-800 shadow-md">
                    <Ionicons name="person" size={64} color="#CBD5E1" />
                </View>

                {/* Name & Email */}
                <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Aayush Kr. Gupta</Text>
                <Text className="text-gray-500 font-medium text-base">aayushkr.dev@gmail.com</Text>
            </View>

            {/* Weekly Activity Graph */}
            <View className="mx-6 mt-8 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-50">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Weekly Activity</Text>
                        <Text className="text-gray-400 text-xs">Patients scanned past 7 days</Text>
                    </View>
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-600 font-bold text-xs">+12%</Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-end h-32 space-x-2">
                    {[
                        { day: 'Mon', value: '40%', active: false },
                        { day: 'Tue', value: '65%', active: false },
                        { day: 'Wed', value: '30%', active: false },
                        { day: 'Thu', value: '85%', active: true },
                        { day: 'Fri', value: '55%', active: false },
                        { day: 'Sat', value: '25%', active: false },
                        { day: 'Sun', value: '45%', active: false },
                    ].map((item, index) => (
                        <View key={index} className="items-center flex-1">
                            <View
                                className={`w-full rounded-t-lg ${item.active ? 'bg-blue-600' : 'bg-blue-100'}`}
                                style={{ height: item.value as any }}
                            />
                            <Text className="text-gray-400 text-[10px] mt-2 font-medium">{item.day}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Recent Tests Card */}
            <View className="mx-6 mt-6 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-50">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Tests</Text>

                {[
                    { type: 'MRI Scan', patient: 'Rahul Sharma', time: '2 hrs ago', icon: 'pulse', color: 'bg-indigo-100', iconColor: '#4f46e5' },
                    { type: 'CT Scan', patient: 'Anjali Verma', time: '5 hrs ago', icon: 'medkit', color: 'bg-orange-100', iconColor: '#f97316' },
                    { type: 'X-Ray', patient: 'Vikram Singh', time: 'Yesterday', icon: 'body', color: 'bg-emerald-100', iconColor: '#10b981' },
                ].map((test, index) => (
                    <View key={index} className="flex-row items-center mb-4 last:mb-0">
                        <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${test.color}`}>
                            <Ionicons name={test.icon as any} size={24} color={test.iconColor} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-bold text-gray-900 dark:text-white">{test.type}</Text>
                            <Text className="text-gray-400 text-xs">Patient: {test.patient}</Text>
                        </View>
                        <Text className="text-gray-400 text-xs font-medium">{test.time}</Text>
                    </View>
                ))}
            </View>

            {/* Bottom Actions */}
            <View className="mt-8 px-6 mb-8 w-full items-center">
                <TouchableOpacity className="w-full bg-red-50 dark:bg-red-900/20 py-4 rounded-2xl items-center mb-6 border border-red-100">
                    <Text className="text-red-600 dark:text-red-400 font-bold text-lg">Sign Out</Text>
                </TouchableOpacity>
                <Text className="text-gray-400 text-xs text-center">Version 1.0.0 (Build 204)</Text>
            </View>
        </ScrollView>
    );
};

export default AccountScreen;
