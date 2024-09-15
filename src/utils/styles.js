// src/views/Auth/styles.js
import { StyleSheet } from 'react-native';
import colors from './colors'; // Adjust the import path as necessary

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.black,
    },
    subtitle: {
        fontSize: 18,
        color: colors.gray2,
        margin: 10,
    },
    text: {
        fontSize: 14,
        color: colors.gray2,
        margin: 10,
    },
    fileText: {
        fontSize: 14,
        color: colors.gray2,
        margin: 10,
        textDecorationLine: 'underline',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    profilePic: {
        height: 300,
        width: 400,
        margin: 15,
        borderRadius: 8,
    },
    checkbox: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 8,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: colors.gray3,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        margin: 5,
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    registerText: {
        color: colors.gray3,
        fontSize: 16,
        margin: 10,
    },
    registerButton: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
    icon: {
        padding: 10,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default styles;