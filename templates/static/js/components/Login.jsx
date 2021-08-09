import React, { Component } from 'react';
import {Box, Heading, Text, Form, FormField, TextInput, Button} from 'grommet'; 
import { Hide, View } from 'grommet-icons';

import '../../css/LabelInstance.css';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reveal: false,
      email: "",
      password: "",
    };

    this.onReveal = this.onReveal.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.userAuthentication = this.userAuthentication.bind(this);
  }

    onReveal() {
        var that = this;
        that.setState({reveal :!that.state.reveal});
    }

    onLogin(value) {
        var that = this;
        console.log(value);
        that.setState({email :value.email, password: value.password}, function(){ console.log("state information, email: ", that.state.email, " password: ", that.state.password), that.userAuthentication()});
    }

    userAuthentication(){
        var that = this;

        var http = new XMLHttpRequest();
        var url = 'http://localhost:8080/api/log_in';    
        var data = new FormData();


        data.append("userName", that.state.email);
        data.append("password", that.state.password);
        console.log(data.get("userName"));

        http.addEventListener("readystatechange", function() {
            if(this.readyState === 4 && this.status == 200 ) {
                console.log("Login succeeded!", this.responseText);
                that.props.loginSuccess(that.state.email, that.state.password);
            }else {
                console.log("Email and password didn't match.");
            }
        });

    http.open('POST', url, true);
    http.send(data);

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
                        <FormField label="Email*" name="email" htmlFor="email" required>
                        <TextInput placeholder="your@email.com" name="email" id="email" type = "email" />
                        </FormField>

                        <FormField label="Password*" name="password" htmlFor="password" required>
                        <Box
                        direction="row"
                        align="center"
                        >
                        <TextInput placeholder="your password" 
                        plain
                        name="password"
                        id="password"
                        type={this.state.reveal ? 'text' : 'password'}
                        />
                        <Button
                        icon={this.state.reveal ? <View size="medium" /> : <Hide size="medium" />}
                        onClick={() => this.onReveal()}
                        />
                        </Box>
                        </FormField>

                        <Button type="submit" label="log in" />

                        <Text margin={{ left: 'small' }} size="small" color="status-critical">
                        * Required Field
                        </Text>

                    </Form>

                </Box>

            </div>
        )
    }
}
