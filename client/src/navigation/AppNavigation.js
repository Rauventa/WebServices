import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignUp} from "../screens/SignUp";
import {SignIn} from "../screens/SignIn";
import {Cabinet} from "../screens/Cabinet";
import {Shop} from "../screens/Shop";
import {Cart} from "../screens/Cart";

// const renderUserId = async () => {
//     try {
//         const userId = await AsyncStorage.getItem('userId');
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// renderUserId()

const Navigator = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'SignUp',
            headerShown: false
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: 'SignIn',
            headerShown: false
        }
    },
    Cabinet: {
        screen: Cabinet,
        navigationOptions: {
            title: 'Cabinet',
            headerShown: false
        }
    },
    Shop: {
        screen: Shop,
        navigationOptions: {
            title: 'Shop',
            headerShown: false
        }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            title: 'Cart',
            headerShown: false
        }
    },
},{
    initialRouteName: 'SignUp'
});

export const AppNavigation = createAppContainer(Navigator);