/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {ConversationScreen} from "./ConversationScreen";
import {LoginScreen} from "./LoginScreen";
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {ConversationsListScreen} from "./ConversationsListScreen";
import {SplashScreen} from "./SplashScreen";

export const MainNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
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