import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import axios from 'axios';
axios.defaults.baseURL = 'https://majestic-badlands-32380.herokuapp.com/';

export default class App extends Component {
  state = {
    dat: [],
    message: ''
  };
  hh = () => {
    axios.post('/Add', this.state.dat).then(res => {
      console.log(res);
      if (res.data === 'nins') {
        alert('Not Inserted');
        this.setState({
          message: 'There is some problem occured refresh and try again'
        });
      } else {
        alert('Inserted');
        var f = this.state.dat.length;
        this.setState({ message: f + ' Rows Inserted' });
      }
    });
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
  };
  ll;
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
