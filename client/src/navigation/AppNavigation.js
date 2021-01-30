import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import {SignUp} from "../screens/SignUp";
import {SignIn} from "../screens/SignIn";
import {Cabinet} from "../screens/Cabinet";
import {Shop} from "../screens/Shop";
import {Cart} from "../screens/Cart";

const Navigator = createStackNavigator({
    SignUp: SignUp,
    SignIn: SignIn,
    Cabinet: Cabinet,
    Shop: Shop,
    Cart: Cart
},{
    initialRouteName: 'SignUp'
});

export const AppNavigation = createAppContainer(Navigator);