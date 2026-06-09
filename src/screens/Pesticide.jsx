import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { PesticideCard } from '../components/PesticideCard';
import { fetchPesticideList, fetchPesticidesByType } from '../services/pesticideService';

const filterOptions = [
    {
        label: 'Todos',
        value: 'Todos',
    },
    {
        label: 'Herbicidas',
        value: 'HERBICIDA',
    },
    {
        label: 'Fungicidas',
        value: 'FUNGICIDA',
    },
    {
        label: 'Inseticidas',
        value: 'INSETICIDA',
    },
];

export default function Pesticide({ navigation }) {
    const [pesticides, setPesticides] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPesticides(selectedFilter);
    }, [selectedFilter]);

    async function loadPesticides(filterType) {
        try {
            setIsLoading(true);

            const data =
                filterType === 'Todos'
                    ? await fetchPesticideList()
                    : await fetchPesticidesByType(filterType);

            setPesticides(data);
        } catch (error) {
            setPesticides([]);
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
                            Defensivos
                        </Text>

                        <Text style={styles.subtitle}>
                            Consulte defensivos e seus plantios relacionados
                        </Text>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {filterOptions.map((filter) => (
                        <TouchableOpacity
                            key={filter.value}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter.value &&
                                    styles.filterButtonSelected,
                            ]}
                            onPress={() => setSelectedFilter(filter.value)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter.value &&
                                        styles.filterTextSelected,
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                        style={styles.loading}
                    />
                ) : pesticides.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>
                            Nenhum defensivo encontrado
                        </Text>

                        <Text style={styles.emptyText}>
                            Não há defensivos para este filtro.
                        </Text>
                    </View>
                ) : (
                    pesticides.map((pesticide) => (
                        <PesticideCard
                            key={pesticide.id}
                            name={pesticide.nome}
                            type={pesticide.tipo}
                            onPress={() =>
                                navigation.navigate('PesticidePlantings', {
                                    pesticideId: pesticide.id,
                                    pesticideName: pesticide.nome,
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

    filterContainer: {
        gap: 10,
        marginBottom: 20,
    },

    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
    },

    filterButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    filterText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.text,
    },

    filterTextSelected: {
        color: colors.white,
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
    },
});