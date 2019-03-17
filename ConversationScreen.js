import React, {Component} from 'react';
import {Message} from "./model/Message";
import {FlatList, Text, TextInput, View, AsyncStorage} from "react-native";
import WebController from "./web/WebController";

type State = {
    messages: [];
    conversationId: number;
    token: String;
    userId: String;
};



export class ConversationScreen extends Component<Props, State> {

    _getMessages(){
        WebController.getMessages().then((response) => this.setState(state => {
            const messages = state.messages.concat(response);
            return {
                messages
            };
        }));
    }

    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');
            if (token !== null && userId !== null) {
                // We have data!!
                return {token, userId};
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _postMessage(text: String){
        let id = this.state.messages.slice(-1)[0].messageId;
        WebController.postMessage(new Message((+id + 1).toString(), '1', text)).done();
    }

    _addMessagesToState(message: Message){
        this.setState(state => {
            const messages = state.messages.concat([{message: message}]);
            return {
                messages
            };
        });
    }

    constructor(props: P, context: any) {
        super(props, context);
        this._retrieveData().then((data) => console.log(data));
        this.state = {
            messages: []
        };
    }

    componentDidMount(){
        const { navigation } = this.props;
        const conversationId = navigation.getParam('conversationId', 'keine id');
        this._retrieveData().then(
            (data) => this.setState({
                conversationId: conversationId,
                userId: data.userId,
                token: data.token
            })
        ).then(this._getMessages(this.state.conversationId));

        WebController.subscribeToNewMessageEvent((msg: String) => {this._addMessagesToState(JSON.parse(msg))}).done();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.messages}
                    renderItem={({item}) => {
                        if (item.authorId!=='1') {
                            return(<View>
                                <Text style={{textAlign: 'right', backgroundColor: '#00f', color: '#fff'}}>{item.text}</Text>
                            </View>)
                        }else{
                            return(<View>
                                <Text>{item.text}</Text>
                            </View>)
                        }
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                    ref={input => { this.textInput = input }}
                    onSubmitEditing={(event) => {
                        const text = event.nativeEvent.text;
                        this.textInput.clear();
                        this._postMessage(text);
                    }}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                />
            </View>
        );
    }
}