import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { deleteAddress, fetchAddressById } from '../services/addressService';

export default function TerrainDetails({ navigation, route }) {
    const { terrainId } = route.params;

    const [terrain, setTerrain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTerrainDetails();
    }, []);

    async function loadTerrainDetails() {
        try {
            setIsLoading(true);

            const data = await fetchAddressById(terrainId);

            setTerrain(data);
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
                        Carregando terreno...
                    </Text>
                </View>

                <AppFooter />
            </SafeAreaView>
        );
    }

    function handleDeleteTerrain() {
        Alert.alert(
            'Excluir terreno',
            'Tem certeza que deseja excluir este terreno?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: confirmDeleteTerrain,
                },
            ]
        );
    }

    async function confirmDeleteTerrain() {
        try {
            setIsLoading(true);

            await deleteAddress(terrainId);

            Alert.alert(
                'Sucesso',
                'Terreno excluído com sucesso!'
            );

            navigation.navigate('Terrain');
        } catch (error) {
            Alert.alert(
                'Erro',
                'Não foi possível excluir o terreno.'
            );
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
                            Detalhes do Terreno
                        </Text>

                        <Text style={styles.subtitle}>
                            Consulte as informações do solo e localização
                        </Text>
                    </View>
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="map-outline"
                            size={34}
                            color={colors.primary}
                        />
                    </View>

                    <Text style={styles.terrainName}>
                        {terrain?.nome}
                    </Text>

                    <Text style={styles.terrainCep}>
                        CEP: {terrain?.cep}
                    </Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Localização
                    </Text>

                    <InfoRow
                        label="Logradouro"
                        value={formatValue(terrain?.logradouro)}
                    />

                    <InfoRow
                        label="Cidade"
                        value={formatValue(terrain?.cidade)}
                    />

                    <InfoRow
                        label="Estado"
                        value={formatValue(terrain?.estado)}
                    />

                    <InfoRow
                        label="Latitude"
                        value={formatValue(terrain?.latitude)}
                    />

                    <InfoRow
                        label="Longitude"
                        value={formatValue(terrain?.longitude)}
                    />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Composição do Solo
                    </Text>

                    <InfoRow
                        label="Tipo de solo"
                        value={formatValue(terrain?.nomeSolo)}
                    />

                    <InfoRow
                        label="Argila"
                        value={formatValue(terrain?.argila, '%')}
                    />

                    <InfoRow
                        label="Areia"
                        value={formatValue(terrain?.areia, '%')}
                    />

                    <InfoRow
                        label="Silte"
                        value={formatValue(
                            terrain?.silto ?? terrain?.silte,
                            '%'
                        )}
                    />

                    <InfoRow
                        label="Raio analisado"
                        value={formatValue(terrain?.raioSoloKm, ' km')}
                    />
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteTerrain}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="trash-outline"
                        size={20}
                        color={colors.white}
                    />

                    <Text style={styles.deleteButtonText}>
                        Excluir terreno
                    </Text>
                </TouchableOpacity>
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

    terrainName: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
    },

    terrainCep: {
        fontSize: 14,
        color: colors.mutedText,
        marginTop: 4,
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
    deleteButton: {
        height: 52,
        backgroundColor: colors.danger,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },

    deleteButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '700',
    },
});