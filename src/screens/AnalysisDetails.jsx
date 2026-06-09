import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { fetchAnalysisById } from '../services/analysisService';

export default function AnalysisDetails({ navigation, route }) {
    const { analysisId } = route.params;

    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAnalysisDetails();
    }, [analysisId]);

    async function loadAnalysisDetails() {
        try {
            setIsLoading(true);

            const data = await fetchAnalysisById(analysisId);

            setAnalysis(data);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setIsLoading(false);
        }
    }

    function formatValue(value) {
        if (value === null || value === undefined || value === '') {
            return 'Não informado';
        }

        return value;
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <AppHeader navigation={navigation} />

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Carregando análise...</Text>
                </View>

                <AppFooter />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader navigation={navigation} />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleIndicator} />

                    <View>
                        <Text style={styles.title}>Resultado da Análise</Text>
                        <Text style={styles.subtitle}>
                            Compatibilidade entre terreno e plantio
                        </Text>
                    </View>
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="analytics-outline"
                            size={34}
                            color={colors.primary}
                        />
                    </View>

                    <Text style={styles.mainTitle}>
                        {analysis?.nomePlantio}
                    </Text>

                    <Text style={styles.mainSubtitle}>
                        Terreno: {analysis?.nomeEndereco}
                    </Text>

                    <View style={styles.riskBadge}>
                        <Text style={styles.riskText}>
                            Compatibilidade: {analysis?.nivelRisco}
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Resumo</Text>

                    <InfoRow label="Data" value={formatValue(analysis?.data)} />
                    <InfoRow label="Adequação" value={formatValue(analysis?.adequadoPlantio)} />
                    <InfoRow label="Solo do terreno" value={formatValue(analysis?.tipoSoloEndereco)} />
                    <InfoRow
                        label="Solos do plantio"
                        value={
                            analysis?.tipoSoloPlantio?.length
                                ? analysis.tipoSoloPlantio.join(', ')
                                : 'Não informado'
                        }
                    />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Condições Ambientais</Text>

                    <InfoRow label="Temperatura mínima" value={formatValue(analysis?.tempMin)} />
                    <InfoRow label="Temperatura máxima" value={formatValue(analysis?.tempMax)} />
                    <InfoRow label="Umidade média" value={formatValue(analysis?.umidadeMed)} />
                    <InfoRow label="Raio analisado" value={`${formatValue(analysis?.raioKM)} km`} />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Composição do Solo</Text>

                    <InfoRow label="Argila" value={formatValue(analysis?.argila)} />
                    <InfoRow label="Areia" value={formatValue(analysis?.areia)} />
                    <InfoRow label="Silte" value={formatValue(analysis?.silte)} />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Recomendação</Text>

                    <Text style={styles.recommendationText}>
                        {formatValue(analysis?.recomendacao)}
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
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
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

    mainTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
    },

    mainSubtitle: {
        fontSize: 14,
        color: colors.mutedText,
        marginTop: 4,
        textAlign: 'center',
    },

    riskBadge: {
        marginTop: 14,
        backgroundColor: colors.background,
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 14,
    },

    riskText: {
        color: colors.primaryDark,
        fontSize: 13,
        fontWeight: '800',
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

    recommendationText: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 22,
    },
});