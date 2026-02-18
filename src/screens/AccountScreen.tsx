import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <View className="px-6 pt-4 pb-6">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">Profile</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
                {/* Profile Header */}
                <View className="flex-row items-center mb-8">
                    <View className="w-20 h-20 bg-gray-300 rounded-full mr-5 border-4 border-white dark:border-slate-800 shadow-sm" />
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">Dr. Aayush</Text>
                        <Text className="text-gray-500">Neurologist</Text>
                    </View>
                </View>

                {/* Settings Section */}
                <View className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
                    <SettingsItem icon="person-outline" label="Personal Info" />
                    <SettingsItem icon="notifications-outline" label="Notifications" />
                    <SettingsItem icon="lock-closed-outline" label="Privacy & Security" />
                    <SettingsItem icon="moon-outline" label="Dark Mode" isLast />
                </View>

                <View className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
                    <SettingsItem icon="help-circle-outline" label="Help & Support" />
                    <SettingsItem icon="information-circle-outline" label="About AlzVision AI" isLast />
                </View>

                <TouchableOpacity className="flex-row items-center justify-center py-4">
                    <Text className="text-red-500 font-semibold text-lg">Sign Out</Text>
                </TouchableOpacity>

                <Text className="text-center text-gray-400 text-xs mt-4">Version 1.0.0 (Build 204)</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const SettingsItem = ({ icon, label, isLast }: any) => (
    <TouchableOpacity className={`flex-row items-center p-4 ${!isLast ? 'border-b border-gray-100 dark:border-slate-700' : ''}`}>
        <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700 items-center justify-center mr-4">
            <Ionicons name={icon} size={18} color="#64748b" />
        </View>
        <Text className="flex-1 text-gray-900 dark:text-white font-medium text-base">{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
    </TouchableOpacity>
);

export default AccountScreen;
