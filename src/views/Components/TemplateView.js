import React, { useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../services/authService';

import colors from '../../utils/colors';

const TemplateView = ({ children }) => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(1);
    const { logout } = useAuth(); // Destructure the login function from useAuth

    const goProfile = () => {
        setCurrentIndex(0);
        navigation.navigate('Profile');

    };
    const goHome = () => {
        setCurrentIndex(1);
        navigation.navigate('Home');
    };

    const goLogout = async () => {
        await logout()
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon}>
                    <Icon name="menu" size={24} color={colors.black} />
                </TouchableOpacity>
                <View style={styles.headerTitle}>

                </View>
                <TouchableOpacity style={styles.headerIcon}>
                    <Icon name="settings" size={24} color={colors.black} />
                </TouchableOpacity>
            </View>


            <View style={styles.content}>
                {children}
            </View>


            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerIcon, currentIndex == 0 ? styles.activeIcon : null]} onPress={goProfile}>
                    <Icon name="person" size={28} color={currentIndex == 0 ? colors.primary : colors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerIcon, currentIndex == 1 ? styles.activeIcon : null]} onPress={goHome}>
                    <Icon name="home" size={28} color={currentIndex == 1 ? colors.primary : colors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcon} onPress={goLogout}>
                    <Icon name="logout" size={28} color={colors.black} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerIcon: {
        padding: 10,
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    footer: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.white,
    },
    footerIcon: {
        padding: 10,
    },
    activeIcon: {
        backgroundColor: '#fff', // Example active state style
        borderRadius: 50,
        padding: 12,
    },
});

export default TemplateView;
