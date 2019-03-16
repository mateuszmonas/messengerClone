/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import {Message} from "./model/Message";
import {Conversation} from "./Conversation";
import {Login} from "./Login";
import {createStackNavigator, createAppContainer} from 'react-navigation';

export const MainNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Conversation: {screen: Conversation,
        navigationOptions: {
            header: null
        }},
}, {
    initialRouteName: 'Login'
});



// export default class App extends Component<Props> {
//     render(): React.ReactNode {
//         return <MainNavigator />;
//     }
// }

const App = createAppContainer(MainNavigator);
export default App;