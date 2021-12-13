import React, { Component } from 'react';
import {Grommet, Card, CardHeader, CardBody, Text, Box, Button, Grid, Heading, Image, CheckBox, RadioButton, Video, Clock, Menu, Meter, Layer, Stack, Drop, Select, Avatar } from 'grommet';
import { Play, Pause } from 'grommet-icons';
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
			refNames: ["navigationRef", "labelRef", "synthesisRef", "previousNextRef", "selectRef", "submitRef"],
			confirmed: false,
			color:'green',
			boxes: [],
			isPlaying: false,
			currentSpeakerName: "",
			currentTranscriptM: "",
			lastTranscriptM: "",
			currentTranscriptF: "",
			lastTranscriptF: "",
			speakerToLabel: 'Female',
			dimensionToLabel: 'Arousal',
			speakers: ['Male', 'Female'],
			dimensions:['Arousal', 'Pleasure'],
			currentIndex: -1,
			currentIndexM: -1,
			currentIndexF: -1,
			reset: false,
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
		this.reset=this.reset.bind(this);
		this.finishReset=this.finishReset.bind(this);
		this.onPleasureSelected=this.onPleasureSelected.bind(this);
		this.onArousalSelected=this.onArousalSelected.bind(this);
		this.onDominanceSelected=this.onDominanceSelected.bind(this);
		this.onInconsistanceChecked=this.onInconsistanceChecked.bind(this);
		this.sendResult = this.sendResult.bind(this);
		this.getInstanceList = this.getInstanceList.bind(this);	
		this.togglePlay = this.togglePlay.bind(this);	
		this.stopPlay = this.stopPlay.bind(this);	
		this.updateCurrentTime = this.updateCurrentTime.bind(this);	
		this.updateScrollPosition = this.updateScrollPosition.bind(this);	
		this.setSpeaker = this.setSpeaker.bind(this);	
		this.setDimension = this.setDimension.bind(this);	

	}


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
		refPositions_["labelRef"] = {top:"top", right: "left"};
		refPositions_["synthesisRef"] = {top:"top", right: "left"};
		refPositions_["previousNextRef"] = {top:"top", right: "left"};
		refPositions_["selectRef"] = {top:"top", left: "right"};
		refPositions_["submitRef"] = {top:"bottom", left: "right"};

		refTexts_["navigationRef"] = "Time usage and instance ID will show here.";
		refTexts_["labelRef"] = "Select values of Pleasure, Arousal, and Dominance to give your labels.";
		refTexts_["synthesisRef"] = "Click the play button to hear the synthesized sample based on your selection.";
		refTexts_["previousNextRef"] = "Click \"Previous\" and \"Next\" button to navigate through utterances.";
		refTexts_["selectRef"] = "You can also go to the utterance using this menu. It shows whether each utterance labeling task is finished.";
		refTexts_["submitRef"] = "Click the \"Submit\" buttion to submit your results after you finish all the utterance labeling tasks." ;

		

		var boxes_ = [{index: 0, x: 67, y: 101, speaker: 'F', end: 106, transcript:"Why did he invite her here?"}, 
					{index: 1, x: 100, y: 101, speaker: 'M', end: 135, transcript:"Why does that bother you?"},
					{index: 2, x: 127, y: 101, speaker: 'F', end: 173, transcript:"She's been in New York three and an half years, why all of a sudden?"},
					{index: 3, x: 166, y: 101, speaker: 'M', end: 217, transcript:"Well maybe...maybe he just wanted to see her."},
					{index: 4, x: 212, y: 101, speaker: 'F', end: 265, transcript:"Nobody comes seven hundred miles just to see."},
					{index: 5, x: 257, y: 101, speaker: 'M', end: 331, transcript:"What do you mean?  You know he lived next door to the girl his whole life, why wouldn't he want to see her?"},
					{index: 6, x: 336, y: 101, speaker: 'M', end: 406, transcript:"[BREATHING] You don't look at me like that.  He didn't tell me anything more than he told you."},
					{index: 7, x: 399, y: 101, speaker: 'F', end: 430, transcript:"He's not going to marry her."},
					{index: 8, x: 424, y: 101, speaker: 'M', end: 453, transcript:"How do you know he's even thinking about it?"},
					{index: 9, x: 443, y: 101, speaker: 'F', end: 463, transcript:"It's got that about it."},
					{index: 10, x: 458, y: 101, speaker: 'M', end: 476, transcript:"Oh.  So what."},
					{index: 11, x: 471, y: 101, speaker: 'F', end: 509, transcript:"What is going on here, Joe?"},
					{index: 12, x: 506, y: 101, speaker: 'M', end: 526, transcript:"Now listen."},
					{index: 13, x: 520, y: 101, speaker: 'F', end: 565, transcript:"She is not his girl.  She knows she's not."},
					{index: 14, x: 558, y: 101, speaker: 'M', end: 582, transcript:"You can't read her mind."},
					{index: 15, x: 577, y: 101, speaker: 'F', end: 667, transcript:"Then why is she still single?  New York is full of men, why is she still single?  Probably a hundred people told her she's foolish, but she waited."},
					{index: 16, x: 661, y: 101, speaker: 'M', end: 684, transcript:"How do you know why she waited?"},
					{index: 17, x: 674, y: 101, speaker: 'F', end: 783, transcript:"Because she knows what I know, that's why.  She's faithful as a rock.  In my darkest moments, I think of her waiting and I know that I'm right."},
					{index: 18, x: 783, y: 101, speaker: 'M', end: 827, transcript:"Hey look, it's a nice day, huh?  Why are we arguing?"},
					{index: 19, x: 821, y: 101, speaker: 'F', end: 913, transcript:"Nobody in this house dares take away her faith, Joe.  You know strangers might, but not his father, not his brother."},
					{index: 20, x: 906, y: 101, speaker: 'M', end: 949, transcript:"What do you want me to do? What do you want?"},
					{index: 21, x: 923, y: 101, speaker: 'F', end: 1022, transcript:"I want you to-- I want you to act like he is coming back, both of you.  Don't think I haven't noticed you since Chris invited her here."},
					{index: 22, x: 1022, y: 101, speaker: 'F', end: 1058, transcript:"I won't stand for any nonsense."},
					{index: 23, x: 1066, y: 101, speaker: 'M', end: 1082, transcript:"Kate."},
					{index: 24, x: 1082, y: 101, speaker: 'F', end: 1224, transcript:"Because if he's not coming back, I'll kill myself.  Oh laugh, laugh all you like but why does this happen the very night he comes back.  She goes to sleep in his room and his memorial breaks in pieces.  Look at it, Joe, look."},
					{index: 25, x: 1093, y: 101, speaker: 'M', end: 1117, transcript:"[BREATHING]"},
					{index: 26, x: 1212, y: 101, speaker: 'M', end: 1233, transcript:"Calm yourself."},
					{index: 27, x: 1224, y: 101, speaker: 'F', end: 1327, transcript:"Just believe with me, Joe. Only last week a man came back in Detroit missing longer than Larry.  Believe with me. You, above all, have got to believe. Just believe."},
					{index: 28, x: 1241, y: 101, speaker: 'M', end: 1264, transcript:"Okay. Calm yourself."},
					{index: 29, x: 1265, y: 101, speaker: 'M', end: 1338, transcript:"I know. All right, all right. All right. Okay.  Calm yourself. What does that mean, me above all?"},
					{index: 30, x: 1346, y: 101, speaker: 'M', end: 1381, transcript:"Look at you, you're shaking."},
					{index: 31, x: 1379, y: 101, speaker: 'F', end: 1407, transcript:"I can't help it."},
					{index: 32, x: 1409, y: 101, speaker: 'M', end: 1476, transcript:"What have I got to hide?  What the hell is the matter with you, Kate?"},
];
	this.setState({refs: refs_, refPositions: refPositions_, refTexts: refTexts_, boxes: boxes_});
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


	reset() {
		var that = this;
		that.stopPlay();
		that.setState({reset: true});
	}

	finishReset() {
		var that = this;
		that.setState({reset: false});
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

	
	togglePlay(){
    	var that = this;
    	that.setState({isPlaying: !that.state.isPlaying});
  	}


  	stopPlay(){
    	var that = this;
    	that.setState({isPlaying: false});
  	}


  	updateCurrentTime(time) {
  		var that = this;

  		if (time * 10 >= 400) {
  			that.refs.scrollbars.scrollLeft(time*10 - 400);
  		}else {
  			that.refs.scrollbars.scrollLeft(0);
  		}

  		if(that.state.currentIndex == -1 || time * 10 < that.state.boxes[that.state.currentIndex].x || (that.state.currentIndex < that.state.boxes.length - 1 && time * 10 >= that.state.boxes[that.state.currentIndex + 1].x)) {
  			for (var i = 0; i < that.state.boxes.length; i++){
  				if ( time * 10 > that.state.boxes[i].x && time * 10 <= that.state.boxes[i].end) {

  					if (that.state.boxes[i].speaker == 'M' && that.state.boxes[i].transcript!= that.state.currentTranscriptM) {
  						that.setState({currentIndex: i, currentIndexM: i, currentTranscriptM: that.state.boxes[i].transcript, lastTranscriptM: that.state.currentTranscriptM});
  					}
  					if (that.state.boxes[i].speaker == 'F' && that.state.boxes[i].transcript!= that.state.currentTranscriptF) {
  						that.setState({currentIndex: i,  currentIndexF: i, currentTranscriptF: that.state.boxes[i].transcript, lastTranscriptF: that.state.currentTranscriptF});
  					}
  					break;
  				}
  			}
  		}
  	}


  	updateScrollPosition(positionY) {
  		var that = this;
  		console.log(that.refs.scrollbars.getScrollTop(), positionY);
  		if (that.refs.scrollbars.getScrollTop() - positionY + 1 >= 0) {
  			that.refs.scrollbars.scrollTop(positionY - 1);
  			return;
  		}

  		if (that.refs.scrollbars.getScrollTop() + 250 - positionY + 1 <= 0) {
  			console.log(that.refs.scrollbars.getScrollTop(), positionY, that.refs.scrollbars.getScrollHeight(), that.refs.scrollbars.getClientHeight());
  			that.refs.scrollbars.scrollTop(positionY - 1 - 200 );
  			console.log(that.refs.scrollbars.getScrollTop(), positionY, that.refs.scrollbars.getScrollHeight(), that.refs.scrollbars.getClientHeight());
  			return;
  		}
  	}



  	setSpeaker(option) {
  		var that = this;
  		that.setState({speakerToLabel: option});
  	}

  	setDimension(option) {
  		var that = this;
  		that.setState({dimensionToLabel: option});
  	}



	render() {

		return(
			<Box pad="xsmall" direction="column" background="#EEEEEE" gap="xsmall">
				
				<Box width="small" background="#EEEEEE">

					<Button label="Watch Tips" onClick={() => {this.watchTutorial()}} color="dark-3" />

				</Box> 

				
				<Box direction="row">
					<Select
      					options={this.state.speakers}
     	 				value={this.state.speakerToLabel}
      					onChange={({ option }) => this.setSpeaker(option)}
    				/>

    				<Select
      					options={this.state.dimensions}
     	 				value={this.state.dimensionToLabel}
      					onChange={({ option }) => this.setDimension(option)}
    				/>
				</Box>

				<Text>High {this.state.dimensionToLabel}</Text>

				<Box justify="center" align="center">

					<Scrollbars ref="scrollbars" style={{ width: "100%", height: "250px", display: "inline-block"}} >
			
						<ComparisonArea boxesPassed={this.state.boxes} isPlaying={this.state.isPlaying} togglePlay={this.togglePlay} stopPlay={this.stopPlay} reset={this.state.reset} finishReset={this.finishReset} getCurrentTime={this.updateCurrentTime} speaker={this.state.speakerToLabel} dimension={this.state.dimensionToLabel} updateScrollPosition={this.updateScrollPosition}/>

					</Scrollbars>

				</Box>

				<Text>Low {this.state.dimensionToLabel}</Text>

				<Box justify="center" align="center">
					{this.state.isPlaying?<Pause color='brand' onClick={() => {this.togglePlay()}} />:<Play color='brand' onClick={() => {this.togglePlay()}} />}
				</Box>

				<Card pad="xsmall" gap="xsmall" background="light-2" ref={this.state.refs["synthesisRef"]}>
						
					<CardHeader pad="xxsmall" justify="start">Transcript</CardHeader>
									
					<CardBody pad="xxsmall">
						<Grid
  							rows={['auto']}
  							columns={['1/2', '1/2']}
  							gap="none"
  							areas={[
    							{ name: 'left', start: [0, 0], end: [0, 0] },
    							{ name: 'right', start: [1, 0], end: [1, 0] },
  							]}
						>
  							<Box gridArea="left" background={this.state.speakerToLabel=="Female"?"green":"light-1"} align="center" ><Text><strong>Female Speaker</strong></Text></Box>
							<Box gridArea="right" background={this.state.speakerToLabel=="Male"?"brand":"light-1"} align="center"><Text><strong>Male Speaker</strong></Text></Box>

						</Grid>
						<Grid
  							rows={['1/3', '2/3']}
  							columns={['1/2', '1/2']}
  							gap="none"
  							areas={[
    							{ name: 'left-up', start: [0, 0], end: [0, 0] },
    							{ name: 'right-up', start: [1, 0], end: [1, 0] },
    							{ name: 'left-down', start: [0, 1], end: [0, 1] },
    							{ name: 'right-down', start: [1, 1], end: [1, 1] },
  							]}
						>
  							<Box gridArea="left-up" border={{ color: 'dark-3', size: 'xsmall' }}><Box direction="row"><Text size="xsmall">last sentence</Text></Box><Text size="small">{this.state.lastTranscriptF}</Text></Box>
							<Box gridArea="right-up" border={{ color: 'dark-3', size: 'xsmall' }}><Box direction="row"><Text size="xsmall">last sentence</Text></Box><Text size="small">{this.state.lastTranscriptM}</Text></Box>
							<Box gridArea="left-down" border={{ color: 'dark-3', size: 'xsmall' }}><Box direction="row"><Text size="small">current sentence: </Text><Box background={this.state.speakerToLabel=="Female"?"green":"dark-3"} width="20px" round="xsmall" align="center"><Text size="small" color="light-1">{this.state.currentIndexF==-1? "" : this.state.boxes[this.state.currentIndexF].index + 1}</Text></Box></Box><Text>{this.state.currentTranscriptF}</Text></Box>
							<Box gridArea="right-down" border={{ color: 'dark-3', size: 'xsmall' }}><Box direction="row"><Text size="small">current sentence: </Text><Box background={this.state.speakerToLabel=="Male"?"brand":"dark-3"} width="20px" round="xsmall" align="center"><Text size="small" color="light-1">{this.state.currentIndexM==-1? "" : this.state.boxes[this.state.currentIndexM].index + 1}</Text></Box></Box><Text>{this.state.currentTranscriptM}</Text></Box>
						</Grid>
					</CardBody>
								
				</Card>


				<Box justify="center" align="center">
							
					<Meter type="bar" color="brand" background="status-unknown" value={(this.state.currentInstanceIndex + 1) / this.state.instanceNumber * 100} />
							
					<Text>{this.state.currentInstanceIndex + 1} / {this.state.instanceNumber}</Text>
					
				</Box>

				<Box justify="center" align="center" direction="row">

					<Box align="center" pad="medium" ref={this.state.refs["previousNextRef"]}>
							
						<Button label="Reset" color="status-critical" onClick={() => {this.reset()}} />
						
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
