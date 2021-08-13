import React, { Component } from 'react';
import {Box, Heading, Text, Form, FormField, TextInput, Button, Grommet, Layer} from 'grommet'; 

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

    this.onLogin = this.onLogin.bind(this);
    this.onClose=this.onClose.bind(this);
    this.userAuthentication = this.userAuthentication.bind(this);
    this.onLoginConfirmed = this.onLoginConfirmed.bind(this);
  }

    onClose() {
        var that = this;
        that.setState({open: false});
    }

    onLogin(value) {
        var that = this;
        console.log(value);
        if (value.email != value.email_again) {
            that.setState({messageOn: true, message: "Email address input mismatched. Please check it again.", messageColor: "status-error"});
        }else{
            that.setState({email :value.email, emailAgain: value.email_again}, function(){ console.log("state information, email: ", that.state.email, " email again: ", that.state.emailAgain), that.userAuthentication()});
        }
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
            <div className="LoginContainer">

                <div style={{height:150}}>
                </div> 

                <Box background="#F7F7F7" gap="medium" align="center" pad="large">
                <Text weight="bold">Log In</Text>
                    <Form
                    onSubmit={({value}) => {this.onLogin(value)}}
                    >
                        <FormField label="Email Address*" name="email" htmlFor="email" required>
                        <TextInput placeholder="your@email.com" name="email" id="email" type = "email" />
                        </FormField>

                        <FormField label="Email Address (again)*" name="email_again" htmlFor="email_again" required>
                        <TextInput placeholder="your@email.com" name="email_again" id="email_again" type = "email" />
                        </FormField>

                        <Button type="submit" label="Log In" />

                        <Text margin={{ left: 'small' }} size="small" color="dark-3">
                        * Required Field
                        </Text>

                    </Form>
                    {this.state.messageOn ? (
                        <Box pad={{ horizontal: 'small' }}>
                            <Text color={this.state.messageColor}>{this.state.message}</Text>
                        </Box>
                    ): null}

                </Box>

                <Grommet >
                    {this.state.open && (
                        <Layer
                            id="loginConfirmation"
                            position="center"
                            onClickOutside={() => {this.onClose()}}
                            onEsc={() => {this.onClose()}}
                        >
                            <Box pad="medium" gap="small" width="medium">
                                <Heading level={3} margin="none">
                                    Confirm
                                </Heading>

                            <Text>Are you sure you want to log in as <strong>{this.state.email}</strong>?</Text> 
                            <Text>We will send the gift card to this email. If you finds errors in the email address, please input it again.</Text>
                            
                            <Box
                                as="footer"
                                gap="small"
                                direction="row"
                                align="center"
                                justify="end"
                                pad={{ top: 'medium', bottom: 'small' }}
                            >
                                <Button label="Input Again" onClick={() => {this.onClose()}} color="dark-3" />
                                <Button
                                    label={
                                    <Text color="white">
                                        <strong>Log In</strong>
                                    </Text>
                                 }
                                onClick={() => {this.onLoginConfirmed()}}
                                primary
                                color="status-ok"
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
