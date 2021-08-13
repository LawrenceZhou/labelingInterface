import React, { Component } from 'react';
import {Box, Heading} from 'grommet'; 


import Login from './Login';
import MainMenu from './MainMenu';
import Survey from './Survey';
import Questionnaire from './Questionnaire';
import LabelInstance from './LabelInstance';
import FinishConfirmation from './FinishConfirmation';
import '../../css/LabelInstance.css';


export default class OuterFrame extends Component {
  constructor() {
    super();
    this.state = {
      title: "Emotional Japanese Speech Annotation",
      progress: "login",
      username: "",
      password: "",
      status: 0,
    };
    this.loginSuccess = this.loginSuccess.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.finish = this.finish.bind(this);
    this.back = this.back.bind(this);
  }
  
  loginSuccess(userName, password, status) {
    var that = this;
    that.setState({progress :"main", userName: userName, password: password, status: status});
  }

  selectTask(taskName) {
    var that = this;
    that.setState({progress :taskName});
  }

  finish() {
    var that = this;
    that.setState({status: that.state.status + 1}, function(){that.setState({progress :"main"})});
  }

  back() {
    var that = this;
    that.setState({progress :"main"});
  }




    render() {

        return(
            <div className="outerContainer">

                <div style={{height:50}}>
                </div> 

                <div className="TitleLine">
                    <div className="topBarTitle">
                    <Box>
                        <Heading level='2' size='medium'>{this.state.title}</Heading>
                    </Box>
                    </div>
                </div>

                {this.state.progress == "login" ? <Login loginSuccess = {this.loginSuccess} />: null}
                {this.state.progress == "main" ? <MainMenu userName = {this.state.userName} status = {this.state.status} selectTask = {this.selectTask} />: null}
                {this.state.progress == "survey" ? <Survey finish = {this.finish} back= {this.back} userName = {this.state.userName} password = {this.state.password} />: null}
                {this.state.progress == "label" ? <LabelInstance finish = {this.finish} userName = {this.state.userName} password = {this.state.password} />: null}
                {this.state.progress == "questionnaire" ? <Questionnaire finish = {this.finish} back= {this.back} userName = {this.state.userName} password = {this.state.password} />: null}
                {this.state.progress == "finish" ? <FinishConfirmation />: null}

            </div>
        )
    }
}
