import { useState } from 'react';
import { Image, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { loginUser } from '../services/authService';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos.'
            );
            return;
        }

        try {
            setIsLoading(true);

            const authData = await loginUser(
                email,
                password
            );

            const accessToken =
                authData.accessToken;

            const refreshToken =
                authData.refreshToken;

            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);

            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(
                'Erro',
                'E-mail ou senha inválidos.'
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>
                            Acesse sua Conta
                        </Text>

                        <Text style={styles.subtitle}>
                            Gerencie seus plantios de forma inteligente!
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <CustomInput
                            iconName="mail-outline"
                            placeholder="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        <CustomInput
                            iconName="lock-closed-outline"
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <PrimaryButton
                            title={
                                isLoading
                                    ? 'Entrando...'
                                    : 'Entrar'
                            }
                            onPress={handleLogin}
                            disabled={isLoading}
                        />
                    </View>

                    <View style={styles.register}>
                        <Text style={styles.registerText}>
                            Não tem conta?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Register')
                            }
                        >
                            <Text style={styles.registerLink}>
                                {' '}Cadastre-se!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },

    logo: {
        width: 180,
        height: 180,
        marginBottom: 5,
        marginTop: 5,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 15,
        color: colors.mutedText,
        textAlign: 'center',
        lineHeight: 22,
    },

    form: {
        width: '100%',
        marginTop: 8,
    },

    register: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    registerText: {
        color: colors.mutedText,
        fontSize: 15,
    },

    registerLink: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: '700',
    },
});