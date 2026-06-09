import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { createAddress } from '../services/addressService';

export default function CreateTerrain({ navigation }) {
    const [name, setName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateTerrain() {
        if (!name.trim() || !zipCode.trim()) {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos.'
            );
            return;
        }

        if (!/^\d{8}$/.test(zipCode)) {
            Alert.alert(
                'Atenção',
                'Informe o CEP com 8 números. Exemplo: 01311000.'
            );
            return;
        }

        try {
            setIsLoading(true);

            await createAddress({
                nome: name,
                cep: zipCode,
            });

            Alert.alert(
                'Sucesso',
                'Terreno cadastrado com sucesso!'
            );

            setName('');
            setZipCode('');

            navigation.navigate('Terrain');
        } catch (error) {
            Alert.alert(
                'Erro',
                'Não foi possível cadastrar o terreno.'
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader navigation={navigation} />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleContainer}>
                        <View style={styles.titleIndicator} />

                        <View>
                            <Text style={styles.title}>
                                Cadastrar Terreno
                            </Text>

                            <Text style={styles.subtitle}>
                                Informe o nome e o CEP do terreno
                            </Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <CustomInput
                            iconName="map-outline"
                            placeholder="Nome do terreno"
                            value={name}
                            onChangeText={setName}
                        />

                        <CustomInput
                            iconName="location-outline"
                            placeholder="CEP"
                            value={zipCode}
                            onChangeText={setZipCode}
                            keyboardType="number-pad"
                        />

                        <Text style={styles.helperText}>
                            Exemplo: 01311000
                        </Text>

                        <PrimaryButton
                            title={isLoading ? 'Salvando...' : 'Salvar'}
                            onPress={handleCreateTerrain}
                            disabled={isLoading}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <AppFooter />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    keyboardView: {
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

    card: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },

    helperText: {
        color: colors.mutedText,
        fontSize: 12,
        marginTop: -8,
        marginBottom: 12,
        marginLeft: 4,
    },
});