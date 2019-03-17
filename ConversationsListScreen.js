import React, {Component} from 'react';
import {Conversation} from "./model/Conversation";
import {FlatList, Text, TextInput, View, AsyncStorage} from "react-native";
import {ListItem} from "react-native-elements"
import {webController} from "./web/webController";

type State = {
    conversations: [];
    token: String;
    userId: String;
};



export class ConversationsListScreen extends Component<Props, State> {

    _getConversations() {
        webController.getConversationsList(this.state.userId).then(
            (response) => this.setState(state => {
                const conversations = state.conversations.concat(response);
                return {
                    conversations
                };
            })
        );
    };

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
        this.state = {
            conversations: []
        };
    }

    componentDidMount(){
        this._retrieveData().then((data) => this.setState({
            userId: data.userId,
            token: data.token
        })).then(
        this._getConversations(this.state.userId));
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.conversations}
                    renderItem={({item}) =>
                        <ListItem
                            containerStyle={{borderColor:'#000', borderBottomWidth:1}}
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