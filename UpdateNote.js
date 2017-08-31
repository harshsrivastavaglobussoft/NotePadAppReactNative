import React,{Component} from 'react';

import{
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import stackNavigation from './index'
import dataHandle from './Data/Data'

export default class update extends Component {
constructor(props){
  super(props);
  this.state={
    descriptionText: this.props.navigation.state.params.indexData.description,
    noteText:this.props.navigation.state.params.indexData.name,
    homePointer:this.props.navigation.state.params.pointer,
    id: this.props.navigation.state.params.indexData.index,
  };
}
_onPressOkButton=()=>{
  let dataModel=dataHandle.getInstance();
  dataModel._updateRow(this.state.id,this.state.noteText,this.state.descriptionText);
  this.state.homePointer._updateData();
  Alert.alert('Note Updated');
}

  render() {
   return(
     <View style={styles.viewConainer}>
     <View style={styles.desccriptionView}>
       <TextInput
         style={styles.descriptionTextView}
         placeholder="Description"
         onChangeText={(descriptionText) => this.setState({descriptionText})}
         value={this.state.descriptionText}
       />
      </View>

      <View style={styles.noteContainer}>
      <TextInput
          style={styles.noteTextView}
          multiline={true}
          placeholder="Note"
          onChangeText={(noteText) => this.setState({noteText})}
          value={this.state.noteText}
        />
      </View>

     <View style={styles.ButtonContainer}>
      <TouchableOpacity  onPress={this._onPressOkButton}>
       <Image style={styles.Button} source={require('./icons_and_images/tick.png')}/>
      </TouchableOpacity>
     </View>

     </View>
   );
  }
}

const styles = StyleSheet.create({
  viewConainer : {
    flex: 1,
    backgroundColor: 'white',
  },
  desccriptionView :{
    height:60,
    backgroundColor:'#d9d9d9',
  },
  descriptionTextView: {
    height: 40,
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  noteContainer : {
    marginTop: 20,
    height: 300,
    backgroundColor: '#d9d9d9',
  },
  noteTextView : {
    height: 280,
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  ButtonContainer : {
    height: 40,
    width: '85%',
    flex: 7,
    marginLeft: 30,
    flexDirection: 'row',
    marginTop: '40%',
    backgroundColor: 'white'
  },
  Button : {
    height: 40,
    width: 40,
  },
})
