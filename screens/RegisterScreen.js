import React from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import WebController from "../web/WebController";
import {NavigationActions, StackActions} from "react-navigation";
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

    //destroys this screen after leaving so the user cant go back
    destroyScreen = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: screen})],
            key: null
        });
        this.props.navigation.dispatch(resetAction);
    };


    _onRegisterClick() {
        console.log(this.state.passwordText);
        console.log(this.state.repeatPasswordText);
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
                            }).catch(console.log)
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