import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../candidates';
import playLogo from '../../assets/play.png';
import stopLogo from '../../assets/stop.png';
import Synthesis from './Synthesis';
import { ClapSpinner } from "react-spinners-kit";
import Slider from 'rc-slider';
import '!style-loader!css-loader!rc-slider/assets/index.css';
import {Box, Button, Heading, CheckBox} from 'grommet'; 
import { Play, Stop, Checkmark } from 'grommet-icons'; 
import Scrollbars from "react-custom-scrollbars";
export default class Generation extends Component {
  constructor(props) {
      super(props);
      this.state ={
        showCandidates: false,
        showSynthesis: true,
        candidates : [],
        selectedCandidates : [],
        search_type : this.props.search_type,
        num_iterations: 0,
        seed: props.seed,
        gotResult: false,
        gotBOResult: false,
        EorR: 60,
        ER: 5.0,
        lastResult: [props.seed],
        isCurrentPlay:false,
        sResultPlay:false,
      }

      this.generateCandidates = this.generateCandidates.bind(this);
      this.selectCandidate = this.selectCandidate.bind(this);
      this.playCandidate = this.playCandidate.bind(this);
      this.playSeed = this.playSeed.bind(this);
      this.playLastResult = this.playLastResult.bind(this);
      this.toggleSynthesis = this.toggleSynthesis.bind(this);
      this.closeSynthesis = this.closeSynthesis.bind(this);
      this.updateCandidatesBOSearch = this.updateCandidatesBOSearch.bind(this);
      this.updateSynPlayStatus = this.updateSynPlayStatus.bind(this);
      this.refreshToneState = this.refreshToneState.bind(this);
      this.onAfterChangeSearching = this.onAfterChangeSearching.bind(this);
   }
   componentDidMount(){
    var that = this;
    var http = new XMLHttpRequest();
    var url = 'http://127.0.0.1:5000/initiate';

    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log("Generator initiated!");
            that.generateCandidates();      
        }
    }
    http.send();
   }

   guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  toggleSynthesis(){
    var that = this;

      if(that.state.seed.isSelected){
        var tempSelectedCandidates = that.state.selectedCandidates;
        tempSelectedCandidates.push(that.state.seed);
        that.setState({selectedCandidates:tempSelectedCandidates});
      }
      if(that.state.lastResult.length != 0 && that.state.lastResult[-1].isSelected){
        var tempSelectedCandidates = that.state.selectedCandidates;
        tempSelectedCandidates.push(that.state.seed);
        that.setState({selectedCandidates:tempSelectedCandidates});
      }
      that.setState({
        showSynthesis: true
      });
    //}
     

  }


  updateSynPlayStatus(synPlay){
    var that = this;
    that.setState({sResultPlay: synPlay});

    if(synPlay){
      var tempSeed = that.state.seed;
      tempSeed.isPlaying = false;
      that.setState({ seed : tempSeed });

      var tempLastResult = that.state.lastResult;
      tempLastResult.forEach(function(result, i) {
        result.isPlaying= false;
      });
      that.setState({ lastResult : tempLastResult });

      var tempCandidates = that.state.candidates;
      tempCandidates.forEach(function(candidate, i) {
        candidate.isPlaying = false;   
      });

      that.setState({ candidates : tempCandidates });
      that.setState({ isCurrentPlay : false });

    }
  
  }


  onAfterChangeSearching(value){
    var that = this;
    var ER = 0;
    switch (value) {
      case 0:
        ER = 0.0;
        break;
      case 20:
        ER = 0.1;
        break;
      case 40:
        ER = 0.2;
        break;
      case 60:
        ER = 0.4;
        break;
      case 80:
        ER = 0.8;
        break;
      case 100:
        ER = 1.6;
        break;
    
    }
    that.setState({EorR: value});
    that.setState({ER: ER});
    console.log("Searching!!!!!! ", that.state.EorR);
  }

  closeSynthesis(){
     this.setState({
      showSynthesis: false
    });
  }

  selectCandidate(cid) {
    var that = this;
    var isSeedSelected = false;
    var isLRSelected = false;
    var tempCandidates = that.state.candidates;
    tempCandidates.forEach(function(candidate, i) {
        if(candidate.cid == cid){

          candidate.isSelected = !candidate.isSelected;
            
          //return;
        }
        if(candidate.cid != cid && candidate.isSelected){
          candidate.isSelected = false;
        }
    });

    that.setState({ candidates : tempCandidates });


    //seed
    if(that.state.seed != null && that.state.seed.cid == cid){
    that.setState({ seed : {cid:that.state.seed.cid, notes:that.state.seed.notes, isSelected:!that.state.seed.isSelected, isPlaying:that.state.seed.isPlaying, isLastBest:false} });
    }else if(that.state.seed != null && that.state.seed.isSelected){
      that.setState({ seed : {cid:that.state.seed.cid, notes:that.state.seed.notes, isSelected:!that.state.seed.isSelected, isPlaying:that.state.seed.isPlaying, isLastBest:false} });
    }
    //last result
    var tempLastResult = that.state.lastResult;
    tempLastResult.forEach(function(result, i) {
        if(result != null && result.cid == cid){

        result.isSelected = !result.isSelected;
            
          //return;
      }
        if(result != null && result.cid != cid && result.isSelected){
          result.isSelected = false;
        }
    });


    that.setState({ lastResult : tempLastResult });


     var alreadySelected = false;
     var tempSelectedCandidates = that.state.selectedCandidates;
     tempSelectedCandidates.forEach(function(selectCandidate, i) {
        if (selectCandidate != null && selectCandidate.cid == cid){
          //tempSelectedCandidates.splice(i, 1);
          alreadySelected = true;
          return;
        }
    });

    if (!alreadySelected){
      if (that.state.seed != null && cid == that.state.seed.cid){
        tempSelectedCandidates = [];
        
        tempSelectedCandidates.push(that.state.seed);     
      }else if(that.state.lastResult.length != 0 && that.state.lastResult[-1] != null && that.state.lastResult.filter(result => cid == result.cid).length > 0){
        tempSelectedCandidates = [];
        
        tempSelectedCandidates.push(that.state.lastResult.filter(result => cid == result.cid)[0]);  
      }else{
        tempSelectedCandidates = [];

        tempSelectedCandidates.push(that.state.candidates.filter(candidate => cid == candidate.cid)[0]);     
      }    
    }else{
      tempSelectedCandidates = [];
    }
    that.setState({ selectedCandidates : tempSelectedCandidates });

    console.log(that.state.candidates);
    console.log(that.state.selectedCandidates);

  }


  playCandidate(cid) {
    var that = this;

    if(that.state.seed != null){
      var tempSeed = that.state.seed;
      tempSeed.isPlaying = false;
      that.setState({ seed : tempSeed });
    }
    

    var tempLastResult = that.state.lastResult;
    tempLastResult.forEach(function(result, i) {
      if(result != null && result.isPlaying){
        result.isPlaying= false;
      }
    });
    that.setState({ lastResult : tempLastResult });

    var tempCandidates = that.state.candidates;
    tempCandidates.forEach(function(candidate, i) {
      if(candidate.cid == cid){
        if(candidate.isPlaying){
          that.refreshToneState(false);
          that.setState({isCurrentPlay: false});
        }else {
          that.refreshToneState(true);
          that.setState({isCurrentPlay: true});
        }
        candidate.isPlaying = !candidate.isPlaying;
      }else
      {
        candidate.isPlaying = false;
      }
      
    });
    that.setState({ candidates : tempCandidates });
  }


  playSeed() {
    var that = this;
    var tempCandidates = that.state.candidates;
    tempCandidates.forEach(function(candidate, i) {
      candidate.isPlaying= false;
    });
    that.setState({ candidates : tempCandidates });

    var tempLastResult = that.state.lastResult;
    tempLastResult.forEach(function(result, i) {
        result.isPlaying= false;
    });
    that.setState({ lastResult : tempLastResult });

     var tempSeed = that.state.seed;
     if(tempSeed.isPlaying){
            that.refreshToneState(false);
            that.setState({isCurrentPlay: false});
          }else {
            that.refreshToneState(true);
            that.setState({isCurrentPlay: true});
          }
     tempSeed.isPlaying = !tempSeed.isPlaying;
     that.setState({ seed : tempSeed });
  }


    playLastResult(rid) {
      var that = this;
      var tempCandidates = that.state.candidates;
      tempCandidates.forEach(function(candidate, i) {
        candidate.isPlaying= false;
      });
      that.setState({ candidates : tempCandidates });

    var tempSeed = that.state.seed;
    tempSeed.isPlaying = false;
    that.setState({ seed : tempSeed });

    var tempLastResult = that.state.lastResult;

    tempLastResult.forEach(function(result, i) {
      if(result.cid == rid){
        if(result.isPlaying){
            that.refreshToneState(false);
            that.setState({isCurrentPlay: false});
          }else {
            that.refreshToneState(true);
            that.setState({isCurrentPlay: true});
          }
        result.isPlaying = !result.isPlaying;  
      }else{
        result.isPlaying = false;
      }
    });


     that.setState({ lastResult : tempLastResult });
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


   generateCandidates() {
      var that = this;
      var http = new XMLHttpRequest();
      var url = 'http://127.0.0.1:5000/sample';
      var s_type = 'rnd';
      if(that.props.seed != null && that.props.seed.notes.length != 0){
        s_type = 'seed';
      }
      http.open('POST', url, true);
      that.setState({ gotResult : false });
      var already_selected_number = that.state.selectedCandidates.length;
      var select_ids = [];

      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/json');

      console.log("selected Candidates, ", that.state.selectedCandidates);
      Object.keys(that.state.selectedCandidates).forEach(e => {
        if(that.state.selectedCandidates[e]!=null){
          select_ids.push(that.state.selectedCandidates[e].cid);
        }
      });
      http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
            var obj = JSON.parse(http.responseText);
            var tempCandidates = [];

            that.setState({selectedCandidates:[that.state.seed]});


            Object.keys(obj.candidates).forEach(e => {
              var c = obj.candidates[e];
              console.log(e, c);
              var id = c.cid;
              var isSelected = false; 
              var isPlaying = false; 
              if(e == 0 && that.state.seed != null){
                that.setState({seed:{cid:id, notes:c.notes_info.notes, isSelected:isSelected, isPlaying:isPlaying, isLastBest:false}});
              }else{
              tempCandidates.push({cid: id, notes: c.notes_info.notes, isSelected: isSelected, isPlaying:isPlaying, isLastBest: false});
              }
            });
            that.setState({ candidates : tempCandidates });
            that.setState({ showCandidates : true });
            that.setState({ gotResult : true });
            console.log(that.state.candidates);
            console.log(obj.candidates);
        }
      }
      console.log(that.props.seed);
      var seed = that.props.seed;
      http.send(JSON.stringify({seed, seed_type:s_type, search_type:that.state.search_type, search_num: 8 - already_selected_number, selected_ids:select_ids, EorR: that.state.ER}));
   }

   updateCandidatesBOSearch(lastBest, startStep, endStep){
      var that = this;
      var http = new XMLHttpRequest();
      var url = 'http://127.0.0.1:5000/update';
      http.open('POST', url, true);

      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/json');
      that.setState({ gotResult : false });
      that.setState({ showSynthesis : true });

      http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
            var obj = JSON.parse(http.responseText);
            var tempCandidates = [];
            //tempCandidates.push(lastBest);
            Object.keys(obj.candidates).forEach(e => {
              var c = obj.candidates[e];
              console.log(e, c);
              var id = null;
              if(c != null){
                id = c.cid;
              }
              var isSelected = false; 
              var isPlaying = false; 
                if(e == 0){
                  if(c != null){
                    that.setState({seed:{cid:id, notes:c.notes_info.notes, isSelected:isSelected, isPlaying:isPlaying, isLastBest:false}});
                   }
              }else if(e == 1){
                var tempLastResult = that.state.lastResult;
                if(tempLastResult == null){
                  tempLastResult = [];
                }
                tempLastResult.push({cid:id, notes:c.notes_info.notes, isSelected:isSelected, isPlaying:isPlaying, isLastBest:true});
                that.setState({lastResult:tempLastResult});
              }else{
                tempCandidates.push({cid: id, notes: c.notes_info.notes, isSelected: isSelected, isPlaying:isPlaying, isLastBest: false});
              }
              //}
              
            });
            that.setState({ candidates : tempCandidates });
            that.setState({ selectedCandidates : [] });
            that.setState({ num_iterations : that.state.num_iterations + 1 });
            //that.toggleSynthesis();
            console.log(that.state.candidates);
            console.log(obj.candidates);
            that.setState({ gotResult : true });

        }
      }
      if(that.state.search_type == "bo"){
        var EoR = Math.sqrt(0.8 * Math.log10(2 * that.state.num_iterations + 2));
        that.setState({EorR:EoR});
        http.send(JSON.stringify({lastBest, search_type: "bo", startStep: startStep, endStep: endStep, EorR: EoR}));

      }else{
        http.send(JSON.stringify({lastBest, search_type:that.state.search_type, startStep: startStep, endStep: endStep, EorR: that.state.ER}));

      }
  }

  render() {
    return (
      <div className='generation'>
        <div className='generation_inner'>
        <div className='seedContainer'>
        <Box style = {{display: "inline-block"}}><Heading level={3} margin="none">Iteration {this.state.num_iterations + 1}</Heading></Box>
        <Box  round="small" background="light-5" style = {{width: "90%", display: "none"}}>
        
          <Box style = {{display: "inline-block"}}><Heading level={3} margin="none">History</Heading></Box>
            <Scrollbars ref="scrollbars" style={{ height: "200px"}} renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}>
            <div style = {{textAlign: "center", paddingLeft: 40}}>
              {this.state.seed != null  ? 
                <div style = {{display: "inline-block", marginTop:20, marginRight: 4}}>
                  <Box><Heading level={4} margin="none">Original Seed</Heading></Box>
                  <div onClick={() => { this.selectCandidate(this.state.seed.cid) }} style={{position:"relative"}} >
                      {this.state.seed.isSelected?<Checkmark color="#4f4fc9" style={{width: 40, height: "100%", left: 0, top: "30%", position:"absolute"}}/>:null}
                  <P5Wrapper candidate = {this.state.seed} index = {0} sketch={sketch} ></P5Wrapper>
                  </div>
                  {this.state.seed.isPlaying?<Stop style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playSeed() }} id = {"play-seed"} alt="playButton"/>
                               :<Play style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playSeed() }} id = {"play-seed"} alt="playButton"/>}
                </div>:null}
              
              {this.state.num_iterations > 0 && this.props.search_type != "rnd" && false?
                
                <ul class="resultsContainer" >
                  {this.state.lastResult.map((c, i) => {
                  console.log(c.cid);
                    return <li>
                      <div style = {{marginLeft: 4}}>
                  <Box><Heading level={4} margin="none">iteration {i+1}</Heading></Box>
                  <div onClick={() => { this.selectCandidate(c.cid) }} style={{position:"relative"}} >
                    {c.isSelected?<Checkmark color="#4f4fc9" style={{width: 40, height: "100%", left: 0, top: "30%", position:"absolute"}}/>:null}
                    <P5Wrapper candidate = {c} index = {0} sketch={sketch} ></P5Wrapper>
                  </div>
                  {c.isPlaying?<Stop style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  {  this.playLastResult(c.cid) }} id = {"play-ref"} alt="playButton"/>
                               :<Play style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playLastResult(c.cid) }} id = {"play-ref"} alt="playButton"/>}
                </div>
                   </li>
          })}
        </ul>: null}

            </div>
            </Scrollbars>
        </Box>
        </div>


        <div  className="generationContainer">
        {this.state.showSynthesis?
        <div>
        {this.state.gotResult? 
        <div>

        {this.state.num_iterations == 0 ? <Button onClick={this.generateCandidates} label={<Box><Heading level={4} margin="none">Generate More Samples</Heading></Box>} /> : null}
        <ul class="candidatesContainer">
          {this.state.candidates.map((c, i) => {
            console.log(c.cid);
            return <li>
                      <div onClick={() => { this.selectCandidate(c.cid) }} style={{position:"relative"}} >
                      {this.state.candidates.filter(candidate => candidate.cid == c.cid)[0].isSelected?<Checkmark color="#4f4fc9" style={{width: 40, height: "100%", left: 0, top: "30%", position:"absolute"}}/>:null}
                      <P5Wrapper candidate = {c} index = {i}  sketch={sketch} ></P5Wrapper>
                      </div>
                      
                      <div className="checkContainer">
                      
                      {c.isPlaying?<Stop style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playCandidate(c.cid) }} id = {"play-" + c.cid} alt="playButton"/>
                               :<Play style={{width: 26, height: 26, marginLeft: 4, marginTop: 2}} color="#4f4fc9" onClick={() =>  { this.playCandidate(c.cid) }} id = {"play-" + c.cid} alt="playButton"/>}
                      
                      </div>

                   </li>
          })}
        </ul>
        
        </div>:<div className = "spinnerContainer"><ClapSpinner size={80} frontColor="#4f4fc9" backColor = "#686769" loading={true} /></div>
      }
      </div>:null}

      {this.state.showSynthesis ? 
          <Synthesis
            search_type = {this.state.search_type}
            EorR = {this.state.EorR}
            selectedCandidates = {this.state.selectedCandidates}
            closeSynthesis={this.closeSynthesis.bind(this)}
            completeCallback = {this.props.completeCallback}
            closeCallback = {this.props.closeCallback}
            menotroneOn = { this.props.menotroneOn}
            onAfterChangeSearching={this.onAfterChangeSearching}
            search_type={this.state.search_type}
            updateCandidatesBO = {this.updateCandidatesBOSearch.bind(this)}
            seed={this.state.seed}
            lastResult={this.state.lastResult}
            genPlay={this.state.isCurrentPlay}
            updatePlayStatus = {this.updateSynPlayStatus.bind(this)}
          />
          : null
        }
      </div>
        </div>
      </div>
    );
  }
}