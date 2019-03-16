import React, {Component} from 'react';
import {TextInput, Button, View} from 'react-native';

type State = {
    loginText: String;
    passwordText: String;
}

export class Login extends Component<Props, State>{


    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            loginText: "",
            passwordText: ""
        }
    }

    loginRequest(){
        console.log(this.state.loginText);
        console.log(this.state.passwordText);
    };

    render(): React.ReactNode {
        return (
            <View>
                <TextInput
                    onChangeText={(text) => this.setState({loginText: {text}})}
                />
                <TextInput
                    onChangeText={(text) => this.setState({passwordText: {text}})}
                />
                <Button title='LOGIN'
                        onPress={() => this.loginRequest()}/>
            </View>
        );
    }
}