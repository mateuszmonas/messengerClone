import React from 'react';
import {AsyncStorage} from "react-native";
import {Text} from "react-native-elements";
import ScreenUtils from "../ScreenUtils";

export class SplashScreen extends React.Component<Props> {
    constructor(props: P, context: any) {
        super(props, context);
        this._checkIfLoggedIn().done();
    }

    render(): React.ReactNode {
        return <Text>elo</Text>;
    }

    _checkIfLoggedIn = async () => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        const username = await AsyncStorage.getItem('username');
        if (token && userId && username) {
            ScreenUtils.destroyScreen('ConversationsListScreen', this.props.navigation);
            this.props.navigation.navigate('ConversationsListScreen');
        } else {
            ScreenUtils.destroyScreen('LoginScreen', this.props.navigation);
            this.props.navigation.navigate('LoginScreen');
        }
    };

}