import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { UploadCloud, Image as ImageIcon, Camera, X } from "lucide-react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { RootStackParamList } from "../navigation/types";

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, "Upload">;

export const UploadScreen = () => {
    const navigation = useNavigation<UploadScreenNavigationProp>();
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission denied", "Camera access is needed to take photos.");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAnalyze = () => {
        if (image) {
            navigation.replace("Analysis", { imageUri: image });
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1">
                <Header title="Upload MRI" />

                <View className="flex-1 px-6 justify-center">
                    <Animated.View entering={FadeInUp.duration(500)} className="mb-8">
                        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
                            Upload Scan
                        </Text>
                        <Text className="text-gray-500 text-center text-base">
                            Select or take a photo of the MRI scan for AI analysis.
                        </Text>
                    </Animated.View>

                    {!image ? (
                        <Animated.View entering={FadeInDown.springify()} className="items-center">
                            <TouchableOpacity
                                onPress={pickImage}
                                activeOpacity={0.8}
                                className="w-full h-64 border-2 border-dashed border-gray-300 rounded-3xl items-center justify-center bg-gray-50 mb-6"
                            >
                                <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4">
                                    <UploadCloud size={40} color="#007AFF" />
                                </View>
                                <Text className="text-blue-600 font-semibold text-lg">
                                    Tap to Upload
                                </Text>
                                <Text className="text-gray-400 mt-2">
                                    JPG, PNG up to 10MB
                                </Text>
                            </TouchableOpacity>

                            <View className="flex-row w-full space-x-4">
                                <View className="flex-1">
                                    <Button title="Gallery" icon={<ImageIcon size={20} color="white" />} onPress={pickImage} />
                                </View>
                                <View className="flex-1">
                                    <Button title="Camera" variant="secondary" icon={<Camera size={20} color="#111827" />} onPress={takePhoto} />
                                </View>
                            </View>
                        </Animated.View>
                    ) : (
                        <Animated.View entering={FadeInDown.springify()} className="items-center w-full flex-1">
                            <View className="w-full flex-1 mb-6 relative rounded-3xl overflow-hidden shadow-sm">
                                <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
                                <TouchableOpacity
                                    onPress={() => setImage(null)}
                                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
                                >
                                    <X size={20} color="white" />
                                </TouchableOpacity>
                            </View>

                            <View className="w-full pb-4">
                                <Button title="Analyze Scan" onPress={handleAnalyze} />
                            </View>
                        </Animated.View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};
