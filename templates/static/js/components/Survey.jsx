import React, { Component } from 'react';
import {Box, Heading, Text, Form, FormField, TextInput, Button, Grommet, Layer, CheckBox, RadioButtonGroup, RangeInput, Select } from 'grommet'; 

import { grommet } from 'grommet/themes';
import '../../css/LabelInstance.css';


export default class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "label",
      open: false,
      ageOptions: [],
      age:"under 12",
      gender: "female",
      ethnicity: "asian",
      nationality: "Japan",
      education: "graduate",
      income: "low",

    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose=this.onClose.bind(this);
    this.onSubmitConfirmed = this.onSubmitConfirmed.bind(this);
  }

  componentDidMount(){
    var ageOptions_ = ["under 12"];
    for(var i = 12; i < 76;i++){
      ageOptions_.push(i.toString());
    }
    ageOptions_.push("over 75");

    this.setState({ageOptions: ageOptions_});
  }

    onClose() {
        var that = this;
        that.setState({open: false});
    }

    onSubmit(value) {
        var that = this;
        console.log(value);
        that.setState({open:true, age:value.age, gender: value.gender, ethnicity: value.ethnicity, nationality:value.nationality, education:value.education, income:value.income});
    }


  onSubmitConfirmed() {
    var that = this;
    that.onClose();
    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/api/v1/save_survey';    
    var data = new FormData();


    data.append("userName", that.props.userName);
    data.append("age", that.state.age);
    data.append("gender", that.state.gender);
    data.append("ethnicity", that.state.ethnicity);
    data.append("nationality", that.state.nationality);
    data.append("educationLevel", that.state.education);
    data.append("incomeLevel", that.state.income);
        
    console.log(data.get("userName"));

    http.addEventListener("readystatechange", function() {
        if(this.readyState === 4 ) {
                if(this.status == 200){
            console.log("Submission succeeded!", this.responseText);
                var obj = JSON.parse(http.responseText);
                console.log("Response: ", obj);
                that.onClose();
                that.props.finish();
            }else {
                alert('Submission failed. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.');
                console.log("Submission failed. Please contacted the operator: yijun-z@g.ecc.u-tokyo.ac.jp. Thanks.");
            }
          }
        });

    http.open('POST', url, true);
    http.send(data);

  }


    render() {

        return(
            <div className="SurveyContainer">

      <Box background="#F7F7F7" align="center" justify="center" pad="large">

        <Box width="medium">

        <Text weight="bold">Background Survey</Text>

          <Form
            onSubmit={({value}) => {this.onSubmit(value)}}
          >

            <FormField label="Age" name="age" required>

              <Select name="age" options={this.state.ageOptions} />

            </FormField>

            <FormField label="Gender" name="gender" required>

              <Select name="gender" options={['male', 'female', 'N/A']} />

            </FormField>

             <FormField label="Ethnicity" name="ethnicity" required>

              <Select name="ethnicity" options={['white', 'black', 'asian']} />

            </FormField>

            <FormField label="Nationality" name="nationality" required>

              <Select name="nationality" options={['Japan', 'China', 'United States']} />

            </FormField>

            <FormField label="Education Level" name="education" required>

              <Select name="education" options={['graduate', 'undergraduate', 'middle school']} />

            </FormField>

            <FormField label="Income Level" name="income" required>

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
            
      <Grommet >
                    {this.state.open && (
                        <Layer
                            id="surveyConfirmation"
                            position="center"
                            onClickOutside={() => {this.onClose()}}
                            onEsc={() => {this.onClose()}}
                        >
                            <Box pad="medium" gap="small" width="medium">
                                <Heading level={3} margin="none">
                                    Confirm
                                </Heading>

                            <Text>Please double check the backround information input :</Text>
                            <Text><strong>Age: {this.state.age}</strong></Text> 
                            <Text><strong>Gender: {this.state.gender}</strong></Text> 
                            <Text><strong>Ethnicity: {this.state.ethnicity}</strong></Text> 
                            <Text><strong>Nationality: {this.state.nationality}</strong></Text> 
                            <Text><strong>Education Level: {this.state.education}</strong></Text> 
                            <Text><strong>Income Level: {this.state.income}</strong></Text> 
                          
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
                                onClick={() => {this.onSubmitConfirmed()}}
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
