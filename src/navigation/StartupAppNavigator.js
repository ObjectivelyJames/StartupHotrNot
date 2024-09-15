import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartupHome from '../views/Startup/StartupHome';
import StartupProfile from '../views/Startup/StartupProfile';
import TemplateView from '../views/Components/TemplateView';
import StartupProfileOverview from '../views/Startup/StartupProfileOverview';

const Stack = createStackNavigator();

export default function AppNavigator({ navigation }) {
    return (
        <TemplateView>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={StartupHome} />
                <Stack.Screen name="Profile" component={StartupProfile} />
                <Stack.Screen name="Overview" component={StartupProfileOverview} />
            </Stack.Navigator>
        </TemplateView>
    );
}