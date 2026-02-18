import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 justify-between">
            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">Profile</Text>
                <Text className="text-gray-500 mt-1">Patient's profile details</Text>
            </View>

            <View className="flex-1 items-center justify-center -mt-20">
                {/* Profile Image */}
                <View className="w-48 h-48 bg-gray-200 rounded-full mb-6 items-center justify-center overflow-hidden border-4 border-gray-100 dark:border-slate-800 shadow-lg">
                    <Ionicons name="person" size={96} color="#CBD5E1" />
                </View>

                {/* Name & Email */}
                <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Aayush Kr. Gupta</Text>
                <Text className="text-gray-500 font-medium text-lg">aayushkr.dev@gmail.com</Text>
            </View>

            {/* Bottom Actions */}
            <View className="pb-32 px-8 w-full items-center">
                <TouchableOpacity className="w-full bg-red-50 dark:bg-red-900/20 py-4 rounded-2xl items-center mb-6">
                    <Text className="text-red-600 dark:text-red-400 font-bold text-lg">Sign Out</Text>
                </TouchableOpacity>
                <Text className="text-gray-400 text-xs">Version 1.0.0 (Build 204)</Text>
            </View>
        </SafeAreaView>
    );
};

export default AccountScreen;
