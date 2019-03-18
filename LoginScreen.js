import React, {Component} from 'react';
import {AsyncStorage, Button, StyleSheet, TextInput, View} from 'react-native';
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
            }).catch((e) => {
        });
    };

    _onRegisterClick(){
        WebController.registerRequest(this.state.loginText, this.state.passwordText)
            .then().catch((e) => {
        });
    }
    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TextInput style={styles.usernameInput}
                           onChangeText={(text) => this.setState({loginText: {text}})}
                />
                <TextInput style={styles.passwordInput} secureTextEntry={true}
                           onChangeText={(text) => this.setState({passwordText: {text}})}
                />
                <View style={styles.bottom}>
                    <Button style={styles.loginButton} title='LOGIN'
                            onPress={() => this._onLoginClick()}/>
                    <Button style={styles.registerButton} title='REGISTER'
                            onPress={() => this._onRegisterClick()}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#48d2f0'
    },
    usernameInput: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderBottomWidth: 1
    },
    passwordInput: {
        backgroundColor: '#fff',
    },
    loginButton: {},
    registerButton: {},
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});