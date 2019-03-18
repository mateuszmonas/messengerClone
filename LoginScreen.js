import React, {Component} from 'react';
import {AsyncStorage, Button, TextInput, View} from 'react-native';
import WebController from "./web/WebController";

type State = {
    loginText: String;
    passwordText: String;
}

export class LoginScreen extends Component<Props, State>{

    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            loginText: "",
            passwordText: ""
        }
    };

    _onLoginClick(){
        WebController.loginRequest(this.state.loginText, this.state.passwordText)
            .then(response => {
                AsyncStorage.setItem('token', 'asdfsasdgdfsergf324');//response.data.token);
                AsyncStorage.setItem('userId', '1');//response.userId);
                this.props.navigation.navigate('ConversationsListScreen')
            });
    };

    _onRegisterClick(){
        WebController.registerRequest(this.state.loginText, this.state.passwordText)
            .then();
    }
    render(): React.ReactNode {
        return (
            <View>
                <TextInput style={{ borderColor: '#000' , borderBottomWidth:1}}
                    onChangeText={(text) => this.setState({loginText: {text}})}
                />
                <TextInput secureTextEntry={true}
                    onChangeText={(text) => this.setState({passwordText: {text}})}
                />
                <Button title='LOGIN'
                        onPress={() => this._onLoginClick()}/>
                <Button title='REGISTER'
                        onPress={() => this._onRegisterClick()}/>
            </View>
        );
    }
}