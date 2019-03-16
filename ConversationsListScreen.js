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
            const conversations = state.conversations.concat([{conversation: new Conversation('1', 'konfa1')}, {conversation: new Conversation('2', 'konfa2')}]);
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
                return {userId, token};
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _onPressedItem = (item, index) => {
        console.log(item);
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
                            subtitle={item.conversation.name}
                        />}
                    keyExtractor={(item, index) => item.conversation.conversationId}
                />
            </View>
        );
    }
}