import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';

export function CustomInput({
    iconName,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
}) {
    return (
        <View style={styles.container}>
        <Ionicons name={iconName} size={20} color={colors.mutedText}/>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedText}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 14,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: colors.text,
    },
});