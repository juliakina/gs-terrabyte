import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

export function PrimaryButton({ title, onPress, disabled = false }) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}>
        <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 54,
        backgroundColor: colors.primary,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 8,
        width:100,
    },
    disabled: {
        opacity: 0.6,
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
});