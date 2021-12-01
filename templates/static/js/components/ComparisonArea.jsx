import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
import Konva from 'konva';
import { Play, Pause } from 'grommet-icons';
import { Box } from 'grommet';
import ReactAudioPlayer from 'react-audio-player';

export default class ComparisonArea extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      audioPath: "static/assets/wavs/Ses01F_script01_2.wav",
      audioRef: React.createRef(),
      horizontalLines: [50, 100, 150, 200, 250, 300, 350],
      verticalLines: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500],
      boxes: [],
      currentTime:0,
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.tickingTimer = this.tickingTimer.bind(this);
    this.audio = new Audio(this.state.audioPath);
  }


  componentDidMount(){
    var boxes_ = [{index: 0, x: 67, y: 201, speaker: 'F', end: 106}, 
                  {index: 1, x: 100, y: 101, speaker: 'M', end: 135},
                  {index: 2, x: 127, y: 201, speaker: 'F', end: 173},
                  {index: 3, x: 166, y: 101, speaker: 'M', end: 217},
                  {index: 4, x: 212, y: 201, speaker: 'F', end: 265},
                  {index: 5, x: 257, y: 101, speaker: 'M', end: 331},
                  {index: 6, x: 336, y: 101, speaker: 'M', end: 406},
                  {index: 7, x: 399, y: 201, speaker: 'F', end: 430},
                  {index: 8, x: 424, y: 101, speaker: 'M', end: 453},
                  {index: 9, x: 443, y: 201, speaker: 'F', end: 463},
                  {index: 10, x: 458, y: 101, speaker: 'M', end: 476},
                  {index: 11, x: 471, y: 201, speaker: 'F', end: 509},
                  {index: 12, x: 506, y: 101, speaker: 'M', end: 526},
                  {index: 13, x: 520, y: 201, speaker: 'F', end: 565},
                  {index: 14, x: 558, y: 101, speaker: 'M', end: 582},
                  {index: 15, x: 577, y: 201, speaker: 'F', end: 667},
                  {index: 16, x: 661, y: 101, speaker: 'M', end: 684},
                  {index: 17, x: 674, y: 201, speaker: 'F', end: 783},
                  {index: 18, x: 783, y: 101, speaker: 'M', end: 827},
                  {index: 19, x: 821, y: 201, speaker: 'F', end: 913},
                  {index: 20, x: 906, y: 101, speaker: 'M', end: 949},
                  {index: 21, x: 923, y: 201, speaker: 'F', end: 1022},
                  {index: 22, x: 1022, y: 201, speaker: 'F', end: 1058},
                  {index: 23, x: 1066, y: 101, speaker: 'M', end: 1082},
                  {index: 24, x: 1082, y: 201, speaker: 'F', end: 1224},
                  {index: 25, x: 1093, y: 101, speaker: 'M', end: 1117},
                  {index: 26, x: 1212, y: 101, speaker: 'M', end: 1233},
                  {index: 27, x: 1224, y: 201, speaker: 'F', end: 1327},
                  {index: 28, x: 1241, y: 101, speaker: 'M', end: 1264},
                  {index: 29, x: 1265, y: 101, speaker: 'M', end: 1338},
                  {index: 30, x: 1346, y: 101, speaker: 'M', end: 1381},
                  {index: 31, x: 1379, y: 201, speaker: 'F', end: 1407},
                  {index: 32, x: 1409, y: 101, speaker: 'M', end: 1476},
                  ];
    //for (var i = 0; i < 16; i++) {
    //  var box = {index: i, x: i * 100 + 1, y: 201};
    //  boxes_.push(box);
    //}
    this.setState({boxes: boxes_});
    //this.audio.addEventListener('timeupdate', (event) => {
    //  console.log(this.audio.currentTime);
    //  this.setState({currentTime: this.audio.currentTime});
    //});
    this.timerId = setInterval(this.tickingTimer, 30);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
}


  togglePlay(){
    var that = this;
    if(that.state.isPlaying){
      that.audio.pause();
    }
    else{
      that.audio.play();
    }
    console.log(that.audio.currentTime);
    that.setState({isPlaying: !that.state.isPlaying});
  };

  tickingTimer() {
    var that = this;
    console.log(that.audio.currentTime);
    that.setState({currentTime: that.audio.currentTime});
  }

  render() {
    return (
      <Box>
      <Stage width={1600} height={350}>
        <Layer >
          
           <Rect
        x={0}
        y={0}
        width={1600}
        height={350}
        fill={'white'}
        shadowBlur={0}
      />
       {this.state.boxes.map((box, i) => (
              <Rect
                key={i}
                x={box.x}
                y={box.y}
                width={box.end-box.x}
                height={48}
                
                fill={box.speaker=='M'? 'blue': 'green'}
                shadowBlur={1}
              draggable
              onDragStart={() => {
              this.setState({
                isDragging: true
              });
            }}
            onDragEnd={e => {
              var boxes_ = this.state.boxes;
              console.log("x: ",e.target.x(), ",y: ", e.target.y());
              boxes_[i].y =  Math.round(e.target.y() / 50) * 50 + 1;
              this.setState({
                isDragging: false,
                boxes: boxes_
              });
            }}

             dragBoundFunc={ pos => {
            return {
                x : box.x,
                y : Math.round(pos.y / 50)*50 + 1
            }
        }}
              />
      ))}
       <Rect
                x={this.state.currentTime * 10}
                y={0}
                width={2}
                height={350}
                
                fill={'gray'}
                shadowBlur={1}
                draggable
      />


      {this.state.horizontalLines.map((line, i) => (
              <Line
                key={i}
                points={[0, line, 1600, line]}
                stroke={'grey'}
                strokeWidth={1}
                lineCap="round"
              />
      ))}

      {/*this.state.verticalLines.map((line, i) => (
              <Line
                key={i}
                points={[line, 0, line, 400]}
                stroke={'grey'}
                strokeWidth={1}
                lineCap="round"
              />
      ))*/}
      
        </Layer>
      </Stage>

      {this.state.isPlaying?<Pause color='brand' onClick={() => {this.togglePlay()}} />:<Play color='brand' onClick={() => {this.togglePlay()}} />}
      </Box>
    );
  }
}