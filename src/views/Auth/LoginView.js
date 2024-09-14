import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../services/authService';
import styles from '../../utils/styles';

const LoginView = () => {
    const navigation = useNavigation();
    const { login } = useAuth(); // Destructure the login function from useAuth
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }

        try {
            console.log('Username:', username);
            console.log('Password:', password);

            await login(username, password);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please try again.');
            console.log('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to access your account</Text>


            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    type='material-community'
                    size={20}
                    color='#000'
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>New Member?</Text>
            <View style={styles.registerContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('StartupRegister')}>
                    <Text style={styles.registerButton}>Register as Startup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('UserRegister')}>
                    <Text style={styles.registerButton}>Register as User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default LoginView;
