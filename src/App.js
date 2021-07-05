import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:5000/";

export default class App extends Component {
  state = {
    dat: [],
    ri:0,
    message:"0"
  };
 ll= async (vari)=>
  {
    console.log(vari);
   let m=await axios.post('/Add', vari).then(res => {
      console.log(res);
      if (res.data === 'nins')
       { console.log('Not Inserted');
     this.setState({message:"There is some problem occured refresh and try again"});
   }
      else 
        {console.log('Inserted');
      var f=vari.length+this.state.ri;
      this.setState({ri:f});
      this.setState({message:f +" Rows Inserted"});
    }
    });
  }
  hh = () => {
    var t=this.state.dat;
    var b=t.length;
    var mmo=0;
    var x=b%1000;
    console.log(x);
   for(var ii=0;ii<b-x;ii+=1000){
    var dd=[];
for(var tt=0;tt<1000;tt++){
dd.push(this.state.dat[mmo]);
mmo++;
}
this.ll(dd);

}
var ff=[]
for(tt=0;tt<x;tt++)
{ff.push(this.state.dat[mmo]);
  mmo++;

}
this.ll(ff);
  };
  handleOnDrop = data => {
    console.log('---------------------------');
    console.log(data);
    var x = this.state.dat;
    var hh = [];
    var f = data[0].data;
    for (var xm = 0; xm < f.length; xm++) {
      hh.push(f[xm]);
    }
    for (var i = 1; i < data.length; i++) {
      var m = data[i].data;
      var om = {};
      for (var j = 0; j < m.length; j++) {
        om[hh[j]] = m[j];
      }
      x.push(om);
    }
    this.setState({ dat: x });
    console.log('---------------------------');
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };ll
  view = () => {
    console.log(this.state.dat);
    this.hh();
  };
  render() {
    return (
      <>
        <h5>Click and Drag Upload</h5>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        <button onClick={this.view}>Show</button>
        <h3>{this.state.message}</h3>
      </>
    );
  }
}
