import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line, Group, RegularPolygon } from 'react-konva';
import Konva from 'konva';
import { Box, Keyboard } from 'grommet';

export default class ComparisonArea extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      horizontalLines: [50, 100, 150, 200],
      verticalLines: [{x:150, time:"00:15"},
                      {x:300, time:"00:30"},
                      {x:450, time:"00:45"},
                      {x:600, time:"01:00"},
                      {x:750, time:"01:15"},
                      {x:900, time:"01:30"},
                      {x:1050, time:"01:45"},
                      {x:1200, time:"02:00"},
                      {x:1350, time:"02:15"},
                      {x:1500, time:"02:30"}],
      boxes: props.boxesPassed,
      boxesTimeOrder: props.boxesPassed,
      currentTime:0,
      audioPath: "static/assets/wavs/Ses01F_script01_2.wav",
      isPlaying: false,
      speaker: "Male",
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
      var boxes_ = JSON.parse(JSON.stringify(nextProps.boxesPassed));
        var boxes_top = boxes_.filter(box => box.speaker == nextProps.speaker[0]);
        var boxes_btm = boxes_.filter(box => box.speaker != nextProps.speaker[0]);
        var _boxes = boxes_btm.concat(boxes_top);
        this.setState({boxes: _boxes, boxesTimeOrder: nextProps.boxesPassed, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: []});
    }

    if(nextProps.speaker !== this.props.speaker){
      console.log(nextProps.speaker, this.props.speaker, this.state.speaker);
        this.setState({ speaker: nextProps.speaker }, function(){console.log(nextProps.speaker, this.props.speaker, this.state.speaker);});
        var boxes_ = JSON.parse(JSON.stringify(nextProps.boxesPassed));
        var boxes_top = boxes_.filter(box => box.speaker == nextProps.speaker[0]);
        var boxes_btm = boxes_.filter(box => box.speaker != nextProps.speaker[0]);
        var _boxes = boxes_btm.concat(boxes_top);
        console.log(_boxes);
        this.setState({boxes: _boxes, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: []});
        console.log(nextProps.speaker, this.props.speaker, this.state.speaker);
        this.audio.currentTime = 0;
    }

    if(nextProps.dimension !== this.props.dimension){
        console.log(nextProps.dimension, this.props.dimension, this.state.dimension);
        this.setState({ dimension: nextProps.dimension }, function(){console.log(nextProps.speaker, this.props.speaker, this.state.speaker);});
        var boxes_ = JSON.parse(JSON.stringify(nextProps.boxesPassed));
        var boxes_top = boxes_.filter(box => box.speaker == nextProps.speaker[0]);
        var boxes_btm = boxes_.filter(box => box.speaker != nextProps.speaker[0]);
        var _boxes = boxes_btm.concat(boxes_top);
        console.log(_boxes);
        this.setState({boxes: _boxes, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: []});
        console.log(nextProps.dimension, this.props.dimension, this.state.dimension);
        this.audio.currentTime = 0;
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
    }
}

  componentDidMount(){
    this.timerId = setInterval(this.tickingTimer, 30);
    var boxes_ = this.props.boxesPassed;
    var boxes_top = boxes_.filter(box => box.speaker == this.state.speaker[0]);
    var boxes_btm = boxes_.filter(box => box.speaker != this.state.speaker[0]);
    var _boxes = boxes_btm.concat(boxes_top);
    this.setState({speaker: this.props.speaker, dimension: this.props.dimension, boxes: _boxes, boxesTimeOrder: this.props.boxesPassed, currentSpeakerSentenceNumber: boxes_top.length, boxesHistory: [JSON.parse(JSON.stringify(_boxes))], operationBoxHistory: []});
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
      if ( that.state.currentTime * 10 >= boxes_[i].x && that.state.currentTime * 10 <= boxes_[i].end && that.state.speaker[0] == boxes_[i].speaker) {
        var operationBoxHistory_ = that.state.operationBoxHistory;
        operationBoxHistory_.push(i);
        that.setState({boxesHistory: boxesHistory_, operationBoxHistory: operationBoxHistory_}, function(){console.log(that.state.boxesHistory[that.state.boxesHistory.length -1 ])});

        if (boxes_[i].y < 50) {
          var horizontalLines_ = that.state.horizontalLines;
          horizontalLines_.push(horizontalLines_[horizontalLines_.length - 1] + 50);
          
          that.setState({canvasHeight: that.state.canvasHeight + 50, horizontalLines: horizontalLines_}, function(){that.props.updateScrollPosition(boxes_[i].y);});
          for (var j = 0; j < boxes_.length; j++) {
            if ( that.state.currentTime * 10 > boxes_[j].end && that.state.speaker[0] == boxes_[j].speaker) {
              boxes_[j].y += 50;
            }else if (that.state.speaker[0] != boxes_[j].speaker) {
              boxes_[j].y += 50;
            }
          }
        }else{
          that.props.updateScrollPosition(boxes_[i].y - 50);
          for (var j = 0; j < boxes_.length; j++) {
            if ( that.state.currentTime * 10 < boxes_[j].end && that.state.speaker[0] == boxes_[j].speaker) {
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
      if ( that.state.currentTime * 10 >= boxes_[i].x && that.state.currentTime * 10 <= boxes_[i].end && that.state.speaker[0] == boxes_[i].speaker) {
        var operationBoxHistory_ = that.state.operationBoxHistory;
        operationBoxHistory_.push(i);
        that.setState({boxesHistory: boxesHistory_, operationBoxHistory: operationBoxHistory_}, function(){console.log(that.state.boxesHistory[that.state.boxesHistory.length -1 ])});

        if (boxes_[i].y > that.state.canvasHeight - 50) {
          var horizontalLines_ = that.state.horizontalLines;
          horizontalLines_.push(horizontalLines_[horizontalLines_.length - 1] + 50);
          
          that.setState({canvasHeight: that.state.canvasHeight + 50, horizontalLines: horizontalLines_}, function(){that.props.updateScrollPosition(boxes_[i].y + 50);});
          for (var j = 0; j < boxes_.length; j++) {
            if ( that.state.currentTime * 10 < boxes_[j].end && that.state.speaker[0] == boxes_[j].speaker) {
              boxes_[j].y +=50;
            }
          }
        }else{
          that.props.updateScrollPosition(boxes_[i].y + 50);
          for (var j = 0; j < boxes_.length; j++) {
            if ( that.state.currentTime * 10 < boxes_[j].end && that.state.speaker[0] == boxes_[j].speaker) {
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
      if ( that.state.currentTime * 10 >= boxes_[i].x) {
        if (that.audio.currentTime * 10 - boxes_[i].x < 5) {
          that.props.updateScrollPosition(boxes_[i-1].y );
          that.audio.currentTime = boxes_[i - 1].x / 10;
        }else {
          that.props.updateScrollPosition(boxes_[i].y );
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
      if ( that.state.currentTime * 10 >= boxes_[i].x) {
        that.audio.currentTime = boxes_[i + 1].x / 10;
        that.props.updateScrollPosition(boxes_[i+1].y );
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
      {this.state.horizontalLines.map((line, i) => (
              <Line
                key={i}
                points={[0, line, 1600, line]}
                stroke={'grey'}
                strokeWidth={1}
                lineCap="round"
              />
      ))}

      {this.state.verticalLines.map((line, i) => (
              <Group x={line.x} y={0}>
              <Line
                key={i}
                points={[0, 0, 0, this.state.canvasHeight]}
                stroke={'grey'}
                strokeWidth={0.5}
                lineCap="round"
              />
               <Text
                x={1}
                y={this.state.canvasHeight-13}
                width={60}
                height={13}
                fontSize={12}
                text={line.time}
                fill='grey'
                strokeWidth={0.5}
              />
              </Group>
      ))}

      
      {this.state.boxes.map((box, i) => (

              <Rect
                x={box.x}
                y={0}
                width={box.end-box.x}
                height={this.state.canvasHeight}
                fill={(box.speaker == this.state.speaker[0] && (this.state.dimension == "Arousal"? box.highlightA:box.highlightP))?'#F8FF9580' : '#F8FF9500'}
              />

      ))}

      {this.state.boxes.map((box, i) => (

            <Group x={box.x} y={box.y}>
              <Rect
                x={0}
                y={0}
                width={box.end-box.x}
                height={48}
                fill={box.speaker=='M'? (this.state.speaker == "Male"? this.props.maleColor : '#CCCCCC'):(this.state.speaker == "Female"? this.props.femaleColor : '#CCCCCC')}
                shadowBlur={box.speaker==this.state.speaker[0]?1:0}
                cornerRadius={[3, 3, 3, 3]}
              />
              <Text
                x={1}
                y={18}
                width={29}
                height={15}
                fontSize={14}
                text={box.indexS + 1}
                fill='white'
                strokeWidth={1}
                align="start"
                visible={box.speaker == this.state.speaker[0]}
              />
         </Group>

      ))}

     

       <Rect
          x={this.state.currentTime * 10}
          y={0}
          width={2}
          height={this.state.canvasHeight}      
          fill={'#9A0680'}
      />

       {this.state.isPlaying?<RegularPolygon
        x={this.state.currentTime * 10 + 10}
        y={this.props.scrollTop + 250 - 10}
        sides={3}
        radius={10}
        scaleY={1.0}
        fill={'green'}
        rotation={90} />:<Rect
        x={this.state.currentTime * 10 + 5}
        y={this.props.scrollTop + 250 - 17}
        width={15}
        height={15}
        fill={'red'}  />}

        </Layer>

      </Stage>

      
      </Box>
      </Keyboard>
    );
  }
}