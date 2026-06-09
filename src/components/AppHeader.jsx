import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

import { colors } from '../constants/colors';

export function AppHeader({
    navigation,
    profileImage = null,
    onProfilePress,
}) {
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
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={onProfilePress}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons
                                name="person"
                                size={26}
                                color={colors.white}
                            />
                        </View>
                    )}
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
        width: 120,
        height: 80,
    },

    profileButton: {
        width: 50,
        alignItems: 'flex-end',
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },

    avatarPlaceholder: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});