import {
  createStackNavigator,
  createAppContainer
} from "react-navigation"
import LandingScreen from './screens/auth/Landing'
import RegisterScreen from './screens/auth/Register'
import LoginScreen from './screens/auth/Login'
import VerifyAccountScreen from './screens/auth/VerifyAccount'

const AppNavigator = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
    },
    Register: {
      screen: RegisterScreen
    },
    Login: {
      screen: LoginScreen
    },
    VerifyAccount: {
      screen: VerifyAccountScreen
    }
  },
  {
    initialRouteName: "Landing"
  }
);

export default createAppContainer(AppNavigator);