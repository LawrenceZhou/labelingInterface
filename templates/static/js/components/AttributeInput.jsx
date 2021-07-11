import React, { Component } from 'react';
import Select from 'react-select';
import Slider from 'react-input-slider';

const style = { width: 600, margin: 50 };

const genres = [
  { label: "rock", value: 1 },
  { label: "pop", value: 2 },
  { label: "dance", value: 3 },
  { label: "jazz", value: 4 },
  { label: "soul", value: 5 },
  { label: "R&B", value: 6 },
];

const emotions = [
  { label: "happy", value: 1 },
  { label: "sad", value: 2 },
  { label: "chillout(relaxed)", value: 3 },
  { label: "intense", value: 4 },
  { label: "upbeat", value: 5 },
  { label: "depressed", value: 6 },
  { label: "beautiful(bright)", value: 7 },
  { label: "dark", value: 8 }
];

export default class AttributeInput extends Component {
   constructor(props) {
    super(props);

    this.state = {
    selectedGenre: null,
    h: 50,
    c: 50,
    u: 50,
    b: 50,
    }

    this.handleGenreChange = this.handleGenreChange.bind(this);
    
  }

  handleGenreChange (selectedGenre){
    this.setState({ selectedGenre }, function() {console.log('Genre selected:', this.state.selectedGenre)});
    
  }

    render() {
       return (
       <div>
          <div style={{marginBottom: 30}}>
          <Select className="mt-4 col-md-6 col-offset-4" styles={{margin: 30}} options={ genres } defaultValue={{ label: "Select Genre...", value: 0 }} onChange={this.handleGenreChange}/>
          </div>

          <div style={{margin: 30}}>
          <p>{emotions[0].label}</p><p>{emotions[1].label}</p>
          <Slider
            axis="x"
            x={this.state.h}
            onChange={({ x }) => this.setState({ h:x })}
            styles={{
              track: {
                backgroundColor: 'blue'
              },
              active: {
                backgroundColor: 'red'
              },
              thumb: {
                width: 18,
                height: 18,
                opacity: 0.8
              }
            }}
          />
          </div>
          <div style={{margin: 30}}>
          <p>{emotions[2].label}</p><p>{emotions[3].label}</p>
          <Slider
            axis="x"
            x={this.state.c}
            onChange={({ x }) => this.setState({ c:x })}
            styles={{
              track: {
                backgroundColor: 'blue'
              },
              active: {
                backgroundColor: 'red'
              },
              thumb: {
                width: 18,
                height: 18,
                opacity: 0.8
              }
            }}
          />
          </div>
          <div style={{margin: 30}}>
          <p>{emotions[4].label}</p><p>{emotions[5].label}</p>
          <Slider
            axis="x"
            x={this.state.u}
            onChange={({ x }) => this.setState({ u:x })}
            styles={{
              track: {
                backgroundColor: 'blue'
              },
              active: {
                backgroundColor: 'red'
              },
              thumb: {
                width: 18,
                height: 18,
                opacity: 0.8
              }
            }}
          />
          </div>
          <div style={{margin: 30}}>
          <p>{emotions[6].label}</p><p>{emotions[7].label}</p>
          <Slider
            axis="x"
            x={this.state.b}
            onChange={({ x }) => this.setState({ b:x })}
            styles={{
              track: {
                backgroundColor: 'blue'
              },
              active: {
                backgroundColor: 'red'
              },
              thumb: {
                width: 18,
                height: 18,
                opacity: 0.8
              }
            }}
          />
          </div>

	     </div>
       )
    }
}
