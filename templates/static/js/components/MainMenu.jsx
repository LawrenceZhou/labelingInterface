import React, { Component } from 'react';
import { Box, Grommet, Text } from 'grommet'; 
import { grommet } from 'grommet/themes';
import { ContactInfo, Notes, Tasks } from 'grommet-icons';

import LabelInstance from './LabelInstance';
import ProgressModule from './ProgressModule';


export default class MainMenu extends Component {
	constructor(props) {
		super(props);

		this.clickSurvey = this.clickSurvey.bind(this);
		this.clickLabel = this.clickLabel.bind(this);
		this.clickQuestionnaire = this.clickQuestionnaire.bind(this);
	}


	clickSurvey() {
		var that = this;
		if (that.props.status == 0) {
			that.props.selectTask("survey");
		}else {
			alert('You already finished this part.');
		}
	}


	clickLabel() {
		var that = this;
		if (that.props.status == 1) {
			that.props.selectTask("label");
		}else if (that.props.status > 1){
			alert('You already finished this part.');
		}else {
			alert('Please finish the Background Survey part first.');
		}
	}


	clickQuestionnaire() {
		var that = this;
		if (that.props.status == 2) {
			that.props.selectTask("questionnaire");
		}else if (that.props.status > 2){
			alert('You already finished this part.');
		}else if (that.props.status == 1){
			alert('Please finish the Labeling Task part first.');
		}else {
			alert('Please finish the Background Survey part first.');
		}
	}


	render() {

		return(
			<Grommet theme={grommet}>

				<Box pad="large" gap="medium" background="#EEEEEE" align="center" justify="center">
				
					<Box  width={this.props.status == 0 ? "large": "medium"}>
						
						<ProgressModule 
							statusColor={this.props.status >= 1 ? "status-disabled" : "accent-1" }
							key="survey"
							clickModule={this.clickSurvey}
							title="Part 1"
							subTitle="Background Survey"
							footer={this.props.status >= 1 ? "Finished" : "Not Finished" }
						>
							
							<ContactInfo size="large" />

						</ProgressModule>
					
					</Box>

					<Box  width={this.props.status == 1 ? "large": "medium"}>
						
						<ProgressModule 
							statusColor={this.props.status >= 2 ? "status-disabled" : this.props.status == 1 ? "accent-1" : "brand" }
							key="label"
							clickModule={this.clickLabel}
							title="Part 2"
							subTitle="Labeling Task"
							footer={this.props.status >= 2 ? "Finished" : "Not Finished" }
						>
									
							<Tasks size="large" />

						</ProgressModule>

					</Box>

					<Box  width={this.props.status == 2 ? "large": "medium"}>
						
						<ProgressModule 
							statusColor={this.props.status >= 3 ? "status-disabled" : this.props.status == 2 ? "accent-1" : "brand" }
							key="questionnaire"
							clickModule={this.clickQuestionnaire}
							title="Part 3"
							subTitle="Questionnaire"
							footer={this.props.status >= 3 ? "Finished" : "Not Finished" }
						>
							
							<Notes size="large" />

						</ProgressModule>

					</Box>

				</Box>

			</Grommet>
		)
	}
}
