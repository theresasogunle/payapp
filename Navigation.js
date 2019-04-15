import {
  createStackNavigator,
  createAppContainer
} from "react-navigation"
import LandingScreen from './screens/Landing'
import RegisterScreen from './screens/Register'

const AppNavigator = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
    },
    Register: {
      screen: RegisterScreen
    }
  },
  {
    initialRouteName: "Landing"
  }
);

export default createAppContainer(AppNavigator);