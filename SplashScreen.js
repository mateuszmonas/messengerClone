import React from 'react';
import {AsyncStorage} from "react-native";
import {Text} from "react-native-elements";
import {NavigationActions, StackActions} from "react-navigation";

export class SplashScreen extends React.Component<Props> {
    constructor(props: P, context: any) {
        super(props, context);
        this._checkIfLoggedIn().done();
    }

    render(): React.ReactNode {
        return <Text>elo</Text>;
    }

    navigateAfterFinish = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: screen})],
            key: null
        });
        this.props.navigation.dispatch(resetAction);
    };

    _checkIfLoggedIn = async () => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        console.log(token);
        console.log(userId);
        if (token && userId) {
            this.navigateAfterFinish('ConversationsListScreen');
            this.props.navigation.navigate('ConversationsListScreen');
        } else {
            this.navigateAfterFinish('LoginScreen');
            this.props.navigation.navigate('LoginScreen');
        }
    };

}