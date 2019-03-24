import React, {Component} from 'react';
import {Message} from "../model/Message";
import {Alert, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import WebController from "../web/WebController";

type State = {
    messages: [];
    conversationId: number;
};



export class ConversationScreen extends Component<Props, State> {

    _getMessages() {
        WebController.getMessages(this.state.conversationId)
            .then(response => this._addMessagesToState(response))
            .catch(e => {
                console.log(e);
                Alert.alert(
                    'Error',
                    'Can\'t load messages',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                );
            });
    }

    _postMessage(text: String){
        WebController.postMessage(new Message((+id + 1).toString(), '1', text)).done();
    }

    _addMessagesToState(message){
        this.setState(state => {
            const messages = state.messages.concat(message);
            return {
                messages
            };
        });
    }

    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            messages: []
        };
    }

    componentDidMount(){
        const { navigation } = this.props;
        const conversationId = navigation.getParam('conversationId', '0');
        this.setState({
            conversationId: conversationId,
        }, () => {
            this._getMessages(this.state.conversationId);
        });

        WebController.subscribeToNewMessageEvent((msg: String) => {this._addMessagesToState(JSON.parse(msg))}).done();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    renderItem={({item}) => {
                        if (item.authorId !== '1') {
                            return (<View>
                                <Text style={{
                                    textAlign: 'right',
                                    backgroundColor: '#00f',
                                    color: '#fff'
                                }}>{item.text}</Text>
                            </View>)
                        } else {
                            return (<View>
                                <Text>{item.text}</Text>
                            </View>)
                        }
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.bottom}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        onSubmitEditing={(event) => {
                            const text = event.nativeEvent.text;
                            this.textInput.clear();
                            this._postMessage(text);
                        }}
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            backgroundColor: '#fff',
                            borderWidth: 1
                        }}
                    />
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