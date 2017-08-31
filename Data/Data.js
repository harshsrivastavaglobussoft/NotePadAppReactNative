import React,{Component} from 'react';
import Homeview from '../home';
let instance = null;

export default class dataHandle extends Component {
  static myInstance = null;
  static getInstance() {
       if (this.myInstance == null) {
           this.myInstance = new dataHandle();
       }

       return this.myInstance;
   }

  constructor(props) {
    super(props);
    this.state={
        Notes: "",
        Description: "",
        DataArray: [],
        i:0,
    };
  }
_returnDataArray=()=>{
  return this.state.DataArray;
}
_addData =(notes,desc)=>{
  console.log(notes);
  console.log(desc);
  this.state.Notes=notes;
  this.state.Description=desc;
  this.state.DataArray.push({name:this.state.Notes,
                 description:this.state.Description,
               index:this.state.i});
  this.state.i=this.state.i+1;
}

_updateRow=(row,newNote,newDescription)=>{
  this.state.DataArray[row].name= newNote;
  this.state.DataArray[row].description= newDescription;
}

_deleteRow=(row)=>{
for (var i = 0; i < this.state.DataArray.length; i++) {
   if (this.state.DataArray[i].index==row) {
       this.state.DataArray.splice(i,1);
   }
}
}

}
