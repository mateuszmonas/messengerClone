import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import WebController from "./web/WebController";
import {NavigationActions, StackActions} from "react-navigation";

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

    _onLoginClick(){
        WebController.loginRequest(this.state.loginText, this.state.passwordText)
            .then(response => {
                if (response.success) {
                    this.destroyScreen('ConversationsListScreen');
                    this.props.navigation.navigate('ConversationsListScreen');
                }
            })
            .catch(console.log);
    };

    _onRegisterClick(){
        this.props.navigation.navigate('RegisterScreen')
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