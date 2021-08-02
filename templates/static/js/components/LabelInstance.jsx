import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Popup from "reactjs-popup";
import Scrollbars from "react-custom-scrollbars";
import { Dropdown } from 'react-bootstrap';
import {DropButton, Grid, Text, Box, Button, Heading, Image, CheckBox, RadioButton, Video, Clock, Menu} from 'grommet'; 
import {Select as SelectG, Button as GButton} from 'grommet';
import { Magic, AddCircle, SubtractCircle, Play, Stop, Pause, Clone } from 'grommet-icons';
import ReactAudioPlayer from 'react-audio-player';

import p1 from '../../assets/11.png';
import p2 from '../../assets/12.png';
import p3 from '../../assets/13.png';
import p4 from '../../assets/14.png';
import p5 from '../../assets/15.png';
import a1 from '../../assets/21.png';
import a2 from '../../assets/22.png';
import a3 from '../../assets/23.png';
import a4 from '../../assets/24.png';
import a5 from '../../assets/25.png';
import d1 from '../../assets/31.png';
import d2 from '../../assets/32.png';
import d3 from '../../assets/33.png';

import u0 from '../../assets/FOY0303JOY0.wav';
import u1 from '../../assets/FOY0303JOY1.wav';
import u2 from '../../assets/FOY0303JOY2.wav';
import u3 from '../../assets/FOY0303JOY3.wav';

import '../../css/LabelInstance.css';
import '../../css/TopBar.css';
import '../../css/Navigation.css';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const formatGroupLabelBPM = data => (
  <div style={groupStyles}>
    <span>{"BPM"}</span>
  </div>
);

const formatGroupLabelTS = data => (
  <div style={groupStyles}>
    <span>{"Time Signature"}</span>
  </div>
);

export default class LabelInstance extends Component {
  constructor() {
    super();
    this.state = {
      showGeneration: false,
      seed:{cid: null, notes: [], isSelected: false, isPlaying: false},
      seedToSend:null,
      selectedBars: 2,
      playResult: false,
      barNums: 4,
      popupOn: false,
      bpmOptions:["60bpm", "90bpm", "120bpm", "135bpm"],
      selectedBpm: 120,
      TSOptions:["4/4", "2/4", "3/4", "3/8"],
      selectedTS: "4/4",
      MOptions: ["Metronome Off", "Metronome On"],
      selectedM: false,
      SOptions: ["Manual", "Auto"],
      selectedS: "bo", //ucb for iui
      scrollPosition: 0,
      lastSeconds: 0,
      isInconsistent: false,
      selectedPleasure: 0,
      selectedArousal: 0,
      selectedDominance: 0,
      clickCountPleasure: 0,
      clickCountArousal: 0,
      clickCountDominance: 0,
      timeStamp: "",
      timeUsage: 0.0,
      title: "Emotional Japanese Speech Annotation",
      userName: "admin",
      instanceID: "loading...",
      instanceFilePath: "",
      instanceSynthesisPath: "",
      instanceList: [{defaultValueP:0, defaultValueA:0, defaultValueD:0 }],
      currentInstanceIndex: 0,
      menuItems:[],
      menuText: "Loading...",
    };

    this.updateSeed = this.updateSeed.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.addTwoBars = this.addTwoBars.bind(this);
    this.appendResult = this.appendResult.bind(this);
    this.popUpStateOn = this.popUpStateOn.bind(this);
    this.popUpStateOff = this.popUpStateOff.bind(this);
    this.popUpStateChange = this.popUpStateChange.bind(this);
    this.refreshToneState = this.refreshToneState.bind(this);
    this.createSelectBars = this.createSelectBars.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.onDropdownBPM = this.onDropdownBPM.bind(this);
    this.onDropdownTS = this.onDropdownTS.bind(this);
    this.onDropdownM = this.onDropdownM.bind(this);
    this.onDropdownS = this.onDropdownS.bind(this);
    this.sendResult = this.sendResult.bind(this);
    this.getInstanceList = this.getInstanceList.bind(this);
    this.onInconsistanceChecked=this.onInconsistanceChecked.bind(this);
    this.onPleasureSelected=this.onPleasureSelected.bind(this);
    this.onArousalSelected=this.onArousalSelected.bind(this);
    this.onDominanceSelected=this.onDominanceSelected.bind(this);
    this.gotoNext=this.gotoNext.bind(this);
    this.gotoPrevious=this.gotoPrevious.bind(this);
    this.updateCurrentInstance=this.updateCurrentInstance.bind(this);
    this.generateMenuItems=this.generateMenuItems.bind(this);
    this.onInstanceMenuSelected=this.onInstanceMenuSelected.bind(this);
  }

    componentDidMount(){
      var d = new Date();
      var timeStamp = d.toString();
      this.setState({timeStamp: timeStamp,  timeUsage: d.getTime() },function(){ console.log("timestamp: ", this.state.timeStamp, "time Usage: ", this.state.timeUsage)});
      this.getInstanceList();
  }

  updateCurrentInstance(nextIndex) {
    var that= this;
    that.setState({currentInstanceIndex: nextIndex, instanceID: that.state.instanceList[nextIndex].ID, instanceFilePath: that.state.instanceList[nextIndex].FilePath, instanceSynthesisPath: that.state.instanceList[nextIndex].SynthesisPath, });

  }

  onInstanceMenuSelected(e) {
    var that= this;
    that.updateCurrentInstance(e.selected);
  }

  generateMenuItems () {
    var that = this;
    var mI=[];
    for(var i = 0; i< that.state.instanceList.length; i++){
      mI.push("Utterance " + String(that.state.instanceList[i].ID));
    }
    that.setState({menuText: "All Utterances", menuItems: mI});
  }


  createSelectBars() {
    var that = this;
    let items = [];         
    for (var i = 0; i < that.state.barNums / 2; i++) {             
         items.push( "#" +String(2 * i + 1) + " and #" + String(2 * i + 2) + " bars");   
    }
    
    items.push("None");   

     return items;
 }

  gotoNext() {
    var that= this;
    if(that.state.currentInstanceIndex + 1 < that.state.instanceList.length){
      that.updateCurrentInstance(that.state.currentInstanceIndex + 1);
    }
  }

  gotoPrevious() {
    var that= this;
    if(that.state.currentInstanceIndex - 1 >= 0){
      that.updateCurrentInstance(that.state.currentInstanceIndex - 1);
    }
  }

  onPleasureSelected(e) {
    var that = this;
    console.log("the select pleasure val", e.target.attributes['name'].nodeValue);


    const newInstanceList = that.state.instanceList.slice() //copy the array
    newInstanceList[that.state.currentInstanceIndex].defaultValueP = parseInt(e.target.attributes['name'].nodeValue) //execute the manipulations
    that.setState({instanceList: newInstanceList}) //set the new state

    that.setState({selectedPleasure: parseInt(e.target.attributes['name'].nodeValue), 
      clickCountPleasure: that.state.clickCountPleasure + 1},function(){ console.log("state pleasure: ", that.state.selectedPleasure, ", click count: ", that.state.clickCountPleasure) });
  }

  onArousalSelected(e) {
    var that = this;
    console.log("the select arousal val", e.target.attributes['name'].nodeValue);

    const newInstanceList = that.state.instanceList.slice() //copy the array
    newInstanceList[that.state.currentInstanceIndex].defaultValueA = parseInt(e.target.attributes['name'].nodeValue) //execute the manipulations
    that.setState({instanceList: newInstanceList}) //set the new state

    that.setState({selectedArousal: parseInt(e.target.attributes['name'].nodeValue),
      clickCountArousal: that.state.clickCountArousal + 1},function(){ console.log("state arousal: ", that.state.selectedArousal, ", click count: ", that.state.clickCountArousal) });

  }

    onDominanceSelected(e) {
    var that = this;
    console.log("the select dominance val", e.target.attributes['name'].nodeValue);

    const newInstanceList = that.state.instanceList.slice() //copy the array
    newInstanceList[that.state.currentInstanceIndex].defaultValueD = parseInt(e.target.attributes['name'].nodeValue) //execute the manipulations
    that.setState({instanceList: newInstanceList}) //set the new state

    that.setState({selectedDominance: parseInt(e.target.attributes['name'].nodeValue),
      clickCountDominance: that.state.clickCountDominance + 1},function(){ console.log("state dominance: ", that.state.selectedDominance, ", click count: ", that.state.clickCountDominance) });

  }

   onInconsistanceChecked(e) {
    var that = this;
    console.log("the check val", e.target.checked);
    that.setState({isInconsistent: e.target.checked},function(){ console.log("state inconsist: ", that.state.isInconsistent) });
  }  


 onDropdownSelected(e) {
    var that = this;
    console.log("THE VAL", e.value);
    that.setState({selectedBars: e.selected});
    if(parseInt(e.selected) < that.state.barNums / 2){
      var newNotesCopy = that.state.seed.notes.filter(n => {if(n.quantizedStartStep >  parseInt(e.selected) * 32 && n.quantizedEndStep <= parseInt(e.selected) * 32 + 32){
                                                        return n;}
                                                      });
      var newNotes = [];
      for (var i = 0; i < newNotesCopy.length; i++){
        newNotes.push({pitch: newNotesCopy[i].pitch, quantizedStartStep: newNotesCopy[i].quantizedStartStep - parseInt(e.selected) * 32, quantizedEndStep: newNotesCopy[i].quantizedEndStep - parseInt(e.selected) * 32});
      }

      that.setState({ seedToSend : {cid: null, notes: newNotes, isSelected: false, isPlaying: false, isLastBest:false} });
    }else{
        that.setState({ seedToSend : null });
    }
  }  

  onDropdownBPM(e) {
    var that = this;
    console.log("THE BPM VAL", e.value);
    if(e.selected == 0){
      that.setState({selectedBpm: 60});
    }else if (e.selected == 1){
      that.setState({selectedBpm: 90});
    }else if(e.selected == 3){
      that.setState({selectedBpm: 135});
    }else{
      that.setState({selectedBpm: 120});
    }
  }  

  onDropdownTS(e) {
    var that = this;
    console.log("THE TS VAL", e.value);
    that.setState({selectedTS: e.value});
  }  

  onDropdownM(e) {
    var that = this;
    console.log("THE M VAL", e.value);
    if(e.selected == 1){
      that.setState({selectedM: true});
    }else{
      that.setState({selectedM: false});
    }
  }

  onDropdownS(e) {
    var that = this;
    console.log("THE S VAL", e.value);
    if(e.selected == 1){
      that.setState({selectedS: "bo"});
    }else{
      that.setState({selectedS: "ucb"});
    }
  }

  updatePosition(percent){
    var that = this;

    if(480 * that.state.barNums * percent > 0 && that.state.playResult){
      that.refs.scrollbars.scrollLeft(480 * that.state.barNums * percent-300);
    }
  }
  updateSeed(newNoteResult){
    var that = this;
    console.log(newNoteResult);
    that.setState({selectedBars: {value: 0, label: "#1 and #2 bars"}});
    that.setState({ seed : {cid: null, notes: newNoteResult, isSelected: false, isPlaying: false} });
    var newNotesCopy = that.state.seed.notes.filter(n => {if(n.quantizedStartStep >=  parseInt(that.state.selectedBars.value) * 32 && n.quantizedEndStep <= parseInt(that.state.selectedBars.value) * 32 + 32){
                                                        return n;}
    });
    var newNotes = [];
    for (var i = 0; i < newNotesCopy.length; i++){
      newNotes.push({pitch: newNotesCopy[i].pitch, quantizedStartStep: newNotesCopy[i].quantizedStartStep - parseInt(that.state.selectedBars.value) * 32, quantizedEndStep: newNotesCopy[i].quantizedEndStep - parseInt(that.state.selectedBars.value) * 32});
    }

    that.setState({ seedToSend : {cid: null, notes: newNotes, isSelected: false, isPlaying: false, isLastBest:false} });
  }

  

  handleClick() {
    this.setState({showGeneration: true});
  }

  handleClose() {
    this.setState({showGeneration: false});
  }

  toggleGeneration() {
    this.setState({
      showGeneration: !this.state.showGeneration
    });
  }

  playResult(){
    var that = this;
    if(that.state.playResult){
      that.refreshToneState("pause", false);
    }else {
      that.refreshToneState("start",true);
    }
    that.state.playResult = !that.state.playResult;
    that.setState({ playResult : that.state.playResult }); 
   }

   stopResult(){
    var that = this;
    that.refreshToneState("stop", false);
    that.state.playResult = false;
    that.setState({ playResult : that.state.playResult }); 
   }

  refreshToneState(type,toStart) {
    var that = this;
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
      if(Tone.Transport.state === 'started' && type == "pause") {
        that.setState({ lastSeconds : Tone.Transport.seconds + that.state.lastSeconds}); 
        Tone.Transport.stop();
      }else if(type == "stop"){
        that.setState({ lastSeconds : 0.0}); 
        Tone.Transport.stop();
      } else {
        return;
      }
    }
  }

   addTwoBars(){
    var that = this;
    that.state.barNums = that.state.barNums + 2;
    that.setState({barNums: that.state.barNums});
    console.log(that.state.seed);
   }

   subtractTwoBars(){
    var that = this;
    that.state.barNums = that.state.barNums - 2;
    that.setState({barNums: that.state.barNums});
    var lastNotes = that.state.seed.notes.filter(n => n.quantizedStartStep < that.state.barNums * 16);
    that.setState({ seed : {cid: null, notes: lastNotes, isSelected: false, isPlaying: false} });
    console.log(that.state.seed);
   }

   appendResult(resultNotes){
    var that = this;
    var lastBar = -1;
    for(var i = 0; i < that.state.seed.notes.length; i++){
      if (Math.floor(that.state.seed.notes[i].quantizedStartStep / 32) > lastBar){
        lastBar = Math.floor(that.state.seed.notes[i].quantizedStartStep / 32);
      }
    }

    for(var i = 0; i < resultNotes.notes.length; i++){
      resultNotes.notes[i].quantizedStartStep += 32 + 32 * lastBar; 
      resultNotes.notes[i].quantizedEndStep += 32 + 32 * lastBar; 
    }

    if((lastBar * 2 + 2) >= that.state.barNums){
     that.state.barNums = that.state.barNums + 2;
      that.setState({barNums: that.state.barNums}, () => that.refs.scrollbars.scrollLeft(480 * that.state.barNums * 2 - 960));
    }

    var newNotes = that.state.seed.notes.concat(resultNotes.notes);
    that.setState({ seed : {cid: null, notes: newNotes, isSelected: false, isPlaying: false} });
   }

   popUpStateOn(){
    var that = this;
    that.refreshToneState(false);
    this.setState({playResult: false, popupOn: true},function(){ console.log(this.state.popupOn, "force update") });
   }

   popUpStateOff(){
    var that = this;
    this.setState({popupOn: false},function(){ console.log(this.state.popupOn, "force update") });

    var that = this;
    var http = new XMLHttpRequest();
    var url = 'http://127.0.0.1:5000/destroy';

    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log("Generator destroied!");    
        }
    }
    http.send();

   }


   sendResult(){
    var that = this;

    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/api/save';
    var data = new FormData();

    data.append('selectedPleasure', String(that.state.selectedPleasure));
    data.append('selectedArousal', String(that.state.selectedArousal));
    data.append('selectedDominance', String(that.state.selectedDominance));
    data.append('userName', String(that.state.userName));
    console.log(data);

    http.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log("Result saved!", this.responseText);
      }
    });

    http.open('POST', url, true);
    http.send(data);

  }


  getInstanceList(){
    var that = this;

    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/api/get_list';    
    var data = new FormData();


    data.append("userName", "admin");
    console.log(data.get("userName"));

    http.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log("Instance list received!", this.responseText);
        var obj = JSON.parse(http.responseText);
        console.log(obj);
        that.setState({ instanceList : obj.instance_list}, function(){ console.log( "instance list in state: ", that.state.instanceList); that.updateCurrentInstance(0); that.generateMenuItems();});
      }
    });

    http.open('POST', url, true);
    http.send(data);

  }


   popUpStateChange(open){
    var that = this;
      that.setState({popupOn: open});
      console.log(that.state.popupOn);
   }

    render() {

    return(
          <div className="instanceOuterContainer">


            <div style={{height:50}}>
          </div> 

          <div className="topBarOuterContainer">
                <div className="TitleLine">
                    <div className="topBarTitle">
                        <Box>
                            <Heading level='2' size='medium'>{this.state.title}</Heading>
                        </Box>
                    </div>
                </div>
                <div className="NavigationLine">
                    <div className="userID">
                        <Box>
                            <Text>User ID: {this.state.userName}</Text>
                        </Box>
                    </div>
                    <div className="timeUsage">
                        <Box>
                            <Text>Time: </Text>
                            <Clock type="digital" time="PT0H0M0S" run="forward" />
                        </Box>
                    </div>
                    <div className="instanceID">
                        <Box>
                            <Text>Instance ID: {this.state.instanceID}</Text>
                        </Box>
                    </div>
                    <div className="instanceList">
                        <Box>
                            <SelectG
                                placeholder={this.state.menuText}
                                options={this.state.menuItems}
                                onChange={this.onInstanceMenuSelected}
                            />
                        </Box>
                    </div>
                </div>
          </div>
            <div className="instanceContainer">
                <div className="categoryColumn">
                    <div className="pleasureText">
                        <Text>Pleasure</Text>
                    </div>
                    <div className="arousalText">
                        <Text>Arousal</Text>
                    </div>
                    <div className="dominanceText">
                        <Text>Dominance</Text>
                    </div>
                </div>

                <div className="imageColumn">
                    <div className="pleasureImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p1} /></Box><div className="radioButtonOfImage"><RadioButton name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '1'} onChange={this.onPleasureSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '2'} onChange={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '3'} onChange={this.onPleasureSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '4'} onChange={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '5'} onChange={this.onPleasureSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '6'} onChange={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p4} /></Box><div className="radioButtonOfImage"><RadioButton name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '7'} onChange={this.onPleasureSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '8'} onChange={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p5} /></Box><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueP) == '9'} onChange={this.onPleasureSelected} /></div></div>
                    </div>
                    <div className="arousalImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={a1} /></Box><div className="radioButtonOfImage"><RadioButton name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '1'} onChange={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '2'} onChange={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={a2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '3'} onChange={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '4'} onChange={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={a3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '5'} onChange={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '6'} onChange={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='90%' height='auto'><Image fit="contain" src={a4} /></Box><div className="radioButtonOfImage"><RadioButton name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '7'} onChange={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '8'} onChange={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='100%' height='auto'><Image fit="contain" src={a5} /></Box><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueA) == '9'} onChange={this.onArousalSelected} /></div></div>
                    </div>
                    <div className="dominanceImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='50%' height='auto'><Image fit="contain" src={d1} /></Box><div className="radioButtonOfImage"><RadioButton  name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '1'} onChange={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '2'} onChange={this.onDominanceSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='60%' height='auto'><Image fit="contain" src={d2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '3'} onChange={this.onDominanceSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '4'} onChange={this.onDominanceSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='70%' height='auto'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '5'} onChange={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '6'} onChange={this.onDominanceSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton  name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '7'} onChange={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '8'} onChange={this.onDominanceSelected}/></div></div>
                         <div className="labelingBoxWithImage"><Box height='60px' width='100%'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].defaultValueD) == '9'} onChange={this.onDominanceSelected}/></div></div>
                    </div>
                </div>

                <div className="instanceColumn">
                    <div className="instance">
                        <Text>Utterance: </Text>
                        <ReactAudioPlayer
                            src={this.state.instanceFilePath}
                            controls
                        />
                    </div>
                    <div className="selection">
                        <Text>Your selection: </Text>
                        <Text>Pleasure: {this.state.selectedPleasure!=0?this.state.selectedPleasure:""}</Text>
                        <Text>Arousal: {this.state.selectedArousal!=0?this.state.selectedArousal:""}</Text>
                        <Text>Dominance: {this.state.selectedDominance!=0?this.state.selectedDominance:""}</Text>
                    </div>
                    <div className="synthesizedInstance">
                        <Text>Synthesized Utterance: </Text>
                        <ReactAudioPlayer
                            src={this.state.instanceSynthesisPath}
                            controls
                        />
                    </div>
                </div>
          </div>
          <CheckBox
                    label="Is there any inconsistance between your selection and your perception?"
                    onChange={this.onInconsistanceChecked}
          />


          <div className="navigationContainer">
            <div className="previousBox">
                <Box align="center" pad="medium">
                    <Button label="Previous" onClick={() => {this.gotoPrevious()}} />
                </Box>
            </div>

            <div className="nextBox"> 
                <Box align="center" pad="medium">
                    <Button label="Next" onClick={() => {this.gotoNext()}} />
                </Box>
            </div>
        </div>

        </div>

    )
    }
}
