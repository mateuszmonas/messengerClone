import React, {Component} from 'react';
import {Alert, Button, FlatList, StyleSheet, View} from "react-native";
import {ListItem} from "react-native-elements"
import WebController from "../web/WebController";

type State = {
    conversations: [];
};

export class ConversationsListScreen extends Component<Props, State> {

    _getConversations() {
        WebController.getConversationsList().then(
            (response) => this._addConversationsToState(response))
            .catch((e) => {
                console.log(e);
                Alert.alert(
                    'Error',
                    'Can\'t load conversations',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                );
            })

    };

    _addConversationsToState(conversation) {
        this.setState(state => {
            const conversations = state.conversations.concat(conversation);
            return {
                conversations
            };
        })
    }

    _onCreateConversationClick() {
        this.props.navigation.navigate('CreateConversationScreen');
    }

    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            conversations: []
        };
    }

    componentDidMount(){
        WebController.connectToSocket();
        this._getConversations();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.conversations}
                    renderItem={({item}) =>
                        <ListItem
                            containerStyle={{borderColor:'#000', borderBottomWidth:1}}
                            onPress={() => {
                                this.props.navigation.navigate('ConversationScreen', {conversationId: item.id})
                            }}
                            title={item.name}
                        />}
                    keyExtractor={(item, index) => index.toString()}
                />
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
    createConversationButton: {},
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});