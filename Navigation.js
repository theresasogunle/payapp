import {
  createStackNavigator,
  createAppContainer
} from "react-navigation"
import LandingScreen from './screens/auth/Landing'
import RegisterScreen from './screens/auth/Register'
import LoginScreen from './screens/auth/Login'
import VerifyAccountScreen from './screens/auth/VerifyAccount'
import ForgotPasswordScreen from './screens/auth/ForgotPassword'

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
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen
    }
  },
  {
    initialRouteName: "Landing"
  }
);

export default createAppContainer(AppNavigator);