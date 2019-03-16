import React, {Component} from 'react';
import {Message} from "./model/Message";
import {FlatList, Text, TextInput, View} from "react-native";

type State = {
    data: [];
};

export class Conversation extends Component<Props, State> {


    constructor(props: P, context: any) {
        super(props, context);

        this.state = {
            data: [{message: new Message('1', '1', 'elo')}, {message: new Message('2', '1', 'siema')}]
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
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
                        console.log(text);
                        this.textInput.clear();
                        this.setState(state => {
                            let id = state.data.slice(-1)[0].id;
                            const data = state.data.concat([{message: new Message((+id + 1).toString(), '1', text)}]);
                            return {
                                data
                            };
                        });
                    }}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                />
            </View>
        );
    }
}