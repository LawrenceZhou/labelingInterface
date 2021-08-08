import React, { Component } from 'react';
import {Box, Heading} from 'grommet'; 


import LabelInstance from './LabelInstance';
import FinishConfirmation from './FinishConfirmation';
import '../../css/LabelInstance.css';


export default class OuterFrame extends Component {
  constructor() {
    super();
    this.state = {
      title: "Emotional Japanese Speech Annotation",
      progress: "label",
    };
    this.finish = this.finish.bind(this);
  }
  
  finish() {
    var that = this;
    that.setState({progress :"finish"});
  }




    render() {

        return(
            <div className="instanceOuterContainer">

                <div style={{height:50}}>
                </div> 

                <div className="TitleLine">
                    <div className="topBarTitle">
                    <Box>
                        <Heading level='2' size='medium'>{this.state.title}</Heading>
                    </Box>
                    </div>
                </div>

                {this.state.progress == "label" ? <LabelInstance finish = {this.finish} />: null}
                {this.state.progress == "finish" ? <FinishConfirmation />: null}

            </div>
        )
    }
}
