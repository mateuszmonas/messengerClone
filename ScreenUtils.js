import {NavigationActions, StackActions} from "react-navigation";

//destroys this screen after leaving so the user cant go back
class ScreenUtils {
    destroyScreen(screen, navigation) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: screen})],
            key: null
        });
        navigation.dispatch(resetAction);
    };

}

export default new ScreenUtils();