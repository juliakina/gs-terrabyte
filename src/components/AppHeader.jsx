import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { DEFAULT_AVATAR_ID, getAvatarById } from '../constants/avatarOptions';
import { useUser } from '../context/UserContext';

export function AppHeader({
    navigation,
}) {
    const { userData } = useUser();

    const currentAvatar = getAvatarById(
        userData?.urlImg || DEFAULT_AVATAR_ID
    );

    function handleOpenDrawer() {
        navigation.dispatch(
            DrawerActions.openDrawer()
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleOpenDrawer}
                >
                    <Ionicons
                        name="menu"
                        size={30}
                        color={colors.primaryDark}
                    />
                </TouchableOpacity>

                <Image
                    source={require('../../assets/logo-horizontal.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Account')}
                    activeOpacity={0.8}
                >
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons
                            name={currentAvatar.icon}
                            size={24}
                            color={currentAvatar.color}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: 40,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },

    iconButton: {
        width: 50,
        alignItems: 'flex-start',
    },

    logo: {
        width: 160,
        marginRight: 10,
    },

    avatarPlaceholder: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
});