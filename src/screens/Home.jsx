import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function Home({ route }) {
    const { accessToken } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Login realizado com sucesso!
                </Text>

                <Text style={styles.subtitle}>
                    Você chegou na Home.
                </Text>

                <Text style={styles.label}>
                    Access Token:
                </Text>

                <Text style={styles.token}>
                    {accessToken}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 24,
    },

    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: colors.mutedText,
        textAlign: 'center',
        marginBottom: 24,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },

    token: {
        fontSize: 12,
        color: colors.mutedText,
    },
});