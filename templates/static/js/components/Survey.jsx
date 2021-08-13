import React, { Component } from 'react';
import {Box, Heading, Text, Form, FormField, TextInput, Button, Grommet, Layer, CheckBox, RadioButtonGroup, RangeInput, Select } from 'grommet'; 

import { grommet } from 'grommet/themes';
import '../../css/LabelInstance.css';


export default class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailAgain: "",
      password: "label",
      open: false,
      messageOn: false,
      mesage: "",
      messageColor: "",
      status: 0,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose=this.onClose.bind(this);
    this.userAuthentication = this.userAuthentication.bind(this);
    this.onLoginConfirmed = this.onLoginConfirmed.bind(this);
  }

    onClose() {
        var that = this;
        that.setState({open: false});
    }

    onSubmit(value) {
        var that = this;
        console.log(value);
    }

    userAuthentication(){
        var that = this;

        var d = new Date();
        var timeStamp = d.toString();

        var http = new XMLHttpRequest();
        var url = 'http://localhost:8080/api/log_in';    
        var data = new FormData();


        data.append("userName", that.state.email);
        data.append("timeStamp", timeStamp);
        
        console.log(data.get("userName"));

        http.addEventListener("readystatechange", function() {
            if(this.readyState === 4 && this.status == 200 ) {
                console.log("Login succeeded!", this.responseText);
                var obj = JSON.parse(http.responseText);
                console.log("Status: ", obj.status);

                that.setState({messageOn: true, message: "Login succeeded!", messageColor: "status-ok", open:true, status: obj.status});
            }else {
                that.setState({messageOn: true, message: "Login failed. Please contacted that operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.", messageColor: "status-error"});
                console.log("Login failed. Please contacted that operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.");
            }
        });

    http.open('POST', url, true);
    http.send(data);

  }

  onLoginConfirmed() {
    var that = this;
    that.onClose();
    that.props.loginSuccess(that.state.email, that.state.password, that.state.status);
  }


    render() {

        return(
            <div className="SurveyContainer">

                <div style={{height:150}}>
                </div> 

      <Box background="#F7F7F7" align="center" justify="center" pad="small">

        <Box width="medium">

        <Text weight="bold">Background Survey</Text>

          <Form
            onSubmit={({value}) => {this.onSubmit(value)}}
          >

            <FormField label="Age" name="age" pad>

              <RangeInput name="age" min={15} max={75} />

            </FormField>

            <FormField label="Gender" name="gender">

              <Select name="gender" options={['male', 'female', 'N/A']} />

            </FormField>

             <FormField label="Ethnicity" name="ethnicity">

              <Select name="ethnicity" options={['white', 'black', 'asian']} />

            </FormField>

            <FormField label="Nationality" name="nationality">

              <Select name="nationality" options={['Japan', 'China', 'United States']} />

            </FormField>

            <FormField label="Education Level" name="education">

              <Select name="education" options={['graduate', 'undergraduate', 'middle school']} />

            </FormField>

            <FormField label="Income Level" name="income">

              <Select name="income" options={['low', 'middle', 'high']} />

            </FormField>


            <Box direction="row" justify="between" margin={{ top: 'medium' }}>

              <Button label="Back" onClick={()=>{this.props.back()}}/>

              <Button type="reset" label="Reset" />

              <Button type="submit" label="Submit" primary />

            </Box>

          </Form>

        </Box>

      </Box>
            </div>
        )
    }
}
