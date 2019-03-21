import React from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";

type State = {
    loginText: String;
    emailText: String;
    passwordText: String;
    repeatPasswordText: String;
}


export class RegisterScreen extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TextInput style={styles.usernameInput}
                           onChangeText={(text) => this.setState({loginText: text})}
                />
                <TextInput style={styles.emailInput} secureTextEntry={true}
                           onChangeText={(text) => this.setState({emailText: text})}
                />
                <TextInput style={styles.passwordInput} secureTextEntry={true}
                           onChangeText={(text) => this.setState({passwordText: text})}
                />
                <TextInput style={styles.passwordInput} secureTextEntry={true}
                           onChangeText={(text) => this.setState({repeatPasswordText: text})}
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
    emailInput: {
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