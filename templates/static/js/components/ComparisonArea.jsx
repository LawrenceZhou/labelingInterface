import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva';
import Konva from 'konva';
import { Box, Keyboard } from 'grommet';

export default class ComparisonArea extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      horizontalLines: [50, 100, 150, 200],
      verticalLines: [150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1600],
      boxes: props.boxesPassed,
      boxesTimeOrder: props.boxesPassed,
      currentTime:0,
      audioPath: "static/assets/wavs/Ses01F_script01_2.wav",
      isPlaying: false,
      speaker: "Female",
      dimension: "Arousal",
      canvasHeight: 250,
      currentSpeakerSentenceNumber: 0,
      boxesHistory: [],
      operationBoxHistory: [],
    };

    this.audio = new Audio(this.state.audioPath);
    this.tickingTimer = this.tickingTimer.bind(this);
    this.handleKeyEscPressed = this.handleKeyEscPressed.bind(this);
    this.handleKeySpacePressed = this.handleKeySpacePressed.bind(this);
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
        this.setState({boxes: _boxes, boxesTimeOrder: nextProps.boxesPassed, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: [boxes_]});
    }

    if(nextProps.speaker !== this.props.speaker){
        this.setState({ speaker: nextProps.speaker });
        var boxes_ = this.state.boxes;
        var boxes_top = boxes_.filter(box => box.speaker == nextProps.speaker[0]);
        var boxes_btm = boxes_.filter(box => box.speaker != nextProps.speaker[0]);
        var _boxes = boxes_btm.concat(boxes_top);
        this.setState({boxes: _boxes, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: [boxes_]});
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

    if(nextProps.reset){
      this.setState({boxes: JSON.parse(JSON.stringify(this.state.boxesHistory[0])), boxesHistory: [JSON.parse(JSON.stringify(this.state.boxesHistory[0]))], operationBoxHistory: []});
      this.audio.currentTime = 0;
      this.props.finishReset();
    }
}

  componentDidMount(){
    this.timerId = setInterval(this.tickingTimer, 30);
    var boxes_ = this.props.boxesPassed;
    var boxes_top = boxes_.filter(box => box.speaker == this.state.speaker[0]);
    var boxes_btm = boxes_.filter(box => box.speaker != this.state.speaker[0]);
    var _boxes = boxes_btm.concat(boxes_top);
    this.setState({boxes: _boxes, boxesTimeOrder: this.props.boxesPassed, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: []});
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


  handleKeyEscPressed(){
    var that = this;
    
    var boxesHistory_  = that.state.boxesHistory;
    var operationBoxHistory_  = that.state.operationBoxHistory;

    if(boxesHistory_.length == 1){
      that.setState({boxes: JSON.parse(JSON.stringify(boxesHistory_[0]))});
    }else{
      that.props.stopPlay();
      var boxesState = boxesHistory_.pop();
      var lastIndex = operationBoxHistory_.pop();

      console.log(boxesState, lastIndex);
      that.setState({boxes: boxesState, boxesHistory: boxesHistory_, operationBoxHistory: operationBoxHistory_});
      that.audio.currentTime = boxesState[lastIndex].x / 10;
    }
    
  }


  handleKeySpacePressed(){
    var that = this;
    that.props.togglePlay();
  }


  handleKeyUpPressed() {
    console.log("up pressed.");
    var that = this;
    var boxes_ = that.state.boxes;
    var boxes__ = JSON.parse(JSON.stringify(that.state.boxes));
    var boxesHistory_ = that.state.boxesHistory;
    boxesHistory_.push(boxes__);
    //original
    for (var i = 0; i < boxes_.length; i++) {
      if ( this.state.currentTime * 10 >= boxes_[i].x && this.state.currentTime * 10 <= boxes_[i].end && this.state.speaker[0] == boxes_[i].speaker) {
        var operationBoxHistory_ = that.state.operationBoxHistory;
        operationBoxHistory_.push(i);
        that.setState({boxesHistory: boxesHistory_, operationBoxHistory: operationBoxHistory_}, function(){console.log(that.state.boxesHistory[that.state.boxesHistory.length -1 ])});

        if (boxes_[i].y < 50) {
          var horizontalLines_ = that.state.horizontalLines;
          horizontalLines_.push(horizontalLines_[horizontalLines_.length - 1] + 50);
          
          that.setState({canvasHeight: that.state.canvasHeight + 50, horizontalLines: horizontalLines_}, function(){that.props.updateScrollPosition(boxes_[i].y);});
          for (var j = 0; j < boxes_.length; j++) {
            if ( this.state.currentTime * 10 > boxes_[j].end && this.state.speaker[0] == boxes_[j].speaker) {
              boxes_[j].y += 50;
            }else if (this.state.speaker[0] != boxes_[j].speaker) {
              boxes_[j].y += 50;
            }
          }
        }else{
          that.props.updateScrollPosition(boxes_[i].y - 50);
          for (var j = 0; j < boxes_.length; j++) {
            if ( this.state.currentTime * 10 < boxes_[j].end && this.state.speaker[0] == boxes_[j].speaker) {
              boxes_[j].y -= 50;
            }
          }
        }
        break;
      }
    }

    that.setState({boxes: boxes_});

  }


  handleKeyDownPressed() {
    console.log("down pressed.");
    var that = this;
    var boxes_ = that.state.boxes;
    var boxes__ = JSON.parse(JSON.stringify(that.state.boxes));
    var boxesHistory_ = that.state.boxesHistory;
    boxesHistory_.push(boxes__);

    for (var i = 0; i < boxes_.length; i++) {
      if ( this.state.currentTime * 10 >= boxes_[i].x && this.state.currentTime * 10 <= boxes_[i].end && this.state.speaker[0] == boxes_[i].speaker) {
        var operationBoxHistory_ = that.state.operationBoxHistory;
        operationBoxHistory_.push(i);
        that.setState({boxesHistory: boxesHistory_, operationBoxHistory: operationBoxHistory_}, function(){console.log(that.state.boxesHistory[that.state.boxesHistory.length -1 ])});

        if (boxes_[i].y > that.state.canvasHeight - 50) {
          var horizontalLines_ = that.state.horizontalLines;
          horizontalLines_.push(horizontalLines_[horizontalLines_.length - 1] + 50);
          
          that.setState({canvasHeight: that.state.canvasHeight + 50, horizontalLines: horizontalLines_}, function(){that.props.updateScrollPosition(boxes_[i].y + 50);});
          for (var j = 0; j < boxes_.length; j++) {
            if ( this.state.currentTime * 10 < boxes_[j].end && this.state.speaker[0] == boxes_[j].speaker) {
              boxes_[j].y +=50;
            }
          }
        }else{
          that.props.updateScrollPosition(boxes_[i].y + 50);
          for (var j = 0; j < boxes_.length; j++) {
            if ( this.state.currentTime * 10 < boxes_[j].end && this.state.speaker[0] == boxes_[j].speaker) {
              boxes_[j].y +=50;
            }
          }
        }
        break;
      }
    }

    that.setState({boxes: boxes_});
  }


  handleKeyLeftPressed() {
    console.log("left pressed.");
    var that = this;
    var boxes_ = that.state.boxes;

    for (var i = boxes_.length - 1; i > boxes_.length - that.state.currentSpeakerSentenceNumber; i -- ) {
      if ( this.state.currentTime * 10 >= boxes_[i].x) {
        if (that.audio.currentTime * 10 - boxes_[i].x < 5) {
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

    if (that.audio.currentTime * 10 < that.state.boxesTimeOrder[0].x) {
      that.audio.currentTime = that.state.boxesTimeOrder[0].x / 10;
      return;
    }else if (that.audio.currentTime * 10 < boxes_[boxes_.length - that.state.currentSpeakerSentenceNumber].x) {
      that.audio.currentTime = boxes_[boxes_.length - that.state.currentSpeakerSentenceNumber].x / 10;
      return;
    }

    for (var i = boxes_.length - 2; i >= boxes_.length - that.state.currentSpeakerSentenceNumber; i --) {
      if ( this.state.currentTime * 10 >= boxes_[i].x) {
        that.audio.currentTime = boxes_[i + 1].x / 10;
        break;
      }
    }
  }


  render() {
    return (
      <Keyboard target='document' onEsc={()=>{this.handleKeyEscPressed()}} onSpace={()=>{this.handleKeySpacePressed()}} onUp={()=>{this.handleKeyUpPressed()}} onDown={()=>{this.handleKeyDownPressed()}} onLeft={()=>{this.handleKeyLeftPressed()}} onRight={()=>{this.handleKeyRightPressed()}}>
      <Box>
      <Stage width={1600} height={this.state.canvasHeight} >
        <Layer >
          
           <Rect
        x={0}
        y={0}
        width={1600}
        height={this.state.canvasHeight}
        fill={'white'}
        shadowBlur={0}
      />
       {this.state.boxes.map((box, i) => (

            <Group x={box.x} y={box.y}>
              <Rect
                x={0}
                y={0}
                width={box.end-box.x}
                height={48}
                fill={box.speaker=='M'? (this.state.speaker == "Male"? 'blue' : 'gray'):(this.state.speaker == "Female"? 'green' : 'gray')}
                shadowBlur={1}
              />
              <Text
                width={25}
                height={13}
                fontSize={12}
                text={box.index + 1}
                stroke='white'
                strokeWidth={1}
                align="center"
              />
         </Group>

           
      ))}

       <Rect
          x={this.state.currentTime * 10}
          y={0}
          width={2}
          height={this.state.canvasHeight}      
          fill={'gray'}
          shadowBlur={1}
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