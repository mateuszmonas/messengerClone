import React from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import WebController from "../web/WebController";
import ScreenUtils from "../ScreenUtils";

type State = {
    loginText: String;
    emailText: String;
    passwordText: String;
    repeatPasswordText: String;
}


export class RegisterScreen extends React.Component<Props, State> {
    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            loginText: "",
            emailText: "",
            passwordText: "",
            repeatPasswordText: ""
        }
    };

    _onRegisterClick() {
        if (this.state.passwordText === this.state.repeatPasswordText) {
            WebController.registerRequest(this.state.loginText, this.state.passwordText)
                .then(response => {
                    if (response.success) {
                        WebController.loginRequest(this.state.loginText, this.state.passwordText)
                            .then(response => {
                                if (response.success) {
                                    ScreenUtils.destroyScreen('ConversationsListScreen', this.props.navigation);
                                    this.props.navigation.navigate('ConversationsListScreen');
                                }
                            }).catch(e => {
                            console.log(e);
                            Alert.alert(
                                'Error',
                                'Can\'t register',
                                [
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                ]
                            );
                        })
                    }
                }).catch(console.log);
        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TextInput style={styles.usernameInput}
                           onChangeText={(text) => this.setState({loginText: text})}
                />
                <TextInput style={styles.passwordInput} secureTextEntry={true}
                           onChangeText={(text) => this.setState({passwordText: text})}
                />
                <TextInput style={styles.passwordInput} secureTextEntry={true}
                           onChangeText={(text) => this.setState({repeatPasswordText: text})}
                />
                <View style={styles.bottom}>
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
    emailInput: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderBottomWidth: 1
    },
    passwordInput: {
        backgroundColor: '#fff',
    },
    registerButton: {},
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});