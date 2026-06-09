import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export function ServiceCard({ title, iconName, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons
                name={iconName}
                size={34}
                color={colors.primary}
            />
            <Text
                style={styles.title}
                numberOfLines={2}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        height: 120,
        backgroundColor: colors.serviceCard,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 14,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    title: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 19,
    },
});