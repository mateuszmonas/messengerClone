import React, {Component} from 'react';
import {AsyncStorage, TextInput, Button, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

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

    async loginRequest(){
        try {
            await AsyncStorage.setItem('token', '1928u498012uuer981u2hd');
            await AsyncStorage.setItem('userId', '132');
        } catch (error) {
            // Error saving data
        }
        this.props.navigation.navigate('ConversationsListScreen')
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