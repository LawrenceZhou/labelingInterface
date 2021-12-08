import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
import Konva from 'konva';
import { Box, Keyboard } from 'grommet';

export default class ComparisonArea extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      horizontalLines: [50, 100, 150, 200, 250, 300, 350],
      verticalLines: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500],
      boxes: props.boxesPassed,
      currentTime:0,
      audioPath: "static/assets/wavs/Ses01F_script01_2.wav",
      isPlaying: false,
      speaker: "Female",
      dimension: "Arousal",
    };

    this.audio = new Audio(this.state.audioPath);
    this.tickingTimer = this.tickingTimer.bind(this);
    this.handleKeyUpPressed = this.handleKeyUpPressed.bind(this);
    this.handleKeyDownPressed = this.handleKeyDownPressed.bind(this);
    this.handleKeyLeftPressed = this.handleKeyLeftPressed.bind(this);
    this.handleKeyRightPressed = this.handleKeyRightPressed.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.boxesPassed !== this.props.boxesPassed){
      var boxes_ = nextProps.boxesPassed;
        var boxes_top = boxes_.filter(box => box.speaker == nextProps.speaker[0]);
        var boxes_btm = boxes_.filter(box => box.speaker != nextProps.speaker[0]);
        var _boxes = boxes_btm.concat(boxes_top);
        this.setState({boxes: _boxes});
    }

    if(nextProps.speaker !== this.props.speaker){
        this.setState({ speaker: nextProps.speaker });
        var boxes_ = this.state.boxes;
        var boxes_top = boxes_.filter(box => box.speaker == nextProps.speaker[0]);
        var boxes_btm = boxes_.filter(box => box.speaker != nextProps.speaker[0]);
        var _boxes = boxes_btm.concat(boxes_top);
        this.setState({boxes: _boxes});
    }

    if(nextProps.dimension !== this.props.dimension){
        this.setState({ dimension: nextProps.dimension });
    }

    if(nextProps.isPlaying !== this.state.isPlaying){
      console.log(nextProps.isPlaying, this.state.isPlaying);
      if(nextProps.isPlaying){
        this.audio.play();
      }
      else{
        this.audio.pause();
      }
      this.setState({ isPlaying: nextProps.isPlaying });
    }
}

  componentDidMount(){
    this.timerId = setInterval(this.tickingTimer, 30);
    var boxes_ = this.props.boxesPassed;
    var boxes_top = boxes_.filter(box => box.speaker == this.state.speaker[0]);
    var boxes_btm = boxes_.filter(box => box.speaker != this.state.speaker[0]);
    var _boxes = boxes_btm.concat(boxes_top);
    this.setState({boxes: _boxes});
    console.log(this.state.boxes);
    console.log(this.props.boxesPassed);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
}

  tickingTimer() {
    var that = this;
    that.setState({currentTime: that.audio.currentTime});
    that.props.getCurrentTime(that.audio.currentTime);
  }

  handleKeyUpPressed() {
    console.log("up pressed.");
    var that = this;
    var boxes_ = that.state.boxes;

    for (var i = 0; i < boxes_.length; i++) {
      if ( this.state.currentTime * 10 > boxes_[i].x && this.state.currentTime * 10 <= boxes_[i].end && this.state.speaker[0] == boxes_[i].speaker) {
        boxes_[i].y -= 50;
        break;
      }
    }

    that.setState({boxes: boxes_});

  }

  handleKeyDownPressed() {
    console.log("down pressed.");
    var that = this;
    var boxes_ = that.state.boxes;

    for (var i = 0; i < boxes_.length; i++) {
      if ( this.state.currentTime * 10 > boxes_[i].x && this.state.currentTime * 10 <= boxes_[i].end && this.state.speaker[0] == boxes_[i].speaker) {
        boxes_[i].y += 50;
        break;
      }
    }

    that.setState({boxes: boxes_});
  }

  handleKeyLeftPressed() {
    console.log("left pressed.");
    var that = this;
    var boxes_ = that.state.boxes;
    for (var i = boxes_.length - 1; i >= 0; i -- ) {
      if ( this.state.currentTime * 10 > boxes_[i].x && this.state.currentTime * 10 <= boxes_[i].end && this.state.speaker[0] == boxes_[i].speaker) {
        if (that.audio.currentTime * 10 - boxes_[i].x < 5 && i != 0 && boxes_[i - 1].speaker == boxes_[i].speaker) {
          that.audio.currentTime = boxes_[i - 1].x / 10;
        }else {
          that.audio.currentTime = boxes_[i].x / 10;
        }
        
        break;
      }
    }
  }

  handleKeyRightPressed() {
    console.log("right pressed.");
    var that = this;
    var boxes_ = that.state.boxes;
    for (var i = boxes_.length - 1; i >= 0; i -- ) {
      if ( this.state.currentTime * 10 > boxes_[i].x && this.state.currentTime * 10 <= boxes_[i].end && this.state.speaker[0] == boxes_[i].speaker && i != boxes_.length - 1) {
        that.audio.currentTime = boxes_[i + 1].x / 10;
        break;
      }
    }
  }

  render() {
    return (
      <Keyboard target='document' onUp={()=>{this.handleKeyUpPressed()}} onDown={()=>{this.handleKeyDownPressed()}} onLeft={()=>{this.handleKeyLeftPressed()}} onRight={()=>{this.handleKeyRightPressed()}}>
      <Box>
      <Stage width={1600} height={350} >
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
                
                fill={box.speaker=='M'? (this.state.speaker == "Male"? 'blue' : 'gray'):(this.state.speaker == "Female"? 'green' : 'gray')}
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

      
      </Box>
      </Keyboard>
    );
  }
}