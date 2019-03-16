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

type Props = {};

type State = {
  data: [];
};

export default class App extends Component<Props, State> {
    render(): React.ReactNode {
        return <Login />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: "red"
  },
});
