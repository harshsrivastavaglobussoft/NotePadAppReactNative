import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import dataHandle from './Data/Data';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state={
      email: "",
      password: "",
      isLoading: false,
      indicatorHeight: 0,
    };
  }
  render(){
    return(
      <View style={styles.viewConainer}>
       <View style={styles.TextView}>
       <TextInput
         style={styles.TextInputView}
         placeholder="Email"
         onChangeText={(email) => this.setState({email})}
         value={this.state.email}
       />
       <TextInput
         style={styles.TextInputView}
         placeholder="Password"
         onChangeText={(password) => this.setState({password})}
         value={this.state.password}
         secureTextEntry={true}
       />
       </View>

       <ActivityIndicator
           animating={this.state.isLoading}
           style={{alignItems: 'center',
                   justifyContent: 'center',
                   marginTop: 15,
                   height: this.state.indicatorHeight, }}
           color="#0077e6"
           size="large"
       />

       <TouchableOpacity
        onPress={() => this._SignUpAction()}>
       <View style={styles.ButtonContainer}>
         <Text style={styles.textStyle}>Sign Up</Text>
       </View>
       </TouchableOpacity>

       <TouchableOpacity
        onPress={() => this._signInAction()}>
       <View style={styles.ButtonContainer}>
         <Text style={styles.textStyle}>Sign In</Text>
       </View>
       </TouchableOpacity>
      </View>
    )
  }
  _SignUpAction=()=>{
    this._startActivityIndicator();
    dataHandle.getInstance()._createFirebase();
    dataHandle.getInstance().signup(this.state.email,this.state.password,this);
  }
  _signInAction=()=>{
    this.props.navigation.navigate('SignInScreen');
  }
  _navigationHome=()=>{
    this.props.navigation.navigate("Home");
    }
  _stopActivityIndicator=()=>{
    this.setState({
      isLoading: false,
      indicatorHeight: 0,
    });
  }

  _startActivityIndicator=()=>{
    this.setState({
      isLoading: true,
      indicatorHeight: 100,
    });
  }
}
const styles = StyleSheet.create({
  viewConainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  TextView :{
    height: 200,
    backgroundColor: 'skyblue',
    justifyContent: 'space-around',
  },
  TextInputView:{
    height: 60,
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  ButtonContainer: {
    marginTop:20,
    height: 60,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'rgba(59,162,252,1)',
  },
  textStyle: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  }
});
