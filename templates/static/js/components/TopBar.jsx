import React, { Component } from 'react';
import {Grid, Box, Text, Button, Heading, CheckBox, Clock, Menu} from 'grommet'; 
import '../../css/TopBar.css';


const attrs = ["Horns", "Fur", "Stripes"];

const listItems = attrs.map((attr) =>
  <li>{attr}</li>
);

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            title: "Emotional Japanese Speech Annotation",
            userID: "1234",
            instanceID: "12",
            instanceList: [{lable: "1/50", onClick: () => {}}, {lable: "2/50", onClick: () => {}}, {lable: "3/50", onClick: () => {}}],
        };
    }

    render() {
        return (
            <div className="topBarOuterContainer">
                <div className="TitleLine">
                    <div className="topBarTitle">
                        <Box>
                            <Heading level='2' size='medium'>{this.state.title}</Heading>
                        </Box>
                    </div>
                </div>
                <div className="NavigationLine">
                    <div className="userID">
                        <Box>
                            <Text>User ID: {this.state.userID}</Text>
                        </Box>
                    </div>
                    <div className="timeUsage">
                        <Box>
                            <Text>Time: </Text>
                            <Clock type="digital" time="PT0H0M0S" run="forward" />
                        </Box>
                    </div>
                    <div className="instanceID">
                        <Box>
                            <Text>Instance ID: {this.state.instanceID}</Text>
                        </Box>
                    </div>
                    <div className="instanceList">
                        <Box>
                            <Menu dropProps={{align:{top:'bottom', left:'left'}}} label="all utterances" items={[
                                { label: 'First Action', onClick: () => {} },
                                { label: 'Second Action', onClick: () => {} },
                            ]} />
                        </Box>
                    </div>
                </div>
	        </div>
       )
    }
}
