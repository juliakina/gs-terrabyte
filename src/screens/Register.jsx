import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { createUser } from '../services/userService';
import { DEFAULT_AVATAR_ID } from '../constants/avatarOptions';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('F');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister() {
        if (
            !name.trim() ||
            !birthDate.trim() ||
            !phone.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos.'
            );
            return;
        }

        try {
            setIsLoading(true);

            await createUser({
                nome: name,
                dataNascimento: birthDate,
                telefone: phone,
                sexo: gender,
                email,
                senha: password,
                urlImg: DEFAULT_AVATAR_ID,
            });

            Alert.alert(
                'Sucesso',
                'Conta criada com sucesso!'
            );

            navigation.replace('Login');
        } catch (error) {
            console.log(error.response?.data);

            Alert.alert(
                'Erro',
                'Não foi possível criar a conta.'
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
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>
                            Crie sua Conta
                        </Text>

                        <Text style={styles.subtitle}>
                            Cadastre-se para acessar o TerraByte!
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <CustomInput
                            iconName="person-outline"
                            placeholder="Nome completo"
                            value={name}
                            onChangeText={setName}
                        />

                        <CustomInput
                            iconName="calendar-outline"
                            placeholder="Data de nascimento (AAAA-MM-DD)"
                            value={birthDate}
                            onChangeText={setBirthDate}
                        />
                        <Text style={styles.helperText}>
                            Exemplo: 2000-05-10
                        </Text>

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

                        <Text style={styles.genderLabel}>
                            Sexo
                        </Text>
                        <View style={styles.genderContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.genderButton,
                                    gender === 'F' &&
                                        styles.genderButtonSelected,
                                ]}
                                onPress={() => setGender('F')}
                            >
                                <Text
                                    style={[
                                        styles.genderText,
                                        gender === 'F' &&
                                            styles.genderTextSelected,
                                    ]}
                                >
                                    Feminino
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.genderButton,
                                    gender === 'M' &&
                                        styles.genderButtonSelected,
                                ]}
                                onPress={() => setGender('M')}
                            >
                                <Text
                                    style={[
                                        styles.genderText,
                                        gender === 'M' &&
                                            styles.genderTextSelected,
                                    ]}
                                >
                                    Masculino
                                </Text>
                            </TouchableOpacity>
                        </View>

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
                                    ? 'Cadastrando...'
                                    : 'Cadastrar'
                            }
                            onPress={handleRegister}
                            disabled={isLoading}
                        />
                    </View>

                    <View style={styles.login}>
                        <Text style={styles.loginText}>
                            Já tem conta?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.replace('Login')
                            }
                        >
                            <Text style={styles.loginLink}>
                                {' '}Entre!
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

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        marginBottom: 28,
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
    },

    subtitle: {
        fontSize: 15,
        color: colors.mutedText,
        textAlign: 'center',
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

    genderLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },

    genderContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 14,
    },

    genderButton: {
        flex: 1,
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },

    genderButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    genderText: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
    },

    genderTextSelected: {
        color: colors.white,
    },

    login: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },

    loginText: {
        color: colors.mutedText,
        fontSize: 15,
    },

    loginLink: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 15,
    },
});