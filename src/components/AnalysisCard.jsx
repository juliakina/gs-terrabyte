import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export function AnalysisCard({ addressName, plantingName, riskLevel, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.leftContent}>
                <Ionicons name="analytics-outline" size={24} color={colors.primary}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{plantingName}</Text>
                    <Text style={styles.subtitle}>{addressName}</Text>
                    <Text style={styles.risk}>Compatibilidade: {riskLevel}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.primary}/>
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
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
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

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },

    subtitle: {
        fontSize: 13,
        color: colors.mutedText,
        marginTop: 2,
    },

    risk: {
        fontSize: 13,
        color: colors.primaryDark,
        fontWeight: '700',
        marginTop: 4,
    },
});