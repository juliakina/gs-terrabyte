import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { PlantingCard } from '../components/PlantingCard';
import { fetchPlantingList } from '../services/plantingService';

export default function Planting({ navigation }) {
    const [plantings, setPlantings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'focus',
            loadPlantings
        );

        return unsubscribe;
    }, [navigation]);

    async function loadPlantings() {
        try {
            setIsLoading(true);

            const data = await fetchPlantingList();

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
                            Plantios
                        </Text>

                        <Text style={styles.subtitle}>
                            Consulte os plantios disponíveis
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
});