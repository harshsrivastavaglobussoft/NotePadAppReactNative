import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import dataHandle from './Data/Data';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state={
      email: "",
      password: "",
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

       <TouchableOpacity
        onPress={() => this._signInAction()}>
       <View style={styles.ButtonContainer}>
         <Text style={styles.textStyle}>Sign In</Text>
       </View>
       </TouchableOpacity>
      </View>
    )
  }
  _signInAction=()=>{
    dataHandle.getInstance()._createFirebase();
    dataHandle.getInstance().login(this.state.email,this.state.password,this);
  }
  _navigationHomeFromSignIn=()=>{
    this.props.navigation.navigate('Home');
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
