import React from "react";
import AppContainer from "./Navigation";
import { Provider } from "react-redux";
import store from "./redux/store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
