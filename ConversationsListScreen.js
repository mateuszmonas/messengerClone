import React, {Component} from 'react';
import {AsyncStorage, FlatList, View} from "react-native";
import {ListItem} from "react-native-elements"
import WebController from "./web/WebController";

type State = {
    conversations: [];
    token: String;
    userId: String;
};



export class ConversationsListScreen extends Component<Props, State> {

    _getConversations() {
        WebController.getConversationsList(this.state.userId).then(
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
                                this.props.navigation.navigate('ConversationScreen', {conversationId: item.conversationId})
                            }}
                            title={item.name}
                        />}
                    keyExtractor={(item, index) => item.conversationId}
                />
            </View>
        );
    }
}