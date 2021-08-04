import React, { Component } from 'react';
import {Grommet, DropButton, Grid, Text, Box, Button, Heading, Image, CheckBox, RadioButton, Video, Clock, Menu, Select as SelectG, Button as GButton} from 'grommet'; 
import ReactAudioPlayer from 'react-audio-player';

import p1 from '../../assets/images/11.png';
import p2 from '../../assets/images/12.png';
import p3 from '../../assets/images/13.png';
import p4 from '../../assets/images/14.png';
import p5 from '../../assets/images/15.png';
import a1 from '../../assets/images/21.png';
import a2 from '../../assets/images/22.png';
import a3 from '../../assets/images/23.png';
import a4 from '../../assets/images/24.png';
import a5 from '../../assets/images/25.png';
import d1 from '../../assets/images/31.png';
import d2 from '../../assets/images/32.png';
import d3 from '../../assets/images/33.png';

import '../../css/LabelInstance.css';

const defaultCheckColor = "#bcccd1";

export default class LabelInstance extends Component {
  constructor() {
    super();
    this.state = {
      timeStamp: "",
      title: "Emotional Japanese Speech Annotation",
      userName: "admin",
      instanceID: "loading...",
      instanceFilePath: "",
      instanceSynthesisPath: "",
      instanceList: [{DefaultValueP:0, DefaultValueA:0, DefaultValueD:0 }],
      currentInstanceIndex: 0,
      menuItems:[],
      menuText: "Loading...",
      checkColorPleasure: "#bcccd1",
      checkColorArousal: "#bcccd1",
      checkColorDominance: "#bcccd1",
    };

   
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
    this.isLabeledCheck=this.isLabeledCheck.bind(this);
  }

    componentDidMount(){
      var d = new Date();
      var timeStamp = d.toString();
      this.setState({timeStamp: timeStamp },function(){ console.log("timestamp: ", this.state.timeStamp)});
      this.getInstanceList();
  }


  isLabeledCheck () {
    var that = this;
    var checked = false;
    const newInstanceList = that.state.instanceList.slice(); //copy the array
    if(newInstanceList[that.state.currentInstanceIndex].clickCountPleasure == 0 && 
       newInstanceList[that.state.currentInstanceIndex].clickCountArousal == 0 && 
       newInstanceList[that.state.currentInstanceIndex].clickCountDominance == 0) {
        newInstanceList[that.state.currentInstanceIndex].isLabeled = false;
    }
    else{
      newInstanceList[that.state.currentInstanceIndex].islabeled = true;
      checked = true;
    }
    that.setState({instanceList: newInstanceList});
    
    return checked;
  }

  updateCurrentInstance(nextIndex) {
    var that= this;
    that.isLabeledCheck();
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
    var selectValueP = parseInt(e.target.attributes['name'].nodeValue);
    
    if (newInstanceList[that.state.currentInstanceIndex].selectedPleasure != selectValueP || newInstanceList[that.state.currentInstanceIndex].clickCountPleasure == 0) {
        newInstanceList[that.state.currentInstanceIndex].clickCountPleasure = newInstanceList[that.state.currentInstanceIndex].clickCountPleasure + 1; //execute the manipulations
    }
    
    newInstanceList[that.state.currentInstanceIndex].selectedPleasure = selectValueP;//execute the manipulationsthat.setState({instanceList: newInstanceList}) //set the new state

    that.setState({instanceList: newInstanceList}) //set the new state
  }

  onArousalSelected(e) {
    var that = this;
    console.log("the select arousal val", e.target.attributes['name'].nodeValue);

    const newInstanceList = that.state.instanceList.slice() //copy the array
    var selectValueA = parseInt(e.target.attributes['name'].nodeValue);

    if (newInstanceList[that.state.currentInstanceIndex].selectedArousal != selectValueA || newInstanceList[that.state.currentInstanceIndex].clickCountArousal == 0) {
        newInstanceList[that.state.currentInstanceIndex].clickCountArousal = newInstanceList[that.state.currentInstanceIndex].clickCountArousal + 1; //execute the manipulations
    }

    newInstanceList[that.state.currentInstanceIndex].selectedArousal = selectValueA; //execute the manipulations

    that.setState({instanceList: newInstanceList}) //set the new state

  }

    onDominanceSelected(e) {
    var that = this;
    console.log("the select dominance val", e.target.attributes['name'].nodeValue);

    const newInstanceList = that.state.instanceList.slice() //copy the array
    var selectValueD = parseInt(e.target.attributes['name'].nodeValue);

    if (newInstanceList[that.state.currentInstanceIndex].selectedDominance != selectValueD || newInstanceList[that.state.currentInstanceIndex].clickCountDominance == 0) {
        newInstanceList[that.state.currentInstanceIndex].clickCountDominance = newInstanceList[that.state.currentInstanceIndex].clickCountDominance + 1; //execute the manipulations
    }

    newInstanceList[that.state.currentInstanceIndex].selectedDominance = selectValueD; //execute the manipulations
    that.setState({instanceList: newInstanceList}) //set the new state

  }

   onInconsistanceChecked(e) {
    var that = this;
    console.log("the check val", e.target.checked);
    that.setState({isInconsistent: e.target.checked},function(){ console.log("state inconsist: ", that.state.isInconsistent) });
  }  



   sendResult(){
    var that = this;

    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/api/save';
    var data = new FormData();

    //need to update
    /*
    data.append('selectedPleasure', String(that.state.selectedPleasure));
    data.append('selectedArousal', String(that.state.selectedArousal));
    data.append('selectedDominance', String(that.state.selectedDominance));
    data.append('userName', String(that.state.userName));
    console.log(data);
    */
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
        //add front-end key-value: selectedP, selectedA, selectedD, clickCountP, clickCountA, clickCountD, timeUsage, isLabeled, isInconsistent
        var instance_list_ = obj.instance_list;
        if (obj.instance_list != null){
          for(var i = 0; i < instance_list_.length; i++){
            instance_list_[i].selectedPleasure = instance_list_[i].DefaultValueP;
            instance_list_[i].selectedArousal = instance_list_[i].DefaultValueA;
            instance_list_[i].selectedDominance = instance_list_[i].DefaultValueD;
            instance_list_[i].clickCountPleasure = 0;
            instance_list_[i].clickCountArousal = 0;
            instance_list_[i].clickCountDominance = 0;
            instance_list_[i].timeUsage = 0.0;
            instance_list_[i].isLabeled = false;
            instance_list_[i].isInconsistent = false;
          }
        }
        
        that.setState({ instanceList : instance_list_}, function(){ console.log( "instance list in state: ", that.state.instanceList); that.updateCurrentInstance(0); that.generateMenuItems();});
      }
    });

    http.open('POST', url, true);
    http.send(data);

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
                
                    <Grommet
                    theme={{
                        radioButton: {
                            check: {
                                color: this.state.instanceList[this.state.currentInstanceIndex].clickCountPleasure == 0? defaultCheckColor : "brand"

                            }
                        }
                    }}
                    >
                    <div className="pleasureImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p1} /></Box><div className="radioButtonOfImage"><RadioButton name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == 1} onClick={this.onPleasureSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == '2'} onClick={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == 3} onClick={this.onPleasureSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == '4'} onClick={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == 5} onClick={this.onPleasureSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == '6'} onClick={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p4} /></Box><div className="radioButtonOfImage"><RadioButton name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == 7} onClick={this.onPleasureSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == '8'} onClick={this.onPleasureSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={p5} /></Box><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure) == 9} onClick={this.onPleasureSelected} /></div></div>
                    </div>
                    </Grommet>

                    <Grommet
                    theme={{
                        radioButton: {
                            check: {
                                color: this.state.instanceList[this.state.currentInstanceIndex].clickCountArousal == 0? defaultCheckColor : "brand"
                            }
                        }
                    }}
                    >
                    <div className="arousalImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={a1} /></Box><div className="radioButtonOfImage"><RadioButton name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '1'} onClick={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '2'} onClick={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={a2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '3'} onClick={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '4'} onClick={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%' height='auto'><Image fit="contain" src={a3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '5'} onClick={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '6'} onClick={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='90%' height='auto'><Image fit="contain" src={a4} /></Box><div className="radioButtonOfImage"><RadioButton name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '7'} onClick={this.onArousalSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '8'} onClick={this.onArousalSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='100%' height='auto'><Image fit="contain" src={a5} /></Box><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedArousal) == '9'} onClick={this.onArousalSelected} /></div></div>                   
                    </div>
                    </Grommet>
                    
                    <Grommet
                    theme={{
                        radioButton: {
                            check: {
                                color: this.state.instanceList[this.state.currentInstanceIndex].clickCountDominance == 0? defaultCheckColor : "brand"
                            }
                        }
                    }}
                    >
                    <div className="dominanceImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='50%' height='auto'><Image fit="contain" src={d1} /></Box><div className="radioButtonOfImage"><RadioButton  name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '1'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '2'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='60%' height='auto'><Image fit="contain" src={d2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '3'} onClick={this.onDominanceSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '4'} onClick={this.onDominanceSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='70%' height='auto'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '5'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '6'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='80%'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton  name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '7'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '8'} onClick={this.onDominanceSelected}/></div></div>
                         <div className="labelingBoxWithImage"><Box height='60px' width='100%'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '9'} onClick={this.onDominanceSelected}/></div></div>
                    </div>
                    </Grommet>
                  
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
                        <Text>Pleasure: {this.state.instanceList[this.state.currentInstanceIndex].clickCountPleasure!=0?this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure:""}</Text>
                        <Text>Arousal: {this.state.instanceList[this.state.currentInstanceIndex].clickCountArousal!=0?this.state.instanceList[this.state.currentInstanceIndex].selectedArousal:""}</Text>
                        <Text>Dominance: {this.state.instanceList[this.state.currentInstanceIndex].clickCountDominance!=0?this.state.instanceList[this.state.currentInstanceIndex].selectedDominance:""}</Text>
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
