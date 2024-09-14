import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../views/Auth/LoginView';
import UserRegistrationView from '../views/Auth/UserRegisterationView';
import StartupRegistrationView from '../views/Auth/StartupRegisterationView';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="UserRegister" component={UserRegistrationView} />
            <Stack.Screen name="StartupRegister" component={StartupRegistrationView} />
        </Stack.Navigator>
    );
}