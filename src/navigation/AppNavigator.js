import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    View,
    SafeAreaView
} from 'react-native';
import ProfileView from '../views/ProfileView';
import SwipableStartupView from '../views/SwipableView/SwipableStartupView';
import TemplateView from '../views/Components/TemplateView';

const Stack = createStackNavigator();

export default function AppNavigator({ navigation }) {
    return (
        <TemplateView>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={SwipableStartupView} />
                <Stack.Screen name="Profile" component={ProfileView} />
            </Stack.Navigator>
        </TemplateView>
    );
}