/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React,{Component} from 'react';
import {
  AppRegistry,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Homeview from './home';
import compose from './composeNote';
import update from './UpdateNote';
import SignUp from './SignUp';
import SignIn from './signIn';

class reactNavigationSample extends Component {
  render(){
    const { navigation } = this.props;
    return (
      <App navigation={ navigation }/>
    );
  }
}
const App = StackNavigator({
  SignUpScreen: {
    screen: SignUp,
    navigationOptions:{
      title: 'Sign Up',
    }
  },
  SignInScreen : {
    screen: SignIn,
    navigationOptions:{
      title: 'Sign In',
    }
  },
  Home: { screen: Homeview,
  navigationOptions:{
    title: 'Home Screen',
    }
  },
  Compose: { screen: compose,
    navigationOptions:{
    title: 'Compose Note',
    }
  },
  Upadte: {
    screen:update,
    navigationOptions:{
      title: 'Upadte Note',
  }
},
});
export default App;

AppRegistry.registerComponent('NotePadApp',() => App);
