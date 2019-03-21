/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {ConversationScreen} from "./screens/ConversationScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {ConversationsListScreen} from "./screens/ConversationsListScreen";
import {SplashScreen} from "./screens/SplashScreen";
import {RegisterScreen} from "./screens/RegisterScreen";

export const MainNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null
        }
    },
    ConversationScreen: {screen: ConversationScreen,
        navigationOptions: {
            header: null
        }},
    ConversationsListScreen: {screen: ConversationsListScreen,
        navigationOptions: {
            header: null
        }
    },
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null
        }}
}, {
    initialRouteName: 'SplashScreen'
});

const App = createAppContainer(MainNavigator);
export default App;