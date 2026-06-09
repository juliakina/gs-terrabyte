import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { TerrainCard } from '../components/TerrainCard';
import { fetchAddressList } from '../services/addressService';

export default function Terrain({ navigation }) {
    const [terrains, setTerrains] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'focus',
            loadTerrains
        );

        return unsubscribe;
    }, [navigation]);

    async function loadTerrains() {
        try {
            setIsLoading(true);

            const data = await fetchAddressList();

            setTerrains(data);
        } catch (error) {
            setTerrains([]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader navigation={navigation} />
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleContainer}>
                        <View style={styles.titleIndicator} />

                        <View>
                            <Text style={styles.title}>
                                Terrenos
                            </Text>

                            <Text style={styles.subtitle}>
                                Visualize e gerencie seus terrenos cadastrados
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() =>
                            navigation.navigate('CreateTerrain')
                        }
                    >
                        <Ionicons
                            name="add"
                            size={22}
                            color={colors.white}
                        />

                        <Text style={styles.addButtonText}>
                            Novo Terreno
                        </Text>
                    </TouchableOpacity>

                    {isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                            style={styles.loading}
                        />
                    ) : terrains.length === 0 ? (
                        <View style={styles.emptyCard}>
                            <Ionicons
                                name="map-outline"
                                size={42}
                                color={colors.primary}
                            />

                            <Text style={styles.emptyTitle}>
                                Nenhum terreno cadastrado
                            </Text>

                            <Text style={styles.emptyText}>
                                Cadastre seu primeiro terreno para começar suas análises.
                            </Text>
                        </View>
                    ) : (
                        terrains.map((terrain) => (
                            <TerrainCard
                                key={terrain.id}
                                name={terrain.nome}
                                zipCode={terrain.cep}
                                onPress={() =>
                                    navigation.navigate('TerrainDetails', {
                                        terrainId: terrain.id,
                                    })
                                }
                            />
                        ))
                    )}
                </ScrollView>
            </View>
            <AppFooter />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    container: {
        flex: 1,
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

    addButton: {
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        gap: 6,
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