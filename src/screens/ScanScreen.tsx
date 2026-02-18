import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const ScanScreen = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!res.canceled) {
            setImage(res.assets[0]);
            setResult(null);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Sorry, we need camera permissions to make this work!");
            return;
        }

        const res = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!res.canceled) {
            setImage(res.assets[0]);
            setResult(null);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            Alert.alert("No Image", "Please select or take a photo of an MRI scan first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        // @ts-ignore
        formData.append("file", {
            uri: image.uri,
            name: "scan.jpg",
            type: "image/jpeg"
        });

        try {
            const response = await fetch("http://10.0.12.219:8000/predict", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            console.log("STATUS:", response.status);

            const data = await response.json();
            console.log("API RESPONSE:", data); // Keep logging for debugging

            // Handle API response mapping if needed
            // Assuming data.prediction is one of the CLASS_NAMES or an index
            let label = data.prediction;
            let confidence = typeof data.confidence === 'number' ? Math.round(data.confidence * 100) : 0;

            // If API returns index 0-3 map to string
            const CLASS_NAMES = [
                "Non_Demented",
                "Very_Mild_Demented",
                "Mild_Demented",
                "Moderate_Demented"
            ];

            if (typeof label === 'number' && label >= 0 && label < CLASS_NAMES.length) {
                label = CLASS_NAMES[label];
            } else if (!CLASS_NAMES.includes(label)) {
                // Fallback or just use what we got if it matches loosely
                console.warn("Received label not in CLASS_NAMES:", label);
            }

            // Save to local storage
            const { saveScan } = require('../utils/storage');
            await saveScan(label, confidence, image?.uri || null);

            // Navigate to Result screen with data
            // @ts-ignore
            navigation.navigate('Result', {
                result: label,
                confidence: confidence,
                imageUri: image?.uri
            });
        } catch (error) {
            console.log(error);
            Alert.alert("Upload Failed", "Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View entering={FadeInDown.duration(600)} className="w-full px-8 items-center py-8">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">New Analysis</Text>
                    <Text className="text-gray-500 text-center mb-10">Upload an MRI scan to detect early signs of Alzheimer's.</Text>

                    <Animated.View className="w-full aspect-square bg-white dark:bg-slate-800 rounded-[40px] shadow-sm border border-gray-200 dark:border-slate-700 items-center justify-center mb-8 relative overflow-hidden">
                        {image ? (
                            <View className="w-full h-full relative">
                                <Image source={{ uri: image.uri }} className="w-full h-full" resizeMode="cover" />
                                <TouchableOpacity
                                    onPress={() => setImage(null)}
                                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
                                >
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <>
                                <View className="absolute w-full h-full opacity-5 bg-blue-500 rounded-[40px]" />
                                <TouchableOpacity onPress={pickImage} className="items-center justify-center w-full h-full">
                                    <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4">
                                        <Ionicons name="cloud-upload-outline" size={40} color="#007AFF" />
                                    </View>
                                    <Text className="text-lg font-bold text-gray-900 dark:text-white">Upload MRI Scan</Text>
                                    <Text className="text-gray-400 mt-2">Tap to select from gallery</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Animated.View>

                    <View className="w-full flex-row justify-between space-x-4 mb-8">
                        <TouchableOpacity
                            onPress={takePhoto}
                            className="flex-1 bg-white dark:bg-slate-800 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 items-center flex-row justify-center space-x-2"
                        >
                            <Ionicons name="camera-outline" size={24} color="#007AFF" />
                            <Text className="font-semibold text-gray-700 dark:text-white">Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={uploadImage}
                            disabled={loading}
                            className={`flex-1 py-4 rounded-2xl items-center flex-row justify-center space-x-2 shadow-lg shadow-blue-200 ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    <Ionicons name="scan-outline" size={24} color="white" />
                                    <Text className="font-bold text-white">Start Scan</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {console.log("RESULT STATE:", result)}
                    {result && (
                        <Animated.View entering={FadeInDown.duration(400)} className="w-full bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700">
                            <Text style={{ color: 'red' }}>DEBUG RESULT FOUND</Text>
                            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">Analysis Result</Text>
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-gray-500">Prediction</Text>
                                <Text className="text-lg font-bold text-blue-600">{result.prediction}</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-gray-500">Confidence</Text>
                                <Text className="text-lg font-bold text-gray-900 dark:text-white">
                                    {typeof result.confidence === 'number'
                                        ? `${(result.confidence * 100).toFixed(1)}%`
                                        : result.confidence}
                                </Text>
                            </View>
                        </Animated.View>
                    )}
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ScanScreen;
