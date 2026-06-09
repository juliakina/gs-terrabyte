import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { fetchPlantingById } from '../services/plantingService';

export default function PlantingDetails({ navigation, route }) {
    const { plantingId } = route.params;

    const [planting, setPlanting] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPlantingDetails();
    }, [plantingId]);

    async function loadPlantingDetails() {
        try {
            setIsLoading(true);

            const data = await fetchPlantingById(plantingId);

            setPlanting(data);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setIsLoading(false);
        }
    }

    function formatValue(value, suffix = '') {
        if (value === null || value === undefined || value === '') {
            return 'Não informado';
        }

        return `${value}${suffix}`;
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <AppHeader navigation={navigation} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                    />

                    <Text style={styles.loadingText}>
                        Carregando plantio...
                    </Text>
                </View>
                <AppFooter />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader navigation={navigation} />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContainer}>
                    <View style={styles.titleIndicator} />

                    <View>
                        <Text style={styles.title}>
                            Detalhes do Plantio
                        </Text>

                        <Text style={styles.subtitle}>
                            Consulte clima, solo e defensivos
                        </Text>
                    </View>
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="leaf-outline"
                            size={34}
                            color={colors.primary}
                        />
                    </View>

                    <Text style={styles.plantingName}>
                        {planting?.nome}
                    </Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Condições Climáticas
                    </Text>

                    <InfoRow
                        label="Temperatura mínima"
                        value={formatValue(planting?.tempMin, ' °C')}
                    />

                    <InfoRow
                        label="Temperatura máxima"
                        value={formatValue(planting?.tempMax, ' °C')}
                    />

                    <InfoRow
                        label="Água necessária"
                        value={formatValue(planting?.aguaMM, ' mm')}
                    />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Solos Indicados
                    </Text>

                    <Text style={styles.listText}>
                        {planting?.tiposDeSolo?.length
                            ? planting.tiposDeSolo.join(', ')
                            : 'Não informado'}
                    </Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Meses Ideais
                    </Text>

                    <Text style={styles.listText}>
                        {planting?.mesesIdeas?.length
                            ? planting.mesesIdeas.join(', ')
                            : 'Não informado'}
                    </Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Defensivos
                    </Text>

                    <Text style={styles.listText}>
                        {planting?.defensivo?.length
                            ? planting.defensivo.join(', ')
                            : 'Não informado'}
                    </Text>
                </View>
            </ScrollView>
            <AppFooter />
        </SafeAreaView>
    );
}

function InfoRow({ label, value }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
                {label}
            </Text>

            <Text style={styles.infoValue}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 32,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        color: colors.mutedText,
        marginTop: 12,
        fontSize: 14,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    titleIndicator: {
        width: 5,
        height: 55,
        borderRadius: 4,
        backgroundColor: colors.primary,
        marginRight: 15,
        marginTop: 2,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text,
    },

    subtitle: {
        fontSize: 14,
        color: colors.mutedText,
        marginTop: 4,
    },

    mainCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 22,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 18,
    },

    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    plantingName: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
    },

    sectionCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 14,
    },

    infoRow: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
        marginTop: 12,
    },

    infoLabel: {
        fontSize: 13,
        color: colors.mutedText,
        marginBottom: 4,
    },

    infoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },

    listText: {
        fontSize: 15,
        color: colors.text,
        lineHeight: 22,
    },
});