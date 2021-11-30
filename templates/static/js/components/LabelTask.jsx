import React, { Component } from 'react';
import {Grommet, Card, Text, Box, Button, Heading, Image, CheckBox, RadioButton, Video, Clock, Menu, Meter, Layer, Stack, Drop, Select } from 'grommet'; 
import ReactAudioPlayer from 'react-audio-player';
import Scrollbars from "react-custom-scrollbars";
import ComparisonArea from './ComparisonArea';

export default class LabelTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeStamp: "",
			timeUsage: 0,
			userName: this.props.userName,
			instanceID: "loading...",
			instanceFilePath: "",
			instanceSynthesisPath: "",
			instanceList: [{},],
			currentInstanceIndex: 0,
			menuItems:[],
			menuText: "Loading...",
			instanceNumber: 0,
			open: false,
			tutorialOn: false,
			currentRef: 0,
			refs:{},
			refPositions: {},
			refTexts: {},
			refNames: ["navigationRef", "audioRef", "labelRef", "synthesisRef", "inconsistantRef", "previousNextRef", "selectRef", "submitRef"],
			confirmed: false,
			color:'green',
		};

		this.watchTutorial=this.watchTutorial.bind(this);
		this.onNextTutorial=this.onNextTutorial.bind(this);
		this.onClose=this.onClose.bind(this);
		this.onOpen=this.onOpen.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.isLabeledCheck=this.isLabeledCheck.bind(this);
		this.updateCurrentInstance=this.updateCurrentInstance.bind(this);
		this.generateMenuItems=this.generateMenuItems.bind(this);
		this.onInstanceMenuSelected=this.onInstanceMenuSelected.bind(this);
		this.gotoNext=this.gotoNext.bind(this);
		this.gotoPrevious=this.gotoPrevious.bind(this);
		this.onPleasureSelected=this.onPleasureSelected.bind(this);
		this.onArousalSelected=this.onArousalSelected.bind(this);
		this.onDominanceSelected=this.onDominanceSelected.bind(this);
		this.onInconsistanceChecked=this.onInconsistanceChecked.bind(this);
		this.sendResult = this.sendResult.bind(this);
		this.getInstanceList = this.getInstanceList.bind(this);	
		this.handleClick = this.handleClick.bind(this);	
	}

	handleClick(){
    	var that = this;
    	that.setState({
      		color: Konva.Util.getRandomColor()
    	});
  };

	componentDidMount(){
		var d = new Date();
		var timeStamp = d.toString();
		var timeUsage = Date.now();
		this.setState({timeStamp: timeStamp, timeUsage: timeUsage },function(){ console.log("timestamp: ", this.state.timeStamp, "time usage: ", this.state.timeUsage)});
		this.getInstanceList();
			
		var refs_ = {};
		var refPositions_ = {};
		var refTexts_ = {};

		for (var i = 0; i < this.state.refNames.length; i++) {
			refs_[this.state.refNames[i]] = React.createRef();
		}

		refPositions_["navigationRef"] = {top:"top", right: "left"};
		refPositions_["audioRef"] = {top:"top", right: "left"};
		refPositions_["labelRef"] = {top:"top", right: "left"};
		refPositions_["synthesisRef"] = {top:"top", right: "left"};
		refPositions_["inconsistantRef"] = {top:"top", right: "left"};
		refPositions_["previousNextRef"] = {top:"top", right: "left"};
		refPositions_["selectRef"] = {top:"top", left: "right"};
		refPositions_["submitRef"] = {top:"bottom", left: "right"};

		refTexts_["navigationRef"] = "Time usage and instance ID will show here.";
		refTexts_["audioRef"] = "Click the play button to hear the emotional utterance to label.";
		refTexts_["labelRef"] = "Select values of Pleasure, Arousal, and Dominance to give your labels.";
		refTexts_["synthesisRef"] = "Click the play button to hear the synthesized sample based on your selection.";
		refTexts_["inconsistantRef"] = "If your selections do not give a satisfying synthesized result, please keep your selection and check this.";
		refTexts_["previousNextRef"] = "Click \"Previous\" and \"Next\" button to navigate through utterances.";
		refTexts_["selectRef"] = "You can also go to the utterance using this menu. It shows whether each utterance labeling task is finished.";
		refTexts_["submitRef"] = "Click the \"Submit\" buttion to submit your results after you finish all the utterance labeling tasks." ;

		this.setState({refs: refs_, refPositions: refPositions_, refTexts: refTexts_});
	}


	watchTutorial() {
		var that = this;
		that.setState({tutorialOn: true});
	}


	onNextTutorial() {
		var that = this;
		if (that.state.currentRef == that.state.refNames.length - 1) {
			that.setState({currentRef: 0, tutorialOn: false});
		}else {
			that.setState({currentRef: that.state.currentRef + 1});    
		}
	}


	onClose() {
		var that = this;
		if(!that.state.confirmed) {
			that.setState({open: false});
		}else {
			that.props.finish();
		}
	}


	onOpen() {
		var that = this;
		that.setState({open: true});
	}


	onSubmit() {
		var that = this;
		if(!that.state.confirmed) {
			that.setState({confirmed: true});
		}else {
			that.setState({open: false});
			that.props.finish();
		}
	}


	isLabeledCheck () {
		var that = this;
		var checked = false;

		//copy the array
		const newInstanceList = that.state.instanceList.slice(); 
		if(newInstanceList[that.state.currentInstanceIndex].clickCountPleasure == 0 && 
			newInstanceList[that.state.currentInstanceIndex].clickCountArousal == 0 && 
			newInstanceList[that.state.currentInstanceIndex].clickCountDominance == 0) {
				newInstanceList[that.state.currentInstanceIndex].isLabeled = false;
		}else {
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
			mI[that.state.currentInstanceIndex] = <Box gap="xxsmall"><Text>No.{that.state.instanceList[that.state.currentInstanceIndex].ID}</Text> <Text size="xsmall" color="brand" >Finished</Text></Box>;
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

		that.setState({timeStamp: timeStamp, timeUsage: timeUsage, currentInstanceIndex: nextIndex, instanceID: that.state.instanceList[nextIndex].ID, instanceFilePath: that.state.instanceList[nextIndex].FilePath, instanceSynthesisPath: that.state.instanceList[nextIndex].SynthesisPath});
	}


	onInstanceMenuSelected(e) {
		var that= this;
		that.updateCurrentInstance(e.selected);
	}


	generateMenuItems () {
		var that = this;
		var mI=[];
		for(var i = 0; i< that.state.instanceList.length; i++){
			mI.push(<Box ap="xxsmall"><Text>No.{that.state.instanceList[i].ID}</Text> <Text size="xsmall" color="status-unknown" >Unfinished</Text></Box>);
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

		const newInstanceList = that.state.instanceList.slice(); //copy the array
		var selectValueP = parseInt(e.target.attributes['name'].nodeValue);
		
		if (newInstanceList[that.state.currentInstanceIndex].selectedPleasure != selectValueP || 
			newInstanceList[that.state.currentInstanceIndex].clickCountPleasure == 0) {
			newInstanceList[that.state.currentInstanceIndex].clickCountPleasure = newInstanceList[that.state.currentInstanceIndex].clickCountPleasure + 1; //execute the manipulations
		}
		
		newInstanceList[that.state.currentInstanceIndex].selectedPleasure = selectValueP;

		that.setState({instanceList: newInstanceList}) //set the new state
	}


	onArousalSelected(e) {
		var that = this;
		console.log("the select arousal val", e.target.attributes['name'].nodeValue);

		const newInstanceList = that.state.instanceList.slice(); //copy the array
		var selectValueA = parseInt(e.target.attributes['name'].nodeValue);

		if (newInstanceList[that.state.currentInstanceIndex].selectedArousal != selectValueA || 
			newInstanceList[that.state.currentInstanceIndex].clickCountArousal == 0) {
			newInstanceList[that.state.currentInstanceIndex].clickCountArousal = newInstanceList[that.state.currentInstanceIndex].clickCountArousal + 1; //execute the manipulations
		}

		newInstanceList[that.state.currentInstanceIndex].selectedArousal = selectValueA; //execute the manipulations

		that.setState({instanceList: newInstanceList}) //set the new state
	}


	onDominanceSelected(e) {
		var that = this;
		console.log("the select dominance val", e.target.attributes['name'].nodeValue);

		const newInstanceList = that.state.instanceList.slice(); //copy the array
		var selectValueD = parseInt(e.target.attributes['name'].nodeValue);

		if (newInstanceList[that.state.currentInstanceIndex].selectedDominance != selectValueD || 
			newInstanceList[that.state.currentInstanceIndex].clickCountDominance == 0) {
			newInstanceList[that.state.currentInstanceIndex].clickCountDominance = newInstanceList[that.state.currentInstanceIndex].clickCountDominance + 1; //execute the manipulations
		}

		newInstanceList[that.state.currentInstanceIndex].selectedDominance = selectValueD; //execute the manipulations

		that.setState({instanceList: newInstanceList}) //set the new state
	}


	onInconsistanceChecked(e) {
		var that = this;
		console.log("the check val", e.target.checked);

		const newInstanceList = that.state.instanceList.slice(); //copy the array
		newInstanceList[that.state.currentInstanceIndex].isInconsistent = e.target.checked; //execute the manipulations

		that.setState({instanceList: newInstanceList},function(){ console.log("state inconsist: ", that.state.instanceList[that.state.currentInstanceIndex].isInconsistent) });
	} 


	sendResult(instance){
		var that = this;

		var http = new XMLHttpRequest();
		var url = 'http://localhost:8080/api/v1/save_label';
		var data = new FormData();

		Object.keys(instance).forEach(key => data.append(key, instance[key]));
		data.append("userName", that.state.userName);
		for (var pair of data.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}
		
		http.addEventListener("readystatechange", function() {
			if(this.readyState === 4 ) {
				if(this.status == 200){
					console.log("Result saved!", this.responseText);
				}else {
					alert('There is a problem with saving the labeling result. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.');
				}
			}
		});

		http.open('POST', url, true);
		http.send(data);
	}


	getInstanceList(){
		var that = this;

		var http = new XMLHttpRequest();
		var url = 'http://localhost:8080/api/v1/get_list';    
		var data = new FormData();

		data.append("userName", that.state.userName);
		console.log(data.get("userName"));

		http.addEventListener("readystatechange", function() {
			if(this.readyState === 4 ) {
				if(this.status == 200) {
					console.log("Instance list received!", this.responseText);
					var obj = JSON.parse(http.responseText);
					console.log(obj);
					//add front-end key-value: selectedP, selectedA, selectedD, clickCountP, clickCountA, clickCountD, timeUsage, timeStamp, isLabeled, isInconsistent
					var instance_list_ = obj.instance_list;
					if (obj.instance_list != null) {
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
				}else {
					alert('There is a problem with getting the speech. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.');
					that.props.finish();
				}
			}
		});

		http.open('POST', url, true);
		http.send(data);
	}


	render() {

		return(
			<Box pad="xsmall" direction="column" background="#EEEEEE" gap="xsmall">
				
				<Box width="small" background="#EEEEEE">

					<Button label="Watch Tips" onClick={() => {this.watchTutorial()}} color="dark-3" />

				</Box> 

				<Box className="topBar" direction="row" background="transparent" gap="medium" pad="xsmall">

					<Card pad="xsmall" gap="xsmall" background="light-3" width="medium"  height="xsmall" ref={this.state.refs["navigationRef"]}>
						
						<Text>Time</Text>
						
						<strong><Clock type="digital" time="PT0H0M0S" run="forward" /></strong>        
										
					</Card>

					<Card pad="xsmall" gap="xsmall" background="light-3" width="medium" height="xsmall">
											
						<Text>Task ID</Text>
											
						<Text><strong>{this.state.instanceID}</strong></Text>        
										
					</Card>

					<Card pad="xsmall" gap="xsmall" background="light-3" width="medium"  height="xsmall" ref={this.state.refs["selectRef"]}>
											
						<Text>Task List</Text>

							<Select
								placeholder={this.state.menuText}
								options={this.state.menuItems}
								onChange={this.onInstanceMenuSelected}/>

					</Card>

				</Box>

				<Card pad="xsmall" gap="xsmall" background="light-2" ref={this.state.refs["audioRef"]}>
									
					<Text>Task</Text>
									
					<ReactAudioPlayer src={this.state.instanceFilePath} controls />
					
				</Card>

				<Box justify="center" align="center">

					<Scrollbars ref="scrollbars" style={{ width: "100%", height: "400px", display: "inline-block"}} renderTrackVertical={props => <div {...props} className="track-vertical" style={{display:"none"}}/>} renderThumbVertical={props => <div {...props} className="thumb-vertical" style={{display:"none"}}/>}>
          			
          				<ComparisonArea />
        
        			</Scrollbars>

        		</Box>

				<Card pad="xsmall" gap="xsmall" background="light-2" ref={this.state.refs["synthesisRef"]}>
						
					<Text>Synthesis based on your selection</Text>
									
					<Text>Pleasure: <strong>{this.state.instanceList[this.state.currentInstanceIndex].clickCountPleasure!=0?this.state.instanceList[this.state.currentInstanceIndex].selectedPleasure:"N/A "}</strong> Arousal: <strong>{this.state.instanceList[this.state.currentInstanceIndex].clickCountArousal!=0?this.state.instanceList[this.state.currentInstanceIndex].selectedArousal:"N/A "}</strong> Dominance: <strong>{this.state.instanceList[this.state.currentInstanceIndex].clickCountDominance!=0?this.state.instanceList[this.state.currentInstanceIndex].selectedDominance:"N/A"}</strong></Text>
						
					<ReactAudioPlayer src={this.state.instanceSynthesisPath} controls />
								
				</Card>

				<Box ref={this.state.refs["inconsistantRef"]} >
					
					<CheckBox
						label="Is there any inconsistance between your selection and your perception?"
						checked={this.state.instanceList[this.state.currentInstanceIndex].isInconsistent}
						onChange={this.onInconsistanceChecked}               
					/>
					
				</Box>

				<Box justify="center" align="center">
							
					<Meter type="bar" color="brand" background="status-unknown" value={(this.state.currentInstanceIndex + 1) / this.state.instanceNumber * 100} />
							
					<Text>{this.state.currentInstanceIndex + 1} / {this.state.instanceNumber}</Text>
					
				</Box>

				<Box justify="center" align="center" direction="row">

					<Box align="center" pad="medium" ref={this.state.refs["previousNextRef"]}>
							
						<Button label="Previous" onClick={() => {this.gotoPrevious()}} />
						
					</Box>

					<Box align="center" pad="medium">

						<Button label="Next" onClick={() => {this.gotoNext()}} />
						
					</Box>

				</Box>

				{this.state.currentInstanceIndex == this.state.instanceList.length - 1 || this.state.tutorialOn &&
				<Box align="center" pad="medium" ref={this.state.refs["submitRef"]}>

					<Button label="Submit" size="large" disabled = {this.state.tutorialOn} onClick={() => {this.onOpen()}} />
					
				</Box>
				}
				
				<Grommet>

				 	{this.state.open && (
				 	<Layer
						id="submitConfirmation"
						position="center"
						onClickOutside={() => {this.onClose()}}
						onEsc={() => {this.onClose()}}>

						<Box pad="medium" gap="small" width="medium">
						
							<Heading level={3} margin="none">Confirm</Heading>

							<Text>{this.state.confirmed ? "Thank you! Your results have been recorded." : "Are you sure you want to submit your results?"}</Text>
							
							<Box
								as="footer"
								gap="small"
								direction="row"
								align="center"
								justify="end"
								pad={{ top: 'medium', bottom: 'small' }}>

								{!this.state.confirmed && <Button label="Cancel" onClick={() => {this.onClose()}} color="dark-3" />}
							
								<Button
									label={<Text color="white"><strong>{this.state.confirmed ? "Close" : "Submit"}</strong></Text>}
									onClick={() => {this.onSubmit()}}
									primary
									color="status-critical"
								/>

							</Box>

						</Box>

					</Layer>
					)}

				</Grommet>

				<Grommet >
				 	
				 	{this.state.tutorialOn && (
				 	<Drop
						id="tutorialLayer"
						modal={false}
						stretch={false}
						round="small"
						elevation="small"
						background="background-contrast"
						align={this.state.refPositions[this.state.refNames[this.state.currentRef]]}
						target={this.state.refs[this.state.refNames[this.state.currentRef]].current}>
					
						<Box width="medium">
						
							<Heading level={4} margin="none">{this.state.currentRef + 1}</Heading>

							<Text>{this.state.refTexts[this.state.refNames[this.state.currentRef]]}</Text>
						
							<Box
								as="footer"
								gap="small"
								direction="row"
								align="center"
								justify="end"
								pad ="small">
							
								<Button label={this.state.currentRef == this.state.refNames.length - 1 ? "Close Tips" : "Next"} onClick={() => {this.onNextTutorial()}} color="dark-3" />
						
							</Box>

						</Box>

					</Drop>
					)}

				</Grommet>

			</Box>
		)
	}
}
