import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export function ServiceCard({
    title,
    iconName,
    onPress,
}) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons
                name={iconName}
                size={34}
                color={colors.white}
            />

            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        height: 130,

        backgroundColor: colors.serviceCard,

        borderRadius: 18,

        justifyContent: 'center',
        alignItems: 'center',

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
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 8,
    },
});