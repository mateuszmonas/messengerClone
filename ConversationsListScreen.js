import React, {Component} from 'react';
import {Conversation} from "./model/Conversation";
import {FlatList, Text, TextInput, View, AsyncStorage} from "react-native";
import {ListItem} from "react-native-elements"

type State = {
    conversations: [];
};



export class ConversationsListScreen extends Component<Props, State> {

    _getMessages(){
        this.setState(state => {
            const conversations = state.conversations.concat([
                {conversation: new Conversation('1', 'konwersacja pierwsza')},
                {conversation: new Conversation('2', 'konwersacja druga')}]);
            return {
                conversations
            };
        });
    }

    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');
            if (userId !== null && token !== null) {
                // We have data!!
                // fetch('https://127.0.0.1:8080/getConversations/userId');
                return {userId, token};
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    constructor(props: P, context: any) {
        super(props, context);
        this._retrieveData().then((data) => {
            console.log(data.token);
            console.log(data.userId);
        });
        this.state = {
            conversations: []
        };
    }

    componentDidMount(){
        this._getMessages();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.conversations}
                    renderItem={({item}) =>
                        <ListItem
                            onPress={() => {
                                this.props.navigation.navigate('ConversationScreen', {conversationId: item.conversation.conversationId})
                            }}
                            title={item.conversation.name}
                        />}
                    keyExtractor={(item, index) => item.conversation.conversationId}
                />
            </View>
        );
    }
}