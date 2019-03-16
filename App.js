/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ConversationScreen} from "./ConversationScreen";
import {LoginScreen} from "./LoginScreen";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {ConversationsListScreen} from "./ConversationsListScreen";

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
        }}
}, {
    initialRouteName: 'LoginScreen'
});

const App = createAppContainer(MainNavigator);
export default App;