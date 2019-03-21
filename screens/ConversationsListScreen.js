import React, {Component} from 'react';
import {FlatList, View} from "react-native";
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
                console.log('getConversationslist');
                console.log(e);
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

    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            conversations: []
        };
    }

    componentDidMount(){
        this._getConversations();
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
                                this.props.navigation.navigate('ConversationScreen', {conversationId: item.conversationId})
                            }}
                            title={item.name}
                        />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}