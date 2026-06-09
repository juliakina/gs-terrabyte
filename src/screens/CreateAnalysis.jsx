import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { PrimaryButton } from '../components/PrimaryButton';
import { fetchAddressList } from '../services/addressService';
import { fetchPlantingList } from '../services/plantingService';
import { createAnalysis } from '../services/analysisService';

export default function CreateAnalysis({ navigation }) {
    const [terrains, setTerrains] = useState([]);
    const [plantings, setPlantings] = useState([]);
    const [selectedTerrainId, setSelectedTerrainId] = useState('');
    const [selectedPlantingId, setSelectedPlantingId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadFormData();
    }, []);

    async function loadFormData() {
        try {
            setIsLoading(true);

            const terrainData = await fetchAddressList();
            const plantingData = await fetchPlantingList();

            setTerrains(terrainData);
            setPlantings(plantingData);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreateAnalysis() {
        if (!selectedTerrainId || !selectedPlantingId) {
            Alert.alert('Atenção', 'Selecione um terreno e um plantio.');
            return;
        }

        try {
            setIsSaving(true);

            const analysis = await createAnalysis(
                selectedTerrainId,
                selectedPlantingId
            );

            setSelectedTerrainId('');
            setSelectedPlantingId('');

            Alert.alert(
                'Sucesso',
                'Análise criada com sucesso!'
            );

            if (analysis?.id) {
                navigation.navigate('AnalysisDetails', {
                    analysisId: analysis.id,
                });
            } else {
                navigation.navigate('CompatibilityAnalysis');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar a análise.');
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <AppHeader navigation={navigation} />

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Carregando dados...</Text>
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
                        <Text style={styles.title}>Nova Análise</Text>
                        <Text style={styles.subtitle}>
                            Selecione um terreno e um plantio para analisar
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Terreno</Text>

                {terrains.map((terrain) => (
                    <SelectionCard
                        key={terrain.id}
                        title={terrain.nome}
                        subtitle={`CEP: ${terrain.cep}`}
                        selected={selectedTerrainId === terrain.id}
                        onPress={() => setSelectedTerrainId(terrain.id)}
                        iconName="map-outline"
                    />
                ))}

                <Text style={styles.sectionTitle}>Plantio</Text>

                {plantings.map((planting) => (
                    <SelectionCard
                        key={planting.id}
                        title={planting.nome}
                        subtitle="Selecionar plantio"
                        selected={selectedPlantingId === planting.id}
                        onPress={() => setSelectedPlantingId(planting.id)}
                        iconName="leaf-outline"
                    />
                ))}

                <PrimaryButton
                    title={isSaving ? 'Analisando...' : 'Gerar análise'}
                    onPress={handleCreateAnalysis}
                    disabled={isSaving}
                />
            </ScrollView>

            <AppFooter />
        </SafeAreaView>
    );
}

function SelectionCard({
    title,
    subtitle,
    selected,
    onPress,
    iconName,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.selectionCard,
                selected && styles.selectionCardSelected,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.selectionLeft}>
                <Ionicons
                    name={iconName}
                    size={24}
                    color={selected ? colors.primary : colors.mutedText}
                />

                <View style={styles.selectionTextContainer}>
                    <Text style={styles.selectionTitle}>{title}</Text>
                    <Text style={styles.selectionSubtitle}>{subtitle}</Text>
                </View>
            </View>

            {selected && (
                <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.primary}
                />
            )}
        </TouchableOpacity>
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
        marginBottom: 24,
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

    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 12,
        marginTop: 8,
    },

    selectionCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },

    selectionCardSelected: {
        borderColor: colors.primary,
        borderWidth: 2,
    },

    selectionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    selectionTextContainer: {
        marginLeft: 12,
        flex: 1,
    },

    selectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },

    selectionSubtitle: {
        fontSize: 13,
        color: colors.mutedText,
        marginTop: 2,
    },
});