

import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  TouchableOpacity ,
  Image,
  FlatList,
  Button,
  Animated,
} from 'react-native';
//for navigation
var self
import {StackNavigator} from 'react-navigation';

import dataHandle from './Data/Data';

 export default class Homeview extends Component{

   static navigationOptions = {
     headerLeft: (
      <Button
        title='Log Out'
        onPress={()=>dataHandle.getInstance().logout(self)}
      />
    )
   }
  constructor(props){
    super(props);
    this.state={
        data:[],
    };
    console.log(this.state.data);
  }
componentWillMount(){
  dataHandle.getInstance()._readData(this);
}
_updateData=()=>{
  this.setState({
    data:Array.from(dataHandle.getInstance()._returnDataArray()),
  });
}

  render() {
    self=this.props.navigation;
    return(
      <View style={styles.viewConainer}>
      <FadeInView>
      <View style={styles.tableContainer}>
      <FlatList data={this.state.data}
       keyExtractor ={item => item.index}
       renderItem={({item}) =>(
       <TouchableOpacity
        onPress={() => this._onPress(item)}>
         <View style={styles.rowContainer}>
          <Text style={styles.itemContainer}>Description: {item.description}</Text>

          <TouchableOpacity
          onPress={() => this._DeleteAction(item)}>
           <View style={styles.deleteButtonContainer}>
             <Image style={styles.Button} source={require('./icons_and_images/delete.png')}/>
           </View>
          </TouchableOpacity>

         </View>
       </TouchableOpacity>
    )}
    />
    </View>
    </FadeInView>
          <View style={styles.ButtonContainer}>
          <TouchableOpacity  onPress={this._onPressAddButton}>
            <Image style={styles.Button} source={require('./icons_and_images/addblue.png')}/>
          </TouchableOpacity>
          </View>
      </View>
    );
  }

  _onPress =(rowdata)=>{
    self.navigate('Upadte',{pointer:this,indexData:rowdata});
  }
  _onPressAddButton =()=>{
    self.navigate('Compose',{pointer:this});
  }

  _DeleteAction =(rowData)=>{
     dataHandle.getInstance()._deleteRow(rowData.index);
     //getting refeshed Data
     dataHandle.getInstance()._readData(this);
  }

}

const styles = StyleSheet.create({
  viewConainer : {
    flex: 1,
    marginTop: 22,
    flexDirection: 'column',
    backgroundColor: '#e6e6e6',
  },
  tableContainer : {
    height : '90%',
    backgroundColor: 'white',
  },
  rowContainer : {
    height: 70,
    flexDirection: 'row',
  },
  itemContainer : {
    marginLeft: 10,
    paddingTop: 10,
    fontSize: 18,
    height: 60,
    width: '80%',
  },
  deleteButtonContainer : {
    marginLeft: 10,
    height: 60,
    width: 60,
  },
  ButtonContainer : {
    height: 40,
    width: 40,
    flex: 7,
    marginTop: 5,
    marginLeft: 30,
    backgroundColor: '#e6e6e6'
  },
  Button : {
    height: 40,
    width: 40,
  },
})
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 5000,
      }
    ).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
