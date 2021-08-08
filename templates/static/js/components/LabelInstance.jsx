import React, { Component } from 'react';
import {Grommet, DropButton, Grid, Text, Box, Button, Heading, Image, CheckBox, RadioButton, Video, Clock, Menu, Meter, Layer, Stack, Select as SelectG, Button as GButton} from 'grommet'; 
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

const defaultBackgroundColor = "#bcccd1";


export default class LabelInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: "",
      timeUsage: 0,
      title: "Emotional Japanese Speech Annotation",
      userName: "admin",
      instanceID: "loading...",
      instanceFilePath: "",
      instanceSynthesisPath: "",
      instanceList: [{DefaultValueP:0, DefaultValueA:0, DefaultValueD:0 }],
      currentInstanceIndex: 0,
      menuItems:[],
      menuText: "Loading...",
      instanceNumber: 0,
      open: false,
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
    this.onClose=this.onClose.bind(this);
    this.onOpen=this.onOpen.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

    componentDidMount(){
      var d = new Date();
      var timeStamp = d.toString();
      var timeUsage = Date.now();
      this.setState({timeStamp: timeStamp, timeUsage: timeUsage },function(){ console.log("timestamp: ", this.state.timeStamp, "time usage: ", this.state.timeUsage)});
      this.getInstanceList();
  }

  onClose() {
    var that = this;
    that.setState({open: false});
  }

  onOpen() {
    var that = this;
    that.setState({open: true});
  }

  onSubmit() {
    var that = this;
    that.setState({open: false});
    that.props.finish();
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
      var timeUsage = Date.now();
      newInstanceList[that.state.currentInstanceIndex].timeStamp = that.state.timeStamp;
      newInstanceList[that.state.currentInstanceIndex].timeUsage = timeUsage - that.state.timeUsage;
      
      if(!newInstanceList[that.state.currentInstanceIndex].isLabeled){
        that.sendResult(newInstanceList[that.state.currentInstanceIndex]);
      }

      newInstanceList[that.state.currentInstanceIndex].isLabeled = true;
      checked = true;
      that.setState({instanceList: newInstanceList});
      var mI = that.state.menuItems;
      mI[that.state.currentInstanceIndex] = <div className="optionContainer"><Text>No.{that.state.instanceList[that.state.currentInstanceIndex].ID}</Text> <Text size="xsmall" color="brand" >Finished</Text></div>;
      that.setState({menuItems: mI});

    }
    
    return checked;
  }

  updateCurrentInstance(nextIndex) {
    var that= this;
    that.isLabeledCheck();

    var d = new Date();
    var timeStamp = d.toString();
    var timeUsage = Date.now();
    this.setState({timeStamp: timeStamp, timeUsage: timeUsage },function(){ console.log("timestamp: ", this.state.timeStamp, "time usage: ", this.state.timeUsage)});


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
      //mI.push("Utterance " + String(that.state.instanceList[i].ID));
      mI.push(<div className="optionContainer"><Text>No.{that.state.instanceList[i].ID}</Text> <Text size="xsmall" color={defaultBackgroundColor} >Unfinished</Text></div>);
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

    const newInstanceList = that.state.instanceList.slice() //copy the array
        newInstanceList[that.state.currentInstanceIndex].isInconsistent = e.target.checked; //execute the manipulations

    that.setState({instanceList: newInstanceList},function(){ console.log("state inconsist: ", that.state.instanceList[that.state.currentInstanceIndex].isInconsistent) });
  }  



   sendResult(instance){
    var that = this;

    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/api/save';
    var data = new FormData();

    Object.keys(instance).forEach(key => data.append(key, instance[key]));
    data.append("userName", that.state.userName);
    for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
    }
    
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


    data.append("userName", that.state.userName);
    console.log(data.get("userName"));

    http.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log("Instance list received!", this.responseText);
        var obj = JSON.parse(http.responseText);
        console.log(obj);
        //add front-end key-value: selectedP, selectedA, selectedD, clickCountP, clickCountA, clickCountD, timeUsage, timeStamp, isLabeled, isInconsistent
        var instance_list_ = obj.instance_list;
        if (obj.instance_list != null){
            that.setState({instanceNumber: instance_list_.length});
          for(var i = 0; i < instance_list_.length; i++){
            instance_list_[i].selectedPleasure = instance_list_[i].DefaultValueP;
            instance_list_[i].selectedArousal = instance_list_[i].DefaultValueA;
            instance_list_[i].selectedDominance = instance_list_[i].DefaultValueD;
            instance_list_[i].clickCountPleasure = 0;
            instance_list_[i].clickCountArousal = 0;
            instance_list_[i].clickCountDominance = 0;
            instance_list_[i].timeUsage = 0;
            instance_list_[i].timeStamp = "";
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
                                color: this.state.instanceList[this.state.currentInstanceIndex].clickCountPleasure == 0? defaultBackgroundColor : "brand"

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
                                color: this.state.instanceList[this.state.currentInstanceIndex].clickCountArousal == 0? defaultBackgroundColor : "brand"
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
                                color: this.state.instanceList[this.state.currentInstanceIndex].clickCountDominance == 0? defaultBackgroundColor : "brand"
                            }
                        }
                    }}
                    >
                    <div className="dominanceImages">
                        <div className="labelingBoxWithImage"><Box height='60px' width='40%' margin={{top: '35%'}} height='auto'><Image fit="contain" src={d1} /></Box><div className="radioButtonOfImage"><RadioButton  name="1" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '1'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="2" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '2'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='40%' height='auto'><Image fit="contain" src={d2} /></Box><div className="radioButtonOfImage"><RadioButton name="3" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '3'} onClick={this.onDominanceSelected} /></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="4" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '4'} onClick={this.onDominanceSelected} /></div></div>
                        <div className="labelingBoxWithImage"><Box height='60px' width='60%' height='auto'><Image fit="contain" src={d3} /></Box><div className="radioButtonOfImage"><RadioButton name="5" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '5'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton  name="6" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '6'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="labelingBoxWithImage"><Stack anchor="center" margin={{top: '25%'}} ><Box height='74px' width='70px' border={{size: 'small', color:'black'}}></Box><Box height='65px' width='100%'><Image fit="contain" src={d3} /></Box></Stack><div className="radioButtonOfImage"><RadioButton  name="7" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '7'} onClick={this.onDominanceSelected}/></div></div>
                        <div className="radioButtonBoxNoImage"><div className="radioButtonNoImage"><RadioButton name="8" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '8'} onClick={this.onDominanceSelected}/></div></div>
                         <div className="labelingBoxWithImage"><Stack anchor="center" margin={{top: '25%'}} ><Box height='74px' width='70px' border={{size: 'small', color:'black'}}></Box><Box height='85px' width='100%'><Image fit="contain" src={d3} /></Box></Stack><div className="radioButtonOfImage"><RadioButton name="9" checked={String(this.state.instanceList[this.state.currentInstanceIndex].selectedDominance) == '9'} onClick={this.onDominanceSelected}/></div></div>
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
                    checked={this.state.instanceList[this.state.currentInstanceIndex].isInconsistent}
                    onChange={this.onInconsistanceChecked}
          />

          <div className="progressBarContainer">
              <div className="progressBar"><Meter type="bar" color="brand" background={defaultBackgroundColor} value={(this.state.currentInstanceIndex + 1) / this.state.instanceNumber * 100} /></div>
              <div className="progressLabel"><Text>{this.state.currentInstanceIndex + 1} / {this.state.instanceNumber}</Text></div>
          </div>

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

          <div className="submitContainer" style={{display: this.state.currentInstanceIndex == this.state.instanceList.length - 1 ? 'block' : 'none' }}>
            <div className="submitBox">
                <Box align="center" pad="medium">
                    <Button label="Submit" size="large" onClick={() => {this.onOpen()}} />
                </Box>
            </div>
          </div>

        
        <Grommet >
         {this.state.open && (
         <Layer
          id="hello world"
          position="center"
          onClickOutside={() => {this.onClose()}}
          onEsc={() => {this.onClose()}}
        >
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Confirm
            </Heading>

            <Text>Are you sure you want to submit your results?</Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: 'medium', bottom: 'small' }}
            >
              <Button label="Cancel" onClick={() => {this.onClose()}} color="dark-3" />
              <Button
                label={
                  <Text color="white">
                    <strong>Submit</strong>
                  </Text>
                }
                onClick={() => {this.onSubmit()}}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
        )}
        </Grommet>

        </div>

    )
    }
}
