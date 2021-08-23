import React, { Component } from 'react';
import {Grommet, Box, Heading, Tip, Text, DropButton} from 'grommet'; 
import { grommet } from 'grommet/themes';
import { User } from 'grommet-icons';

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
      userName: "",
      password: "",
      status: 0,
      login: false,
    };
    this.loginSuccess = this.loginSuccess.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.finish = this.finish.bind(this);
    this.back = this.back.bind(this);
  }
  
  loginSuccess(userName, password, status) {
    var that = this;
    that.setState({progress :"main", userName: userName, password: password, status: status, login: true});
  }

  logOut() {
    var that = this;
    that.setState({progress :"login", login: false});
  }

  selectTask(taskName) {
    var that = this;
    that.setState({progress :taskName});
  }

  back() {
    var that = this;
    that.setState({progress :"main"});
  }

  finish() {
    var that = this;

    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/api/v1/get_status';    
    var data = new FormData();


    data.append("userName", that.state.userName);
        
    console.log(data.get("userName"));

    http.addEventListener("readystatechange", function() {
            if(this.readyState === 4 ) {
                if(this.status == 200){
                    console.log("Status retrieved!", this.responseText);
                    var obj = JSON.parse(http.responseText);
                    console.log("Status: ", obj.status);

                    that.setState({status: obj.status}, function(){that.setState({progress :"main"})});
                }else {
                    alert('Status retrieval failed. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.');
                    console.log("Status retrieval failed. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.");
                }
            }
        });

    http.open('POST', url, true);
    http.send(data);
  }




    render() {

        return(
            <div className="outerContainer"> 
                <Grommet theme={grommet}>
                <Box background="#EEEEEE" pad="small">
                    <Text color="status-critical" textAlign="center"><strong>Please DO NOT click the Back or Refesh button of the browser.</strong></Text>
                </Box>
                <Box background="#EEEEEE" pad="large">
                    <Heading level='2' size='medium' textAlign="center">{this.state.title}</Heading>
                </Box>
                {this.state.status==3 && <Box background="#EEEEEE" pad="small">
                    <Text textAlign="center">You have finish the whole experiment. Please logout or close this page. Thank you!</Text>
                </Box>}
                {this.state.login?<Box background="#EEEEEE" pad={{left:"80%"}}>
                <DropButton
                  dropAlign={{ top: 'bottom', right: 'right' }}
                  dropContent={<Box pad="medium" onClick={() => {this.logOut()}} >Logout</Box>}>
                  <User size="medium" />
                </DropButton>
                <Text>Login as: {this.state.userName}</Text>
                <Box background="#EEEEEE" pad="xsmall" />
                </Box> : null}  

                {this.state.progress == "login" ? <Login loginSuccess = {this.loginSuccess} />: null}
                {this.state.progress == "main" ? <MainMenu userName = {this.state.userName} status = {this.state.status} selectTask = {this.selectTask} />: null}
                {this.state.progress == "survey" ? <Survey finish = {this.finish} back= {this.back} userName = {this.state.userName} password = {this.state.password} />: null}
                {this.state.progress == "label" ? <LabelInstance finish = {this.finish} userName = {this.state.userName} password = {this.state.password} />: null}
                {this.state.progress == "questionnaire" ? <Questionnaire finish = {this.finish} back= {this.back} userName = {this.state.userName} password = {this.state.password} />: null}
                {this.state.progress == "finish" ? <FinishConfirmation />: null}

                </Grommet>
            </div>
        )
    }
}
