import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
//import sketch from '../selectedCandidates';
import sketch from '../candidates';
import sketchManual from '../musicManual';
import piano from '../piano';
import playLogo from '../../assets/play.png';
import stopLogo from '../../assets/stop.png';
import { Play, Stop} from 'grommet-icons'; 
import Slider from 'rc-slider';
const Range = Slider.Range;
import '!style-loader!css-loader!rc-slider/assets/index.css';
import {Box, Button, Heading} from 'grommet'; 

export default class Synthesis extends Component {
  constructor(props) {
      super(props);
      this.state ={
        percent: 0.0,
        synthesisResult: {cid: null, notes:[], isSelected:false, isPlaying:false},
        candidates: this.props.selectedCandidates,
        playResult: false,
        startSteps: {},
        endSteps: {},
        percents: {},
        resultStartStep: 0,
        resultEndStep: 0,
        seed: this.props.seed,
        lastResult: this.props.lastResult,
        genPlay:this.props.genPlay,
      }

      this.synthesizeCandidates = this.synthesizeCandidates.bind(this);
      this.playResult = this.playResult.bind(this);
      this.updateResult = this.updateResult.bind(this);
      this.regionSelect = this.regionSelect.bind(this);
      this.regionSelectResult = this.regionSelectResult.bind(this);
      this.changePercent = this.changePercent.bind(this);
      this.finish = this.finish.bind(this);
      this.undo = this.undo.bind(this);
      this.refreshToneState = this.refreshToneState.bind(this);

   }
  updateResult(noteSeq){
    var that = this;
    that.setState({ synthesisResult : {cid: that.state.synthesisResult.cid, notes: noteSeq, isSelected: that.state.synthesisResult.isSelected, isPlaying: that.state.synthesisResult.isPlaying} });

  }

   componentDidUpdate(prevProps){
    var that = this;
    if(prevProps.selectedCandidates !== that.props.selectedCandidates){
        if(that.props.selectedCandidates.length > 0 && that.props.selectedCandidates[0] !== null){
    that.setState({ candidates : that.props.selectedCandidates}, function() {
    that.setState({ synthesisResult : JSON.parse(JSON.stringify(this.state.candidates[0]))});
      });

    }
    }
    if (that.props.genPlay==true && that.state.synthesisResult != null && that.state.synthesisResult.isPlaying) {

    var tempResult = that.state.synthesisResult;
    tempResult.isPlaying = false;
    that.setState({ synthesisResult : tempResult });
  }
}


  regionSelect(cid, values){
   var that = this;
   console.log("regionSelect!!! ", values);
   var tempStartSteps = that.state.startSteps;
   var tempEndSteps = that.state.endSteps;
   tempStartSteps[cid] = parseInt(values[0] * 32 / 100);
   tempEndSteps[cid] = parseInt(values[1] * 32 / 100);
   that.setState({startSteps: tempStartSteps });
   that.setState({endSteps: tempEndSteps });
  }

  regionSelectResult(values){
   var that = this;
   console.log("regionSelectResult!!! ", values);
   that.setState({resultStartStep: parseInt(values[0] * 32 / 100) });
   that.setState({resultEndStep: parseInt(values[1] * 32 / 100) } );
  }

  refreshToneState(toStart) {
    if (toStart){
      if(Tone.Transport.state === 'started') {
        Tone.Transport.stop();
        Tone.Transport.start();
        return;
      } else {
        Tone.Transport.start();
      }
    }
    else{
      if(Tone.Transport.state === 'started') {
        Tone.Transport.stop();
      } else {
        return;
      }
    }
  }


  changePercent(cid, percent){
    var that = this;
    var tempPercents = that.state.percents;
    tempPercents[cid] = percent;
    that.setState({percents: tempPercents});
    console.log(that.state.percents);
    that.synthesizeCandidates();
  }

  componentDidMount(){
   
    var tempStartSteps = this.state.startSteps;
    var tempEndSteps = this.state.endSteps;
    var tempPercents = this.state.percents;
    console.log("synthesis");
    for (var i = 0; i < this.state.candidates.length; i++){
      tempStartSteps[this.props.selectedCandidates[i].cid] = -1;
      tempEndSteps[this.props.selectedCandidates[i].cid] = -1;
      tempPercents[this.props.selectedCandidates[i].cid] = 0;
    }
    this.setState({startSteps: tempStartSteps });
    this.setState({endSteps: tempEndSteps });
    this.setState({percents: tempPercents });
    if(this.state.candidates.length > 1){
      this.synthesizeCandidates();
    }else if(this.state.candidates.length == 1){
      this.setState({synthesisResult: JSON.parse(JSON.stringify(this.state.candidates[0]))});
    }
  }

   playResult(){
      var that = this;
      var tempResult = that.state.synthesisResult;

      if(tempResult.isPlaying){
        that.refreshToneState(false);
        this.props.updatePlayStatus(false);
      }else {
        that.refreshToneState(true);
        this.props.updatePlayStatus(true);
      }
     tempResult.isPlaying = !tempResult.isPlaying;
     //that.setState({ synthesisResult : tempResult });
   }



   synthesizeCandidates() {
      var that = this;
      var http = new XMLHttpRequest();
      var url = 'http://127.0.0.1:5000/interpolate';
      console.log(that.state.startSteps, that.state.endSteps);
      
      http.open('POST', url, true);

      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/json');

      http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {

            var obj = JSON.parse(http.responseText);
            console.log(obj);

            that.setState({ synthesisResult : {cid: obj.result.cid, notes: obj.result.notes_info.notes, isSelected: false, isPlaying: that.state.synthesisResult.isPlaying}});

            console.log(obj);
            console.log(that.state.synthesisResult);
        }
      }
      var tempCids=[];
      var tempPercents=[];
      var tempStartSteps=[];
      var tempEndSteps=[];
      for(var i = 0; i < that.state.candidates.length; i++){
        tempCids.push(that.state.candidates[i].cid);
      }
      for(var i = 0; i < tempCids.length; i++){
        tempPercents.push(that.state.percents[tempCids[i]]);
        tempStartSteps.push(that.state.startSteps[tempCids[i]]);
        tempEndSteps.push(that.state.endSteps[tempCids[i]]);
      } 
      http.send(JSON.stringify({cids:tempCids , percents:tempPercents , cstarts: tempStartSteps, cends: tempEndSteps}));
   }

   finish(){
    var that = this;
      that.props.completeCallback(that.state.synthesisResult);
      that.props.closeCallback();
   }

    undo(){
    var that = this;
    console.log("last?", that.props.lastResult)
      that.setState({synthesisResult: that.props.lastResult[that.props.lastResult.length - 1]});
   }

  render() {
    return (
      <div className='synthesis'>
        <div class="resultContainer"  style={{"zIndex": 1, "position":"relative"}}>
          <div>
            <div style={{ height: "390px", display: "inline-block"}} >
              <P5Wrapper id="piano" sketch={piano} ></P5Wrapper>
            </div>
            <div style={{display: "inline-block", boxShadow: "8px 0px 7px 0px rgba(0,0,0,0.4)"}}>
              <P5Wrapper candidate={this.state.synthesisResult}  updateResult={this.updateResult} menotroneOn = { this.props.menotroneOn} sketch={sketchManual} ></P5Wrapper>
            </div> 
          </div>  
          {this.state.synthesisResult.isPlaying?<Stop style={{width: 26, height: 26, margin: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playResult() }} alt="playButton"/>
                              :<Play style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playResult() }} alt="playButton"/>}
        </div>
        <div style={{"marginLeft": "auto", "marginRight": "auto", "display":"block"}}>
         {this.props.search_type=="ucb" ? <div width style={{ "width": "30%", "height" : "30px", "marginTop":"10px", "marginLeft":"auto", "marginRight":"auto"}}>
        <Slider dots step={20} defaultValue={this.props.EorR}
                trackStyle={{ backgroundColor: '#c4edc4'}}
                railStyle={{ backgroundColor: '#c4c4ed'}} 
                marks={{ 0: <Box><Heading level={4} margin="none" color="#181818">Exploitation</Heading></Box>, 100: <Box><Heading level={4} margin="none" color="#181818">Exploration</Heading></Box> }}
                onAfterChange={this.props.onAfterChangeSearching}/>
        </div>:null}
        {this.props.search_type!="rnd"?<Button style = {{margin:5}} onClick={() => {this.props.updateCandidatesBO(this.state.synthesisResult, this.state.resultStartStep, this.state.resultEndStep)}} label={<Box><Heading level={4} margin="none">Next Iteration</Heading></Box>} />:null}        
        </div>
        <Button style = {{margin:5}} onClick={() => {this.undo()}} label={<Box><Heading level={4} margin="none">Back</Heading></Box>} />
        <Button style = {{margin:5}} onClick={() => {this.finish()}} label={<Box><Heading level={4} margin="none">Finish</Heading></Box>} />
        <Button style = {{margin:5}} label={<Box><Heading level={4} margin="none">Cancel</Heading></Box>} onClick={this.props.closeCallback}/ >

      </div>
    );
  }
}