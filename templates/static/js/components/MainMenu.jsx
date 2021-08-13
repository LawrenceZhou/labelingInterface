import React, { Component } from 'react';
import { Box, Card, CardBody, CardFooter, Grid, Grommet, Text } from 'grommet'; 
import { ContactInfo, Notes, Tasks } from 'grommet-icons';

import '../../css/LabelInstance.css';


const theme = {
  global: {
    font: {
      family: `-apple-system,
         BlinkMacSystemFont, 
         "Segoe UI"`,
    },
    colors: {
      blue: '#00C8FF',
      green: '#17EBA0',
      teal: '#82FFF2',
      purple: '#F740FF',
      red: '#FC6161',
      orange: '#FFBC44',
      yellow: '#FFEB59',
      grey: '#CCCCCC',
    },
  },

  card: {
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
      background: '#FFFFFF27',
    },
  },
};


const Identifier = ({ children, title, subTitle, size }) => (
  <Box gap="small" align="center" >
    {children}
    <Box>
      <Text size={size}>
        {title}
      </Text>
      <Text size={size}  weight="bold">{subTitle}</Text>
    </Box>
  </Box>

);



export default class MainMenu extends Component {
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
    };
    this.clickSurvey = this.clickSurvey.bind(this);
    this.clickLabel = this.clickLabel.bind(this);
    this.clickLabel = this.clickLabel.bind(this);
  }

  clickSurvey() {
    var that = this;
    if (that.props.status == 0) {
      that.props.selectTask("survey");
    }else{
      alert('You already finished this part.');
    }
  }

  clickLabel() {
    var that = this;
    if (that.props.status == 1) {
      that.props.selectTask("label");
    }else if(that.props.status > 1){
      alert('You already finished this part.');
    }else{
      alert('Please finish the Background Survey part first.');
    }
  }

  clickQuestionnaire() {
    var that = this;
    if (that.props.status == 2) {
      that.props.selectTask("questionnaire");
    }else if(that.props.status > 2){
      alert('You already finished this part.');
    }else if(that.props.status == 1){
      alert('Please finish the Labeling Task part first.');
    }else {
      alert('Please finish the Background Survey part first.');
    }
  }



    render() {

        return(
            <div className="MainMenuContainer">

                <div style={{height:150}}>
                </div> 
                <Text>Your email: {this.props.userName}</Text>
                 <Grommet theme={theme}>

    <Box pad="large" gap="medium" width="large"  align="center" justify="center">

        <Box   width={this.props.status == 0 ? "large": "medium"}>
          <Card background={this.props.status >= 1 ? "grey" : "yellow"} key="survey" onClick={() => {this.clickSurvey()}}>
            <CardBody pad="small">
              <Identifier
                pad="small"
                title="Part 1"
                subTitle="Background Survey"
                size="small"
                align="start"
              >
                <ContactInfo size="large" />
              </Identifier>
            </CardBody>
            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text size="xsmall">{this.props.status >= 1 ? "Finished" : "Not Finished" }</Text>
            </CardFooter>
          </Card>
          </Box>

        <Box  width={this.props.status == 1 ? "large": "medium"}>
          <Card background={this.props.status >= 2 ? "grey" : this.props.status == 1 ? "yellow" : "green" } key="label" onClick={() => {this.clickLabel()}}>
            <CardBody pad="small">
              <Identifier
                pad="small"
                title="Part 2"
                subTitle="Labeling Task"
                size="small"
                align="start"
              >
                <Tasks size="large" />
              </Identifier>
            </CardBody>
            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text size="xsmall">{this.props.status >= 2 ? "Finished" : "Not Finished" }</Text>
            </CardFooter>
          </Card>
          </Box>
        
        <Box  width={this.props.status == 2 ? "large": "medium"}>
          <Card background={this.props.status >= 3 ? "grey" : this.props.status == 2 ? "yellow" : "green" } key="questionnaire" onClick={() => {this.clickQuestionnaire()}}>
            <CardBody pad="small">
              <Identifier
                pad="small"
                title="Part 3"
                subTitle="Questionnaire"
                size="small"
                align="start"
              >
                <Notes size="large" />
              </Identifier>
            </CardBody>
            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text size="xsmall">{this.props.status >= 3 ? "Finished" : "Not Finished" }</Text>
            </CardFooter>
          </Card>
          </Box>


    </Box>
  </Grommet>
            </div>
        )
    }
}
