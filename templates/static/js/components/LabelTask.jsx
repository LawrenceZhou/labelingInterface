import React, { Component } from 'react';
import {grommet, Grommet, Card, RangeInput, CardHeader, CardBody, Text, Box, Button, Grid, Heading, Meter, Layer, Drop, Select } from 'grommet';
import { Play, Volume, PlayFill, StopFill } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { ThemeType } from 'grommet/themes';
import Scrollbars from "react-custom-scrollbars";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AudioProgress from './AudioProgress';
import ComparisonArea from './ComparisonArea';
import LeftCoordinate from './LeftCoordinate';


const customFocus = deepMerge(grommet, {
  	global: {
    	focus: {
    		border: {
    			color: '#0000ffff',
    		},
    		shadow: {
    			color: '#0000ffff',
    			size: '0px',
    		}
    	},
  	},
});

const customThemeRangeInput: ThemeType = {
  	global: {
    	spacing: '12px',
    	focus: {
    		border: {
    			color: '#0000ffff',
    		},
    		shadow: {
    			color: '#0000ffff',
    			size: '0px',
    		}
    	},
  	},
  	
  	rangeInput: {
    	track: {
      		color: 'accent-2',
      		height: '12px',
      		extend: () => `border-radius: 10px`,
      		lower: {
        		color: 'brand',
        		opacity: 0.7,
      		},
      		upper: {
        		color: 'dark-4',
        		opacity: 0.3,
      		},
    	},
    
    	thumb: {
      		color: 'brand',
    	},
  	},
};


export default class LabelTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeStamp: "",
			timeUsage: 0,
			timeStart: Date.now(),
			userName: this.props.userName,
			open: false,
			tutorialOn: false,
			currentRef: 0,
			refs:{},
			refPositions: {},
			refTexts: {},
			refNames: ["descriptionRef", "startButtonRef", "labelRef", "highlightRef", "sliderRef", "resetRef", "transcriptRef", "progressNextRef"],
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
			currentTaskIndex: 0,
			taskList:[{speaker:'Female', dimension:'Arousal'},
						{speaker:'Female', dimension:'Pleasure'},
						{speaker:'Male', dimension:'Arousal'},
						{speaker:'Male', dimension:'Pleasure'}],
			conditionList: ['withHighlight','withoutHighlight','slider'],
			condition: 'withHighlight',
			currentIndex: -1,
			currentIndexM: -1,
			currentIndexF: -1,
			next:false,
			reset: false,
			nextConfirmOn: false,
			resetConfirmOn: false,
			atLeastOneRun: false,
			currentTime: 0,
			currentTimeText: "00:00",
			totalTimeText:"00:00",
			femaleColor: "#7A8CF0",
			maleColor: "#7BE77E",
			scrollTop: 0,
			isStarted: false,
			volume: 0.7,
			audioPath: "assets/wavs/Ses01F_script01_2.wav",
			assigmentID: 0,
			length: 0,
			sliderValue: 3,
			sliderResults: {},
			description: "",
		};

		this.comparisonAreaRef = React.createRef();
		this.watchTutorial=this.watchTutorial.bind(this);
		this.onNextTutorial=this.onNextTutorial.bind(this);
		this.onClose=this.onClose.bind(this);
		this.onCloseReset=this.onCloseReset.bind(this);
		this.onOpen=this.onOpen.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.next=this.next.bind(this);
		this.onNext=this.onNext.bind(this);
		this.onCloseNext=this.onCloseNext.bind(this);
		this.reset=this.reset.bind(this);
		this.onReset=this.onReset.bind(this);
		this.sendResult = this.sendResult.bind(this);
		this.getTasks = this.getTasks.bind(this);	
		this.startTask = this.startTask.bind(this);	
		this.togglePlay = this.togglePlay.bind(this);	
		this.stopPlay = this.stopPlay.bind(this);	
		this.updateCurrentTime = this.updateCurrentTime.bind(this);	
		this.updateScrollPosition = this.updateScrollPosition.bind(this);	
		this.setSpeaker = this.setSpeaker.bind(this);	
		this.setDimension = this.setDimension.bind(this);	
		this.strPadLeft = this.strPadLeft.bind(this);
		this.getSliderValue = this.getSliderValue.bind(this);	
        this.handleKeyPressedForSlider = this.handleKeyPressedForSlider.bind(this);
		this.setVolume = this.setVolume.bind(this);	
		this.setRefs = this.setRefs.bind(this);	
	}


	componentDidMount(){
		var d = new Date();
		var timeStamp = d.toString();
		var timeStart = Date.now();
		this.setState({timeStamp: timeStamp, timeStart: timeStart },function(){ console.log("timestamp: ", this.state.timeStamp, "time start: ", this.state.timeStart)});
		this.getTasks();

		var boxes_ = [{index: 0, indexS: 0, x: 67, y: 101, speaker: 'F', end: 106, highlightA:false, highlightP:false, transcript:"Why did he invite her here?"}, 
					{index: 1, indexS: 0, x: 100, y: 101, speaker: 'M', end: 135, highlightA:false, highlightP:false, transcript:"Why does that bother you?"},
					{index: 2, indexS: 1, x: 127, y: 101, speaker: 'F', end: 173, highlightA:true, highlightP:false, transcript:"She's been in New York three and an half years, why all of a sudden?"},
					{index: 3, indexS: 1, x: 166, y: 101, speaker: 'M', end: 217, highlightA:true, highlightP:true, transcript:"Well maybe...maybe he just wanted to see her."},
					{index: 4, indexS: 2, x: 212, y: 101, speaker: 'F', end: 265, highlightA:true, highlightP:false, transcript:"Nobody comes seven hundred miles just to see."},
					{index: 5, indexS: 2, x: 257, y: 101, speaker: 'M', end: 331, highlightA:false, highlightP:false, transcript:"What do you mean?  You know he lived next door to the girl his whole life, why wouldn't he want to see her?"},
					{index: 6, indexS: 3, x: 336, y: 101, speaker: 'M', end: 406, highlightA:true, highlightP:false, transcript:"[BREATHING] You don't look at me like that.  He didn't tell me anything more than he told you."},
					{index: 7, indexS: 3, x: 399, y: 101, speaker: 'F', end: 430, highlightA:false, highlightP:true, transcript:"He's not going to marry her."},
					{index: 8, indexS: 4, x: 424, y: 101, speaker: 'M', end: 453, highlightA:true, highlightP:true, transcript:"How do you know he's even thinking about it?"},
					{index: 9, indexS: 4, x: 443, y: 101, speaker: 'F', end: 463, highlightA:false, highlightP:true, transcript:"It's got that about it."},
					{index: 10, indexS: 5, x: 458, y: 101, speaker: 'M', end: 476, highlightA:true, highlightP:true, transcript:"Oh.  So what."},
					{index: 11, indexS: 5, x: 471, y: 101, speaker: 'F', end: 509, highlightA:false, highlightP:false, transcript:"What is going on here, Joe?"},
					{index: 12, indexS: 6, x: 506, y: 101, speaker: 'M', end: 526, highlightA:false, highlightP:true, transcript:"Now listen."},
					{index: 13, indexS: 6, x: 520, y: 101, speaker: 'F', end: 565, highlightA:true, highlightP:false, transcript:"She is not his girl.  She knows she's not."},
					{index: 14, indexS: 7, x: 558, y: 101, speaker: 'M', end: 582, highlightA:false, highlightP:false, transcript:"You can't read her mind."},
					{index: 15, indexS: 7, x: 577, y: 101, speaker: 'F', end: 667, highlightA:true, highlightP:false, transcript:"Then why is she still single?  New York is full of men, why is she still single?  Probably a hundred people told her she's foolish, but she waited."},
					{index: 16, indexS: 8, x: 661, y: 101, speaker: 'M', end: 684, highlightA:false, highlightP:true, transcript:"How do you know why she waited?"},
					{index: 17, indexS: 8, x: 674, y: 101, speaker: 'F', end: 783, highlightA:false, highlightP:false, transcript:"Because she knows what I know, that's why.  She's faithful as a rock.  In my darkest moments, I think of her waiting and I know that I'm right."},
					{index: 18, indexS: 9, x: 783, y: 101, speaker: 'M', end: 827, highlightA:true, highlightP:true, transcript:"Hey look, it's a nice day, huh?  Why are we arguing?"},
					{index: 19, indexS: 9, x: 821, y: 101, speaker: 'F', end: 913, highlightA:false, highlightP:false, transcript:"Nobody in this house dares take away her faith, Joe.  You know strangers might, but not his father, not his brother."},
					{index: 20, indexS: 10, x: 906, y: 101, speaker: 'M', end: 949, highlightA:true, highlightP:false, transcript:"What do you want me to do? What do you want?"},
					{index: 21, indexS: 10, x: 923, y: 101, speaker: 'F', end: 1022, highlightA:false, highlightP:false, transcript:"I want you to-- I want you to act like he is coming back, both of you.  Don't think I haven't noticed you since Chris invited her here."},
					{index: 22, indexS: 11, x: 1022, y: 101, speaker: 'F', end: 1058, highlightA:false, highlightP:false, transcript:"I won't stand for any nonsense."},
					{index: 23, indexS: 11, x: 1066, y: 101, speaker: 'M', end: 1082, highlightA:true, highlightP:false, transcript:"Kate."},
					{index: 24, indexS: 12, x: 1082, y: 101, speaker: 'F', end: 1224, highlightA:false, highlightP:false, transcript:"Because if he's not coming back, I'll kill myself.  Oh laugh, laugh all you like but why does this happen the very night he comes back.  She goes to sleep in his room and his memorial breaks in pieces.  Look at it, Joe, look."},
					{index: 25, indexS: 12, x: 1093, y: 101, speaker: 'M', end: 1117, highlightA:false, highlightP:true, transcript:"[BREATHING]"},
					{index: 26, indexS: 13, x: 1212, y: 101, speaker: 'M', end: 1233, highlightA:true, highlightP:true, transcript:"Calm yourself."},
					{index: 27, indexS: 13, x: 1224, y: 101, speaker: 'F', end: 1327, highlightA:false, highlightP:true, transcript:"Just believe with me, Joe. Only last week a man came back in Detroit missing longer than Larry.  Believe with me. You, above all, have got to believe. Just believe."},
					{index: 28, indexS: 14, x: 1241, y: 101, speaker: 'M', end: 1264, highlightA:true, highlightP:true, transcript:"Okay. Calm yourself."},
					{index: 29, indexS: 15, x: 1265, y: 101, speaker: 'M', end: 1338, highlightA:false, highlightP:true, transcript:"I know. All right, all right. All right. Okay.  Calm yourself. What does that mean, me above all?"},
					{index: 30, indexS: 16, x: 1346, y: 101, speaker: 'M', end: 1381, highlightA:true, highlightP:false, transcript:"Look at you, you're shaking."},
					{index: 31, indexS: 14, x: 1379, y: 101, speaker: 'F', end: 1407, highlightA:false, highlightP:false, transcript:"I can't help it."},
					{index: 32, indexS: 17, x: 1409, y: 101, speaker: 'M', end: 1476, highlightA:true, highlightP:false, transcript:"What have I got to hide?  What the hell is the matter with you, Kate?"},
		];

		var minutes = Math.floor(boxes_[boxes_.length - 1].end / 600);
  		var seconds = Math.floor(boxes_[boxes_.length - 1].end / 10 - minutes * 60);

  		var totalTime = this.strPadLeft(minutes, '0', 2) + ':' + this.strPadLeft(seconds, '0', 2);	
		this.setState({boxes: boxes_, totalTimeText: totalTime});
	}


	componentWillUnmount() {
		if (this.condition == "slider") {
        	document.current.removeEventListener("keydown", this.handleKeyPressedForSlider, false);
    	}
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
			that.setState({open: false, resetConfirmOn:false});
		}else {
			that.props.finish();
		}
	}


	onCloseReset() {
		var that = this;
		if(!that.state.reset) {
			that.setState({resetConfirmOn: false});
		}else{
			that.setState({resetConfirmOn: false, reset: false});
		}
	}


	onCloseNext() {
		var that = this;
		if(!that.state.next) {
			that.setState({nextConfirmOn: false});
		}else{
			that.setState({nextConfirmOn: false, next: false, isStarted:false, lastTranscriptM:"", lastTranscriptF:"", currentTranscriptM:"", currentTranscriptF:"", currentIndexM:-1, currentIndexF:-1, atLeastOneRun:false, currentTaskIndex: that.state.currentTaskIndex + 1, speakerToLabel:that.state.taskList[that.state.currentTaskIndex + 1].speaker, dimensionToLabel: that.state.taskList[that.state.currentTaskIndex + 1].dimension});
		}
	}


	onOpen() {
		var that = this;
		that.setState({open: true});
	}


	onSubmit() {
		var that = this;
		if(!that.state.confirmed) {
			var d = new Date();
			var timeStamp = d.toString();
			var timeUsage = Date.now() - that.state.timeStart;
			that.setState({timeStamp: timeStamp, timeUsage: timeUsage},function(){ console.log("timestamp: ", that.state.timeStamp, "time usage: ", that.state.timeUsage); that.sendResult("submit")});
			that.setState({confirmed: true});
		}else {
			that.setState({open: false});
			that.props.finish();
		}
	}


	next() {
		var that= this;
		that.stopPlay();
		var d = new Date();
		var timeStamp = d.toString();
		var timeUsage = Date.now() - that.state.timeStart;
		that.setState({timeStamp: timeStamp, timeUsage: timeUsage,  next: true },function(){ console.log("timestamp: ", that.state.timeStamp, "time usage: ", that.state.timeUsage); that.sendResult("next")});
		//next task to implement
	}


	onNext() {
		var that= this;
		that.setState({nextConfirmOn: true});
	}


	reset() {
		var that = this;
		var d = new Date();
		var timeStamp = d.toString();
		var timeStart = Date.now();
		that.setState({timeStamp: timeStamp, timeStart: timeStart},function(){ console.log("timestamp: ", that.state.timeStamp, "time usage: ", that.state.timeUsage)});
		that.stopPlay();
		that.setState({isStarted: false, reset: true, lastTranscriptM: "", lastTranscriptF: "", currentTranscriptM: "", currentTranscriptF: "", currentIndexM: -1, currentIndexF: -1, atLeastOneRun: false});
		if(that.state.condition == "slider") {
			that.setState({sliderValue: 3});
		}
	}


	onReset() {
		var that = this;
		that.setState({resetConfirmOn: true});
	}


	sendResult(typeSubmit){
		var that = this;

		var childElement = this.comparisonAreaRef.current;
		var sentenceIDs = [];
		var results = [];
		if (that.state.condition != "slider"){
			for(var i = 0; i < childElement.state.boxes.length; i++) {
				console.log("sentence id: ", childElement.state.boxes[i].sentenceID, " result: ", childElement.state.boxes[i].y - 1);
				results.push(childElement.state.boxes[i].y - 1);
				sentenceIDs.push(childElement.state.boxes[i].sentenceID);
			}
		}else{
			for (var key in that.state.sliderResults){
 				 console.log( key, that.state.sliderResults[key] );
 				 sentenceIDs.push(key);
 				 results.push(that.state.sliderResults[key]);
			}
		}

		var http = new XMLHttpRequest();
		var url = 'http://localhost:8080/api/v1/save_label_comparison';
		var data = new FormData();

		data.append("userName", that.state.userName);
		data.append("typeSubmit", typeSubmit);
		data.append("dimension", that.state.dimensionToLabel);
		data.append("dialogueAssignmentID", that.state.assigmentID);
		data.append("speaker", that.state.speakerToLabel[0]);
		data.append("timeUsage", that.state.timeUsage);
		data.append("timeStamp", that.state.timeStamp);
		data.append("sentenceIDs", sentenceIDs);
		data.append("results", results);

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


	getTasks(){
		//to change to task
		var that = this;

		var http = new XMLHttpRequest();
		var url = 'http://localhost:8080/api/v1/get_tasks';
		var data = new FormData();

		data.append("userName", that.state.userName);
		console.log(data.get("userName"));

		http.addEventListener("readystatechange", function() {
			if(this.readyState === 4 ) {
				if(this.status == 200) {
					console.log("Task received!", this.responseText);
					var obj = JSON.parse(http.responseText);
					console.log(obj);
					//add front-end key-value: selectedP, selectedA, selectedD, clickCountP, clickCountA, clickCountD, timeUsage, timeStamp, isLabeled, isInconsistent
					var condition_ = obj.condition;
					if(condition_ == "slider") {
						document.addEventListener("keydown", that.handleKeyPressedForSlider, false);
					}
					var assigmentID_ = obj.assignment_id;
					var audioPath_ = obj.dialogue_path;
					var description_ = obj.dialogue_description;
					var sentences = obj.sentences;
					var boxes_ = [];
					for (var i = 0; i < sentences.length; i++) {
						boxes_.push({sentenceID: sentences[i].ID, index: sentences[i].Index, indexS: sentences[i].IndexS, x: sentences[i].StartTime, y: 101, speaker: sentences[i].Speaker, end: sentences[i].EndTime, highlightA: sentences[i].HighlightA == 1, highlightP: sentences[i].HighlightP == 1, transcript: sentences[i].Transcript});
					}
					var length_ = Math.ceil(boxes_[boxes_.length - 1].end / 100) * 100;

					var minutes = Math.floor(boxes_[boxes_.length - 1].end / 600);
  					var seconds = Math.floor(boxes_[boxes_.length - 1].end / 10 - minutes * 60);

  					var totalTime = that.strPadLeft(minutes, '0', 2) + ':' + that.strPadLeft(seconds, '0', 2);

  					that.setRefs(condition_);
					
					that.setState({ length: length_, totalTimeText: totalTime, boxes: boxes_, condition : condition_, assigmentID: assigmentID_, audioPath: audioPath_, description: description_}, function(){ console.log( "task in state: ", that.state.boxes, that.state.condition, that.state.assigmentID, that.state.audioPath)});
				}else {
					alert('There is a problem with retrieving the speech. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.');
					that.props.finish();
				}
			}
		});

		http.open('POST', url, true);
		http.send(data);
	}

	
	startTask(){
    	var that = this;
    	var d = new Date();
		var timeStamp = d.toString();
		var timeStart = Date.now();
		that.setState({timeStamp: timeStamp, timeStart: timeStart},function(){ console.log("timestamp: ", that.state.timeStamp, "time usage: ", that.state.timeUsage)});
    	that.setState({isPlaying: true, isStarted: true});
    	document.activeElement.blur();
  	}


  	togglePlay(){
    	var that = this;
    	that.setState({isPlaying: !that.state.isPlaying});
  	}


  	stopPlay(){
    	var that = this;
    	that.setState({isPlaying: false});
  	}


  	strPadLeft(string, pad, length) {
    	return (new Array(length + 1).join(pad) + string).slice(-length);
	}


  	updateCurrentTime(time) {
  		var that = this;
  		
  		that.setState({currentTime: time});
  		var minutes = Math.floor(time / 60);
  		var seconds = Math.floor(time - minutes * 60);

  		var finalTime = that.strPadLeft(minutes, '0', 2) + ':' + that.strPadLeft(seconds, '0', 2) + " / " + that.state.totalTimeText;
  		that.setState({currentTimeText: finalTime});

  		if (time * 10 > that.state.boxes[that.state.boxes.length - 1].end) {
  			that.stopPlay();
  		}

  		if (that.state.condition != "slider") {
  			if (time * 10 >= 400) {
  				that.refs.scrollbars.scrollLeft(time*10 - 400);
  			}else {
  				that.refs.scrollbars.scrollLeft(0);
  			}
  		}
  		

  		if (time * 10 >= that.state.boxes[that.state.boxes.length - 1].end && !that.state.atLeastOneRun){
  			console.log("over", time);
  			that.setState({atLeastOneRun: true});
  		}

  		if(that.state.currentIndex == -1 || time * 10 < that.state.boxes[that.state.currentIndex].x || (that.state.currentIndex < that.state.boxes.length - 1 && time * 10 >= that.state.boxes[that.state.currentIndex + 1].x)) {
  			for (var i = 0; i < that.state.boxes.length; i++){
  				if ( time * 10 > that.state.boxes[i].x && time * 10 <= that.state.boxes[i].end) {

  					if (that.state.boxes[i].speaker == 'M' && that.state.boxes[i].transcript != that.state.currentTranscriptM) {
  						if(that.state.condition == "slider" && that.state.speakerToLabel == "Male"){
  							var sliderResults_ = that.state.sliderResults;
  							sliderResults_[that.state.boxes[i].sentenceID] = that.state.sliderValue;
  						}
  						that.setState({currentIndex: i, currentIndexM: i, currentTranscriptM: that.state.boxes[i].transcript, lastTranscriptM: that.state.currentTranscriptM});
  					}
  					if (that.state.boxes[i].speaker == 'F' && that.state.boxes[i].transcript != that.state.currentTranscriptF) {
  						if(that.state.condition == "slider" && that.state.speakerToLabel == "Female"){
  							var sliderResults_ = that.state.sliderResults;
  							sliderResults_[that.state.boxes[i].sentenceID] = that.state.sliderValue;
  						}
  						that.setState({currentIndex: i,  currentIndexF: i, currentTranscriptF: that.state.boxes[i].transcript, lastTranscriptF: that.state.currentTranscriptF});
  					}
  				}
  			}
  		}
  	}


  	updateScrollPosition(positionY) {
  		var that = this;
  		console.log(that.refs.scrollbars.getScrollTop(), positionY);
  		if (that.refs.scrollbars.getScrollTop() - positionY + 1 >= 0) {
  			that.refs.scrollbars.scrollTop(positionY - 1);
  			that.setState({scrollTop: that.refs.scrollbars.getScrollTop()});
  			return;
  		}

  		if (that.refs.scrollbars.getScrollTop() + 250 - positionY + 1 <= 0) {
  			console.log(that.refs.scrollbars.getScrollTop(), positionY, that.refs.scrollbars.getScrollHeight(), that.refs.scrollbars.getClientHeight());
  			that.refs.scrollbars.scrollTop(positionY - 1 - 200 );
  			that.setState({scrollTop: that.refs.scrollbars.getScrollTop()});

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


  	getSliderValue(value) {
  		var that = this;
  		that.setState({sliderValue: value});
  		console.log(that.state.currentIndex, that.state.boxes[that.state.currentIndex].sentenceID, that.state.currentTime, "slider: ", value);
  	}


  	setVolume(value) {
  		var that = this;
  		that.setState({volume: Math.max(value, 0.2)});
  		console.log("volume: ", value);
  	}


  	handleKeyPressedForSlider(event) {
        var that = this;
        if(event.keyCode === 37 && that.state.isStarted) {
        //Do whatever when left is pressed
			console.log("left pressed");
			
        }

        if(event.keyCode === 39 && that.state.isStarted) {
        //Do whatever when right is pressed
            console.log("right pressed");
            
        }
        if(event.keyCode === 38 && that.state.isStarted) {
        //Do whatever when up is pressed
            console.log("up pressed.");
            if (that.state.sliderValue < 5) {
				that.setState({sliderValue: that.state.sliderValue + 1}, function(){console.log(that.state.currentIndex, that.state.currentTime, "slider: ", that.state.sliderValue);});
			}
        }
        if(event.keyCode === 40 && that.state.isStarted) {
        //Do whatever when down is pressed
            console.log("down pressed.");
            if (that.state.sliderValue > 1) {
				that.setState({sliderValue: that.state.sliderValue - 1}, function(){console.log(that.state.currentIndex, that.state.currentTime, "slider: ", that.state.sliderValue);});
  				
			}
        }
    }


    setRefs(condition) {
    	var that = this;
    	var refs_ = {};
		var refPositions_ = {};
		var refTexts_ = {};
		var refNames_ = that.state.refNames;

		if (condition == 'withHighlight'){
			refNames_ = refNames_.filter(name => name != 'sliderRef');
		}else if (condition == 'withoutHighlight') {
			refNames_ = refNames_.filter(name => name != 'sliderRef');
			refNames_ = refNames_.filter(name => name != 'highlightRef');
		}else {
			refNames_ = refNames_.filter(name => name != 'labelRef');
			refNames_ = refNames_.filter(name => name != 'highlightRef');
		}

		for (var i = 0; i < refNames_.length; i++) {
			refs_[refNames_[i]] = React.createRef();
		}

		refPositions_["descriptionRef"] = {top: "top", right: "left"};
		refPositions_["startButtonRef"] = {top: "bottom", left: "left"};
		if(condition != "slider"){
			refPositions_["labelRef"] = {top: "top", right: "left"};
		}
		if(condition == "withHighlight"){
			refPositions_["highlightRef"] = {top: "top", left: "left"};
		}
		if(condition == "slider"){
			refPositions_["sliderRef"] = {top: "bottom", right: "right"};
		}
		refPositions_["resetRef"] = {top: "bottom", left: "left"};
		refPositions_["transcriptRef"] = {top: "top", right: "left"};
		refPositions_["progressNextRef"] = {top: "bottom", left: "left"};

		refTexts_["descriptionRef"] = "Task desription is here. It shows the speaker and the emotion dimension to label.";
		refTexts_["startButtonRef"] = "Click the 'Start' button to start your task. Please note that you cannot stop the task when it's started.";
		if(condition != "slider"){
			refTexts_["labelRef"] = "Use 'Up'and 'Down' keys on your keyboard to label the emtion dimension of the playing sentence, compared with the previous sentence by this speaker. Use 'Left' and 'Right' key to play previous senentence or next sentence.";
		}
		if(condition == "withHighlight"){
			refTexts_["highlightRef"] = "We predict the sentences of small changes in emotion dimension compared to the previous sentence of the same speaker. They are highlighted. The other sentences are not highlighted, means whether they have no changes or have large and detectable changes. Please give your label according to your mind.";
		}
		if(condition == "slider"){
			refTexts_["sliderRef"] = "Slide left or right to give label of the emotion dimension to the current sentences.";
		}
		refTexts_["resetRef"] = "Click 'Reset' button to reset your operations in this task. Just use it when it's really necessary";
		refTexts_["transcriptRef"] = "Speakers' trasncripts are here. The speaker to label is colored. Above the transcripts of current sentences, transcripts of the previous setences by the speaker are shown for reference.";
		refTexts_["progressNextRef"] = "When the audio ends, the task is finished and 'Next' button will be enabled. Click it to navigate to the next task. In the last task, the button will change to 'Submit'. click it to submit all your results of all tasks. The progress of tasks is shown on the right." ;
	
		that.setState({refNames: JSON.parse(JSON.stringify(refNames_)), refs: refs_, refPositions: refPositions_, refTexts: refTexts_});
	}


	render() {
		return(
			<Box pad="xsmall" direction="column" background="#EEEEEE" gap="xsmall">	

				<Card pad="xsmall" gap="xsmall" background="light-1">
						
					<CardHeader pad="xxsmall" justify="start">

						<Box  direction="column" justify="center" align="center">
					
							<Box  direction="row" justify="center" align="center">

								{/*<Box pad="xsmall">
					
									<Button color="dark-3" label="Watch Tips" onClick={() => {this.watchTutorial()}} />
					
								</Box>*/}

								<Box pad="xsmall">

									<Button label="Reset" color="status-critical" ref={this.state.refs['resetRef']} onClick={() => {this.onReset()}} />

								</Box>

								<Box pad="xsmall">

									<Button label="Start" ref={this.state.refs['startButtonRef']} icon={<Play color="status-ok" />} disabled={this.state.isStarted} 
										color={!this.state.isStarted? 'status-ok' : 'status-disabled'} onClick={() => {this.startTask()}} />

								</Box>

								<Box pad="xsmall">

									<Button label={this.state.currentTaskIndex != this.state.taskList.length - 1? "Next" : "Submit"} disabled={!this.state.atLeastOneRun}
										color={this.state.atLeastOneRun? "brand" : "status-disabled"}  onClick={() => {this.state.currentTaskIndex != this.state.taskList.length - 1? this.onNext() : this.onOpen()}} />
					
								</Box>

								<Box pad="xsmall" justify="center" align="center" direction="row" gap="small" ref={this.state.refs['progressNextRef']}>
        				
        							<Meter type="bar" color="brand" background="status-disabled" value={(this.state.currentTaskIndex + 1) / this.state.taskList.length * 100} size="small" thickness="small" />
        				
        							<Text>{this.state.currentTaskIndex + 1} / {this.state.taskList.length}</Text>				
					
								</Box>
				
							</Box> 
						
							<Box ref={this.state.refs['descriptionRef']}>
							
								<Text>Task: In this task, please label the <strong>{this.state.taskList[this.state.currentTaskIndex].dimension}</strong> of the <strong  style={{color: this.state.speakerToLabel == "Female"? this.state.femaleColor:this.state.maleColor}}>{this.state.taskList[this.state.currentTaskIndex].speaker} speaker</strong>. </Text>
						
								<Text>Dialogue Description: {this.state.description} </Text>

							</Box>
						
						</Box>					
					
					</CardHeader>
									
					<CardBody pad="xxsmall">

						
						{this.state.condition != 'slider' && <Box justify="center" align="center" direction="row" ref={this.state.refs['labelRef']}>

								<LeftCoordinate style={{ width: "5%", height: "250px", display: "inline-block"}} dimension={this.state.dimensionToLabel} />
							
						
							<Box ref={this.state.refs['highlightRef']} style={{ width: "95%", height: "250px", display: "inline-block"}} >
							
								<Scrollbars ref="scrollbars" renderTrackHorizontal={props => <div {...props} style={{display:"none"}}/>} renderThumbHorizontal={props => <div {...props} style={{display:"none"}}/>}>
						
									<ComparisonArea isStarted={this.state.isStarted} ref={this.comparisonAreaRef} length={this.state.length} audioPath={this.state.audioPath} condition={this.state.condition} volume={this.state.volume} condition={this.state.condition} boxesPassed={this.state.boxes} scrollTop={this.state.scrollTop} femaleColor={this.state.femaleColor} maleColor={this.state.maleColor} isPlaying={this.state.isPlaying} togglePlay={this.togglePlay} stopPlay={this.stopPlay} reset={this.state.reset} getCurrentTime={this.updateCurrentTime} speaker={this.state.speakerToLabel} dimension={this.state.dimensionToLabel} updateScrollPosition={this.updateScrollPosition} />
						
								</Scrollbars>

							</Box>

						</Box>}

						{this.state.condition == 'slider' && <Box justify="center" pad="medium" gap="medium" direction="row">

							{this.state.isPlaying? <PlayFill color="status-ok" /> : <StopFill color="status-critical" />}

							<AudioProgress length={this.state.boxes[this.state.boxes.length - 1].end / 10} isStarted={this.state.isStarted} audioPath={this.state.audioPath} condition={this.state.condition} volume={this.state.volume} condition={this.state.condition} isPlaying={this.state.isPlaying} reset={this.state.reset} getCurrentTime={this.updateCurrentTime} speaker={this.state.speakerToLabel} dimension={this.state.dimensionToLabel} />

						</Box>}

					
						<Box justify="center" align="center" pad="small">
						
							<Text>{this.state.currentTimeText}</Text>
					
						</Box>
				
						<Box direction="row" justify="center" align="center" >
					
							{this.state.condition != 'slider' && <Box direction="row" gap="small" >
							
								<Box direction="row" gap="xsmall" >
									
									<Box pad="small" background={this.state.speakerToLabel == "Female"? this.state.femaleColor : "status-disabled"} round="xsmall"/> 

									<Text size="small">Female Speaker</Text>

								</Box>

								<Box direction="row" gap="xsmall" > 

									<Box pad="small" background={this.state.speakerToLabel == "Male"? this.state.maleColor : "status-disabled"} round="xsmall"/> 

									<Text size="small">Male Speaker</Text>

								</Box>
						
							</Box>}
						
							<Box  margin={{left:'auto'}} pad={{right: "medium"}}>
						
								<Grommet theme={customThemeRangeInput}>
      							
      								<Box direction="row" align="center" gap="small" background="light-1">
        						
        								<Volume color="brand" />
        								
        								<Box align="center" width="small" >

	          								<RangeInput min={0} max={1} step={0.1} value={this.state.volume} onChange={event => this.setVolume(event.target.value)} />
    	    					
        								</Box>
      						
      								</Box>
    				
    							</Grommet>
						
							</Box>
				
						</Box>
	
						{this.state.condition == 'slider' &&
				 			<Grommet theme={customFocus}>
						
								<Box justify="center" align="center" direction="row" gap="small" pad="small" background="light-1" ref={this.state.refs["sliderRef"]}>

									<Box><Text>Low {this.state.dimensionToLabel}</Text></Box>
									
        							<Box align="center" width="medium"><Slider disabled={!this.state.isStarted} dots step={1} defaultValue={3} min = {1} max = {5} value={this.state.sliderValue} railStyle={{ backgroundColor: '#DADADA'}} trackStyle={{ backgroundColor: '#DADADA'}} handleStyle={{borderColor: '#7D4CDB'}} /></Box>
								
									<Box><Text>High {this.state.dimensionToLabel}</Text></Box>
				
								</Box>
						
							</Grommet>
						}

					</CardBody>

				</Card>

				<Card pad="xsmall" gap="xsmall" background="light-1" ref={this.state.refs["transcriptRef"]}>
						
					<CardHeader pad="xxsmall" justify="start">Transcript</CardHeader>
									
					<CardBody pad="xxsmall">
						
						<Grid rows={['auto']} columns={['1/2', '1/2']} gap="none"
  							areas={[
    							{ name: 'left', start: [0, 0], end: [0, 0] },
    							{ name: 'right', start: [1, 0], end: [1, 0] },
  							]}
						>
  							
  							<Box gridArea="left" background={this.state.speakerToLabel == "Female"? this.state.femaleColor : "status-disabled"} align="center" ><Text><strong>Female Speaker</strong></Text></Box>
							
							<Box gridArea="right" background={this.state.speakerToLabel == "Male"? this.state.maleColor : "status-disabled"} align="center"><Text><strong>Male Speaker</strong></Text></Box>

						</Grid>
						
						<Grid rows={['auto','auto']} columns={['1/2', '1/2']} gap="none"
  							areas={[
    							{ name: 'left-up', start: [0, 0], end: [0, 0] },
    							{ name: 'right-up', start: [1, 0], end: [1, 0] },
    							{ name: 'left-down', start: [0, 1], end: [0, 1] },
    							{ name: 'right-down', start: [1, 1], end: [1, 1] },
  							]}
						>
  							
  							<Box gridArea="left-up" border={{color: 'dark-3', size: 'xsmall'}} pad="xsmall">

  								<Text size="xsmall">last sentence</Text>

  								<Text size="small">{this.state.lastTranscriptF}</Text>

  							</Box>
							
							<Box gridArea="right-up" border={{color: 'dark-3', size: 'xsmall'}} pad="xsmall">
								
								<Text size="xsmall">last sentence</Text>

								<Text size="small">{this.state.lastTranscriptM}</Text>

							</Box>
							
							<Box gridArea="left-down" border={{color: 'dark-3', size: 'xsmall'}} pad="xsmall">

								<Box direction="row" gap="xsmall">

									<Text size="small">current sentence </Text>

									{(this.state.condition != "slider" && this.state.speakerToLabel == "Female") && 
										<Box background={this.state.femaleColor} width="20px" height="20px" round="xsmall" align="center">

											<Text size="small" color="light-1">{this.state.currentIndexF== -1? "" : this.state.boxes[this.state.currentIndexF].indexS + 1}</Text>

										</Box>
									}

								</Box>

								<Text>{this.state.currentTranscriptF}</Text>

							</Box>

							<Box gridArea="right-down" border={{color: 'dark-3', size: 'xsmall'}} pad="xsmall">

								<Box direction="row" gap="xsmall">

									<Text size="small">current sentence </Text>

									{(this.state.condition != "slider" && this.state.speakerToLabel == "Male") && 
										<Box background={this.state.maleColor} width="20px" height="20px" round="xsmall" align="center">

											<Text size="small" color="light-1">{this.state.currentIndexM == -1? "" : this.state.boxes[this.state.currentIndexM].indexS + 1}</Text>

										</Box>
									}
								</Box>

								<Text>{this.state.currentTranscriptM}</Text>

							</Box>
						
						</Grid>
					
					</CardBody>
								
				</Card>

				
				<Grommet>

				 	{this.state.resetConfirmOn && 
				 	<Layer
						id="resetConfirmation"
						position="center"
						onClickOutside={() => {this.onCloseReset()}}>

						<Box pad="medium" gap="small" width="medium">
						
							<Heading level={3} margin="none">Reset</Heading>

							<Text>{this.state.reset ? "This task has been reset." : "Are you sure to reset this task?"}</Text>
							
							<Box
								as="footer"
								gap="small"
								direction="row"
								align="center"
								justify="end"
								pad={{ top: 'medium', bottom: 'small' }}>

								{!this.state.reset && <Button label="Cancel" onClick={() => {this.onCloseReset()}} color="dark-3" />}
							
								<Button
									label={<Text color="white"><strong>{this.state.reset ? "Close" : "Reset"}</strong></Text>}
									onClick={() => {this.state.reset ? this.onCloseReset():this.reset()}}
									primary
									color="status-critical"
								/>

							</Box>

						</Box>

					</Layer>
					}

				</Grommet>

				<Grommet>

				 	{this.state.nextConfirmOn && 
				 	<Layer id="nextConfirmation" position="center" onClickOutside={() => {this.onCloseNext()}}>

						<Box pad="medium" gap="small" width="medium">
						
							<Heading level={3} margin="none">Next</Heading>

							<Text>{this.state.next? "Your results have been recorded. Please go to the next task." : "Are you sure to go to the next task? You cannot go back."}</Text>
							
							<Box as="footer" gap="small" direction="row" align="center" justify="end"pad={{top: 'medium', bottom: 'small'}}>

								{!this.state.next && <Button label="Cancel" onClick={() => {this.onCloseNext()}} color="dark-3" />}
							
								<Button label={<Text color="white"><strong>{this.state.next? "Close" : "Next"}</strong></Text>}
										onClick={() => {this.state.next? this.onCloseNext():this.next()}} primary color="status-ok" />

							</Box>

						</Box>

					</Layer>
					}

				</Grommet>

				<Grommet>

				 	{this.state.open && 
				 	<Layer id="submitConfirmation" position="center" onClickOutside={() => {this.onClose()}}>

						<Box pad="medium" gap="small" width="medium">
						
							<Heading level={3} margin="none">Submit</Heading>

							<Text>{this.state.confirmed? "Thank you! Your results have been recorded." : "Are you sure you want to submit your results?"}</Text>
							
							<Box as="footer" gap="small" direction="row" align="center" justify="end" pad={{top: 'medium', bottom: 'small'}}>

								{!this.state.confirmed && <Button label="Cancel" onClick={() => {this.onClose()}} color="dark-3" />}
							
								<Button
									label={<Text color="white"><strong>{this.state.confirmed? "Close" : "Submit"}</strong></Text>}
									onClick={() => {this.onSubmit()}} primary color="status-critical" />

							</Box>

						</Box>

					</Layer>
					}

				</Grommet>

				<Grommet >
				 	
				 	{this.state.tutorialOn && 
				 	<Drop id="tutorialLayer" modal={false} stretch={false} round="small" elevation="small" background="light-2"
						align={this.state.refPositions[this.state.refNames[this.state.currentRef]]} 
						target={this.state.refs[this.state.refNames[this.state.currentRef]].current}>
					
						<Box width="medium" pad="small">
						
							<Heading level={4} margin="none">{this.state.currentRef + 1}</Heading>

							<Text>{this.state.refTexts[this.state.refNames[this.state.currentRef]]}</Text>
						
							<Box as="footer" gap="small" direction="row" align="center" justify="end" pad ="small">
							
								<Button label={this.state.currentRef == this.state.refNames.length - 1 ? "Close Tips" : "Next"} onClick={() => {this.onNextTutorial()}} color="dark-3" />
						
							</Box>

						</Box>

					</Drop>
					}

				</Grommet>

			</Box>
		)
	}
}
