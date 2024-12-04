import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen,Signup } from '../screens';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}

export default StackNavigator;