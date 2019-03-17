import React, {Component} from 'react';
import {Message} from "./model/Message";
import {FlatList, Text, TextInput, View, AsyncStorage} from "react-native";
import {WebController} from "./web/WebController";

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
        let id = this.state.messages.slice(-1)[0].message.messageId;
        WebController.postMessage(new Message((+id + 1).toString(), '1', text)).then();
        this.setState(state => {
            console.log(id);
            const messages = state.messages.concat([{message: new Message((+id + 1).toString(), '1', text)}]);
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
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.messages}
                    renderItem={({item}) => {
                        if (item.message.authorId!=='1') {
                            return(<View>
                                <Text style={{textAlign: 'right', backgroundColor: '#00f', color: '#fff'}}>{item.message.text}</Text>
                            </View>)
                        }else{
                            return(<View>
                                <Text>{item.message.text}</Text>
                            </View>)
                        }
                    }
                    }
                    keyExtractor={(item, index) => item.message.messageId}
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