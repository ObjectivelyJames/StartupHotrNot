import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    View,
    SafeAreaView
} from 'react-native';
import SwipableStartupView from '../views/Developer/SwipableStartupView';
import ProfileView from '../views/Developer/ProfileView';
import TemplateView from '../views/Components/TemplateView';
import UserProfileOverview from '../views/Developer/UserProfileOverview';

const Stack = createStackNavigator();

export default function AppNavigator({ navigation }) {
    return (
        <TemplateView>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={SwipableStartupView} />
                <Stack.Screen name="Profile" component={ProfileView} />
                <Stack.Screen name="Overview" component={UserProfileOverview} />

            </Stack.Navigator>
        </TemplateView>
    );
}