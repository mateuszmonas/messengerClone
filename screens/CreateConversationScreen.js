import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from "react-native";

type State = {
    userNamesList: [];
};

export class CreateConversationScreen extends Component<Props, State> {

    _onCreateConversationClick() {

    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TextInput/>
                <FlatList/>
                <View style={styles.bottom}>
                    <Button style={styles.createConversationButton} title='CREATE CONVERSATION'
                            onPress={() => this._onCreateConversationClick()}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#48d2f0'
    },
    userNameInput: {},
    createConversationButton: {},
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});