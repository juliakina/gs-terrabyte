import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { ServiceCard } from '../components/ServiceCard';
import { TerrainCard } from '../components/TerrainCard';
import { colors } from '../constants/colors';

export default function Home({ navigation }) {
    const terrains = [];

    return (
        <View style={styles.container}>
            <AppHeader
                navigation={navigation}
                profileImage={null}
            />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionIndicator} />

                    <Text style={styles.sectionTitle}>
                        Terrenos
                    </Text>
                </View>

                {terrains.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Ionicons
                            name="map-outline"
                            size={38}
                            color={colors.primary}
                        />

                        <Text style={styles.emptyTitle}>
                            Ops! Nenhum terreno cadastrado :C
                        </Text>

                        <Text style={styles.emptyText}>
                            Cadastre seu primeiro terreno para começar suas análises.
                        </Text>

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('Terrain')}
                        >
                            <Text style={styles.addButtonText}>
                                Adicionar terreno
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    terrains.map((terrain) => (
                        <TerrainCard
                            key={terrain.id}
                            name={terrain.name}
                            city={terrain.city}
                            onPress={() => navigation.navigate('Terrain')}
                        />
                    ))
                )}

                <View style={styles.sectionHeader}>
                    <View style={styles.sectionIndicator} />

                    <Text style={styles.sectionTitle}>
                        Serviços
                    </Text>
                </View>

                <View style={styles.servicesGrid}>
                    <ServiceCard
                        title="Plantios"
                        iconName="leaf-outline"
                        onPress={() => navigation.navigate('Planting')}
                    />

                    <ServiceCard
                        title="Solos"
                        iconName="earth-outline"
                        onPress={() => navigation.navigate('Soil')}
                    />

                    <ServiceCard
                        title="Defensivos"
                        iconName="shield-checkmark-outline"
                        onPress={() => navigation.navigate('Pesticide')}
                    />

                    <ServiceCard
                        title="Análise de Compatibilidade"
                        iconName="analytics-outline"
                        onPress={() =>
                            navigation.navigate('CompatibilityAnalysis')
                        }
                    />
                </View>
            </ScrollView>

            <AppFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 28,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },

    sectionIndicator: {
        width: 5,
        height: 28,
        borderRadius: 4,
        backgroundColor: colors.primary,
        marginRight: 10,
    },

    sectionTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.text,
    },

    emptyCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 22,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        marginBottom: 30,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginTop: 12,
        marginBottom: 6,
        textAlign: 'center',
    },

    emptyText: {
        fontSize: 14,
        color: colors.mutedText,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 18,
    },

    addButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
    },

    addButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },

    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});