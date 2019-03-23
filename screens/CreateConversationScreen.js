import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from "react-native";
import WebController from "../web/WebController";
import ScreenUtils from "../ScreenUtils";

type State = {
    conversationName: String;
    userNamesList: [];
};

export class CreateConversationScreen extends Component<Props, State> {

    _onCreateConversationClick() {
        WebController.postConversation(this.state.conversationName, this.state.userNamesList)
            .then(response => {
                ScreenUtils.destroyScreen('ConversationScreen', this.props.navigation);
                this.props.navigation.navigate('ConversationScreen', {conversationId: response.conversationId});
            }).catch(console.log);
    }

    _onUserNameInputSubmitEditing(text: String) {
        this.setState(state => {
            const userNamesList = state.userNamesList.concat(text);
            return {
                userNamesList
            }
        })
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TextInput style={styles.conversationNameInput}
                           onChangeText={(text) => this.setState({conversationName: text})}
                />
                <TextInput style={styles.userNameInput}
                           onSubmitEditing={event => this._onUserNameInputSubmitEditing(event.nativeEvent.text)}
                />
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
    conversationNameInput: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderBottomWidth: 1
    },
    userNameInput: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderBottomWidth: 1
    },
    createConversationButton: {},
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});