import React,{Component} from 'react';
import Homeview from '../home';
import {Alert} from 'react-native';
import * as firebase from 'firebase';

export const firebaseapp = null;
let instance = null;


var config = {
  apiKey: "AIzaSyB69zPEkh-V94yh1I40f5bqtJ__BMwYvLk",
  authDomain: "notepadapp-1c600.firebaseapp.com",
  databaseURL: "https://notepadapp-1c600.firebaseio.com",
  projectId: "notepadapp-1c600",
  storageBucket: "notepadapp-1c600.appspot.com",
  messagingSenderId: "743688945922"
};

export default class dataHandle extends Component {
  static myInstance = null;
  static getInstance() {
       if (this.myInstance == null) {
           this.myInstance = new dataHandle();
       }

       return this.myInstance;
   }

  static firebaseApp = null;

   _createFirebase=()=> {
    if (this.firebaseApp == null) {
      this.firebaseApp = firebase.initializeApp(config);
    }
    return this.firebaseApp;
  }

  constructor(props) {
    super(props);
    this.state={
        Notes: "",
        Description: "",
        DataArray: [],
        i:0,
        user: "",
    };
  }

  _getUser=()=>{
     this.state.user = this._createFirebase().auth().currentUser;
  }

  _writeUserData=()=> {
    let path = "/users/"+this.state.user.uid;
    this._createFirebase().database().ref(path).set({
     dataArray:this.state.DataArray
  });
  }

 _readData=(homePointer)=>{
   let self = this;
   let path = "/users/"+this.state.user.uid;
   var starCountRef = firebase.database().ref(path);
   starCountRef.on('value', function(snapshot) {
     if(snapshot.val()!=null){
      self.state.DataArray = snapshot.val().dataArray,
      homePointer._updateData();
    }
   });
 }

_returnDataArray=()=>{
return this.state.DataArray;
}

_addData =(notes,desc)=>{
  //if array is not empty
  if (this.state.DataArray.length!=0) {
    this.state.i=this.state.DataArray[this.state.DataArray.length-1].index;
    this.state.i=this.state.i+1;
  }
  this.state.Notes=notes;
  this.state.Description=desc;
  this.state.DataArray.push({name:this.state.Notes,
                 description:this.state.Description,
               index:this.state.i});

  this._writeUserData();
}

_updateRow=(row,newNote,newDescription)=>{
  this.state.DataArray[row].name= newNote;
  this.state.DataArray[row].description= newDescription;
  this._writeUserData();
}

_deleteRow=(row)=>{
for (var i = 0; i < this.state.DataArray.length; i++) {
   if (this.state.DataArray[i].index==row) {
       this.state.DataArray.splice(i,1);
   }
}
this._writeUserData();
}

async signup(email, pass, pointer) {
    try {
        await this._createFirebase().auth()
            .createUserWithEmailAndPassword(email, pass);
        this._getUser();
        pointer._navigationHome();

    } catch (error) {
        console.log(error.toString())
        Alert.alert(error.toString());
    }
}
async login(email, pass, pointer) {

    try {
        await this._createFirebase().auth()
            .signInWithEmailAndPassword(email, pass);
        this._getUser();
        pointer._navigationHomeFromSignIn();

    } catch (error) {
        console.log(error.toString())
        Alert.alert(error.toString());
    }

}
async logout(navigationPointer) {

    try {
        await this._createFirebase().auth().signOut();
        Alert.alert('Log out successful');
        navigationPointer.goBack();
    } catch (error) {
        console.log(error);
    }

}
}
