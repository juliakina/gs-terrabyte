import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export function AppFooter() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                TerraByte © 2026
            </Text>
            <Text style={styles.subText}>
                Agricultura Inteligente
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
    },

    text: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '600',
    },

    subText: {
        color: colors.white,
        fontSize: 11,
        opacity: 0.8,
        marginTop: 2,
    },
});