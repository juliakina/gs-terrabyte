import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';

export function TerrainCard({ name, zipCode, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.leftContent}>
                <Ionicons
                    name="map-outline"
                    size={24}
                    color={colors.primary}
                />
                <View style={styles.textContainer}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                    <Text style={styles.zipCode}>
                        CEP: {zipCode}
                    </Text>
                </View>
            </View>
            <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.primary}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },

    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    textContainer: {
        marginLeft: 12,
        flex: 1,
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },

    zipCode: {
        fontSize: 13,
        color: colors.mutedText,
        marginTop: 2,
    },
});