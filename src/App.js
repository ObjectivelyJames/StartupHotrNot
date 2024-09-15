import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import StartupAppNavigator from './navigation/StartupAppNavigator';
import { AuthProvider, useAuth } from './services/authService';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </AuthProvider>
    );
}

function Main() {
    const { user } = useAuth();

    return user ? user.type === 'user' ? <AppNavigator /> : <StartupAppNavigator /> : <AuthNavigator />;
}