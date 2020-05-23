import React from 'react';
import { AppContainer } from './src/navigation/AppNavigation'
import { Provider } from 'react-redux'
import store from './src/store'

export default class App extends React.Component {
  render() {
    return <Provider store={store}><AppContainer/></Provider>

  }
}


