
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the class names
export const CLASS_NAMES = [
    "Non_Demented",
    "Very_Mild_Demented",
    "Mild_Demented",
    "Moderate_Demented"
];

export interface ScanResult {
    id: number;
    timestamp: number;
    label: string; // "Non_Demented", etc.
    confidence: number; // 0-100
    imageUri: string | null;
}

const STORAGE_KEY = '@scans_v1';

export const saveScan = async (label: string, confidence: number, imageUri: string | null): Promise<ScanResult> => {
    try {
        const existingData = await AsyncStorage.getItem(STORAGE_KEY);
        const scans: ScanResult[] = existingData ? JSON.parse(existingData) : [];

        // Find highest ID to increment
        const maxId = scans.length > 0 ? Math.max(...scans.map(s => s.id)) : 99;
        const newId = maxId + 1;

        const newScan: ScanResult = {
            id: newId,
            timestamp: Date.now(),
            label,
            confidence,
            imageUri
        };

        const updatedScans = [newScan, ...scans];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScans));
        return newScan;

    } catch (e) {
        console.error("Error saving scan", e);
        throw e;
    }
};

export const getScans = async (): Promise<ScanResult[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error fetching scans", e);
        return [];
    }
};

export const clearHistory = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Error clearing history", e);
    }
};
