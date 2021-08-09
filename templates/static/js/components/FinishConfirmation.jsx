import React, { Component } from 'react';
import {Box, Heading, Text } from 'grommet'; 

import '../../css/LabelInstance.css';


export default class FinishConfirmation extends Component {
  constructor() {
    super();
    this.state = {
      message: "Thank you! Your results have been recorded.",
    };
  }




    render() {

        return(
            <div className="FinishMessageContainer">

                <div style={{height:150}}>
                </div> 

                <div className="TitleLine">
                    <div className="topBarTitle">
                    <Box>
                        <Heading level='1' size='medium'>{this.state.message}</Heading>
                    </Box>
                    </div>
                </div>

            </div>
        )
    }
}
