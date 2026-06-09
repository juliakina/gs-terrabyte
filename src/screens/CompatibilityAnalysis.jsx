import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { AnalysisCard } from '../components/AnalysisCard';
import { fetchAnalysisList } from '../services/analysisService';

export default function CompatibilityAnalysis({ navigation }) {
    const [analyses, setAnalyses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadAnalyses);

        return unsubscribe;
    }, [navigation]);

    async function loadAnalyses() {
        try {
            setIsLoading(true);

            const data = await fetchAnalysisList();

            setAnalyses(data);
        } catch (error) {
            setAnalyses([]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader navigation={navigation} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleIndicator} />

                    <View>
                        <Text style={styles.title}>Análises de Compatibilidade</Text>
                        <Text style={styles.subtitle}>
                            Consulte ou realize uma análise de compatibilidade
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('CreateAnalysis')}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add" size={22} color={colors.white} />
                    <Text style={styles.addButtonText}>Nova Análise</Text>
                </TouchableOpacity>

                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />
                ) : analyses.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Ionicons name="analytics-outline" size={42} color={colors.primary} />

                        <Text style={styles.emptyTitle}>Nenhuma análise encontrada</Text>

                        <Text style={styles.emptyText}>
                            Crie sua primeira análise selecionando um terreno e um plantio.
                        </Text>
                    </View>
                ) : (
                    analyses.map((analysis) => (
                        <AnalysisCard
                            key={analysis.id}
                            addressName={analysis.nomeEndereco}
                            plantingName={analysis.nomePlantio}
                            riskLevel={analysis.nivelRisco}
                            onPress={() =>
                                navigation.navigate('AnalysisDetails', {
                                    analysisId: analysis.id,
                                })
                            }
                        />
                    ))
                )}
            </ScrollView>
            <AppFooter />
        </SafeAreaView>
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
        fontSize: 25,
        fontWeight: '800',
        color: colors.text,
    },

    subtitle: {
        fontSize: 14,
        color: colors.mutedText,
        marginTop: 4,
    },

    addButton: {
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginBottom: 20,
    },

    addButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '700',
    },

    loading: {
        marginTop: 40,
    },

    emptyCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginTop: 12,
        marginBottom: 6,
    },

    emptyText: {
        fontSize: 14,
        color: colors.mutedText,
        textAlign: 'center',
        lineHeight: 20,
    },
});