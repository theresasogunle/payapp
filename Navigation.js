import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

// Auth Screens
import LandingScreen from "./screens/auth/Landing";
import RegisterScreen from "./screens/auth/Register";
import LoginScreen from "./screens/auth/Login";
import VerifyAccountScreen from "./screens/auth/VerifyAccount";
import ForgotPasswordScreen from "./screens/auth/ForgotPassword";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";

// App Screens
import HomeScreen from './screens/app/HomeScreen';
import FundScreen from './screens/app/FundScreen';
import TransferScreen from './screens/app/TransferScreen'
import RaveScreen from './screens/app/RaveScreen'
import FundSuccessScreen from './screens/app/SuccessScreen'

const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen
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

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Rave: {
    screen: RaveScreen
  },
  Fund: {
    screen: FundScreen
  },
  FundSuccess: {
    screen: FundSuccessScreen
  },
  Transfer: {
    screen: TransferScreen
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
      AuthLoading: AuthLoadingScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
