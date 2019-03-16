import React, {Component} from 'react';
import {Message} from "./model/Message";
import {FlatList, Text, TextInput, View, AsyncStorage} from "react-native";

type State = {
    messages: [];
    conversationId: number;
};



export class ConversationScreen extends Component<Props, State> {

    getMessages(){
        this.setState(state => {
            const messages = state.messages.concat([{message: new Message('1', '1', 'elo')}, {message: new Message('2', '1', 'siema')}]);
            return {
                messages
            };
        });
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

    constructor(props: P, context: any) {
        super(props, context);
        this._retrieveData().then((data) => console.log(data));
        this.state = {
            messages: []
        };
    }

    componentDidMount(){
        this.getMessages();
    }

    render() {
        const { navigation } = this.props;
        const convoId = navigation.getParam('conversationId', 'keine id');
        console.log(convoId);
        return (
            <View>
                <FlatList
                    data={this.state.messages}
                    renderItem={({item}) =>
                        <View>
                            <Text>{item.message.text}</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => item.message.messageId}
                />
                <TextInput
                    ref={input => { this.textInput = input }}
                    onSubmitEditing={(event) => {
                        const text = event.nativeEvent.text;
                        this.textInput.clear();
                        this.setState(state => {
                            let id = state.messages.slice(-1)[0].message.messageId;
                            console.log(id);
                            const messages = state.messages.concat([{message: new Message((+id + 1).toString(), '1', text)}]);
                            return {
                                messages
                            };
                        });
                    }}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                />
            </View>
        );
    }
}