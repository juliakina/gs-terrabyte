import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { SoilCard } from '../components/SoilCard';
import { fetchSoilList } from '../services/soilService';

export default function Soil({ navigation }) {
    const [soils, setSoils] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'focus',
            loadSoils
        );

        return unsubscribe;
    }, [navigation]);

    async function loadSoils() {
        try {
            setIsLoading(true);

            const data = await fetchSoilList();

            setSoils(data);
        } catch (error) {
            setSoils([]);
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
                            Solos
                        </Text>

                        <Text style={styles.subtitle}>
                            Consulte os tipos de solo disponíveis
                        </Text>
                    </View>
                </View>

                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                        style={styles.loading}
                    />
                ) : (
                    soils.map((soil) => (
                        <SoilCard
                            key={soil.id}
                            name={soil.nome}
                            onPress={() =>
                                navigation.navigate('SoilPlantings', {
                                    soilId: soil.id,
                                    soilName: soil.nome,
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
});