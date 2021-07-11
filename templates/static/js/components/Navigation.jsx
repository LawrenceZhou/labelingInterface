import React, { Component } from 'react';
import {Box, Button} from 'grommet'; 

import '../../css/Navigation.css';

export default class Navigation extends Component {
    render() {
       return (
        <div className="navigationContainer">
            <div className="previousBox">
                <Box align="center" pad="medium">
                    <Button label="Previous" onClick={() => {}} />
                </Box>
            </div>

            <div className="nextBox"> 
                <Box align="center" pad="medium">
                    <Button label="Next" onClick={() => {}} />
                </Box>
            </div>
	   </div>
       )
    }
}
