import React, {Component} from 'react';
import {AsyncStorage, TextInput, Button, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {webController} from "./web/webController";

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

    async onLoginClick(){
        webController.loginRequest(this.state.loginText, this.state.passwordText)
            .then((response) => {
                AsyncStorage.setItem('token', response.token);
                AsyncStorage.setItem('userId', response.userId);
                this.props.navigation.navigate('ConversationsListScreen')
            });
    };

    render(): React.ReactNode {
        return (
            <View>
                <TextInput style={{ borderColor: '#000' , borderWidth:1}}
                    onChangeText={(text) => this.setState({loginText: {text}})}
                />
                <TextInput style={{ borderColor: '#000' , borderWidth:1}} secureTextEntry={true}
                    onChangeText={(text) => this.setState({passwordText: {text}})}
                />
                <Button title='LOGIN'
                        onPress={() => this.onLoginClick()}/>
            </View>
        );
    }
}