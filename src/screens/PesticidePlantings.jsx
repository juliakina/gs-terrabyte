import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { PlantingCard } from '../components/PlantingCard';
import { fetchPlantingsByPesticide } from '../services/pesticideService';

export default function PesticidePlantings({ navigation, route }) {
    const { pesticideId, pesticideName } = route.params;

    const [plantings, setPlantings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPlantingsByPesticide();
    }, [pesticideId]);

    async function loadPlantingsByPesticide() {
        try {
            setIsLoading(true);

            const data = await fetchPlantingsByPesticide(pesticideId);

            setPlantings(data);
        } catch (error) {
            setPlantings([]);
        } finally {
            setIsLoading(false);
        }
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
                            Plantios por Defensivo
                        </Text>

                        <Text style={styles.subtitle}>
                            Defensivo selecionado: {pesticideName}
                        </Text>
                    </View>
                </View>

                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                        style={styles.loading}
                    />
                ) : plantings.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>
                            Nenhum plantio encontrado
                        </Text>

                        <Text style={styles.emptyText}>
                            Não há plantios cadastrados para este defensivo.
                        </Text>
                    </View>
                ) : (
                    plantings.map((planting) => (
                        <PlantingCard
                            key={planting.id}
                            name={planting.nome}
                            onPress={() =>
                                navigation.navigate('PlantingDetails', {
                                    plantingId: planting.id,
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
        fontSize: 28,
        fontWeight: '800',
        color: colors.text,
    },

    subtitle: {
        fontSize: 14,
        color: colors.mutedText,
        marginTop: 4,
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
        marginBottom: 6,
    },

    emptyText: {
        fontSize: 14,
        color: colors.mutedText,
        textAlign: 'center',
        lineHeight: 20,
    },
});