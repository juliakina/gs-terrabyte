import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { DEFAULT_AVATAR_ID, avatarOptions, getAvatarById } from '../constants/avatarOptions';
import { useUser } from '../context/UserContext';

import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';

import {
    fetchUserInfo,
    updateUser,
} from '../services/userService';

export default function Account({ navigation }) {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedAvatar, setSelectedAvatar] =
        useState(DEFAULT_AVATAR_ID);
    const [isLoading, setIsLoading] = useState(false);
    const { userData, setUserData } = useUser();

    const currentAvatar = getAvatarById(selectedAvatar);

    useEffect(() => {
        if (!userData) return;

        setUserId(userData.id);
        setName(userData.nome || '');
        setPhone(userData.telefone || '');
        setSelectedAvatar(
            userData.urlImg || DEFAULT_AVATAR_ID
        );
    }, [userData]);

    async function loadUserInfo() {
        try {
            const userData = await fetchUserInfo();

            setUserId(userData.id);
            setName(userData.nome || '');
            setPhone(userData.telefone || '');
            setSelectedAvatar(userData.urlImg || DEFAULT_AVATAR_ID);
        } catch (error) {
            Alert.alert(
                'Erro',
                'Não foi possível carregar os dados da conta.'
            );
        }
    }

    async function handleUpdateAccount() {
        if (!phone.trim() || !password.trim()) {
            Alert.alert(
                'Atenção',
                'Preencha telefone e senha.'
            );
            return;
        }

        if (!/^\d{11}$/.test(phone)) {
            Alert.alert(
                'Atenção',
                'Informe o telefone no formato 11999998888.'
            );
            return;
        }

        try {
            setIsLoading(true);

            await updateUser(userId, {
                telefone: phone,
                senha: password,
                urlImg: selectedAvatar,
            });

            setUserData({
                ...userData,
                telefone: phone,
                urlImg: selectedAvatar,
            });

            Alert.alert(
                'Sucesso',
                'Conta atualizada com sucesso!'
            );

            setPassword('');
        } catch (error) {
            Alert.alert(
                'Erro',
                'Não foi possível atualizar a conta.'
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader
                navigation={navigation}
            />

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
                                Minha Conta
                            </Text>

                            <Text style={styles.pageSubtitle}>
                                Gerencie suas informações pessoais
                            </Text>
                        </View>
                    </View>

                    <View style={styles.profileCard}>
                        <View style={styles.avatarPreview}>
                            <Ionicons
                                name={currentAvatar.icon}
                                size={46}
                                color={currentAvatar.color}
                            />
                        </View>

                        <Text style={styles.name}>
                            {name}
                        </Text>

                        <Text style={styles.cardSubtitle}>
                            Escolha um avatar para seu perfil :D
                        </Text>

                        <View style={styles.avatarGrid}>
                            {avatarOptions.map((avatar) => (
                                <TouchableOpacity
                                    key={avatar.id}
                                    style={[
                                        styles.avatarOption,
                                        selectedAvatar === avatar.id &&
                                            styles.avatarOptionSelected,
                                    ]}
                                    onPress={() =>
                                        setSelectedAvatar(avatar.id)
                                    }
                                >
                                    <Ionicons
                                        name={avatar.icon}
                                        size={30}
                                        color={avatar.color}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.form}>
                        <CustomInput
                            iconName="call-outline"
                            placeholder="Telefone (DDD + número)"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.helperText}>
                            Exemplo: 11999998888
                        </Text>

                        <CustomInput
                            iconName="lock-closed-outline"
                            placeholder="Nova senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <PrimaryButton
                            title={isLoading ? 'Salvando...' : 'Salvar'}
                            onPress={handleUpdateAccount}
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
        marginBottom: 5,
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

    pageSubtitle: {
        fontSize: 14,
        color: colors.mutedText,
        marginTop: 4,
    },

    profileCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 20,
    },

    avatarPreview: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },

    cardSubtitle: {
        fontSize: 14,
        color: colors.mutedText,
        textAlign: 'center',
        marginBottom: 16,
    },

    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },

    avatarOption: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },

    avatarOptionSelected: {
        borderColor: colors.primary,
        borderWidth: 2,
        backgroundColor: colors.white,
    },

    form: {
        width: '100%',
    },

    helperText: {
        color: colors.mutedText,
        fontSize: 12,
        marginTop: -8,
        marginBottom: 12,
        marginLeft: 4,
    },
});