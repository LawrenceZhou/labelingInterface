import React, { Component } from 'react';
import {Box, Heading, Text, TextArea, Form, FormField, TextInput, Button, Grommet, Layer, RadioButtonGroup } from 'grommet'; 
import { grommet } from 'grommet/themes';


export default class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			easiness: 5,
			helpness: 5,
			satisfaction: 5,
			advantage: "",
			disadvantage: "",
			other: "",
			numberOptions: [{ label: '1', value: 1 }, 
							{ label: '2', value: 2 }, 
							{ label: '3', value: 3 },
							{ label: '4', value: 4 }, 
							{ label: '5', value: 5 }, 
							{ label: '6', value: 6 }, 
							{ label: '7', value: 7 },
							{ label: '8', value: 8 },
							{ label: '9', value: 9 },],
		};

		this.onClose=this.onClose.bind(this);
		this.onSubmit = this.onSubmit.bind(this); 
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
		that.setState({open:true, easiness:value.easiness, satisfaction: value.satisfaction, helpness: value.helpness, advantage:value.advantage, disadvantage:value.disadvantage, other:value.other});
	}


	onSubmitConfirmed() {
		var that = this;
		that.onClose();
		var http = new XMLHttpRequest();
		var url = 'http://localhost:8080/api/v1/save_questionnaire';    
		var data = new FormData();


		data.append("userName", that.props.userName);
		data.append("easiness", that.state.easiness);
		data.append("satisfaction", that.state.satisfaction);
		data.append("helpness", that.state.helpness);
		data.append("advantageComment", that.state.advantage);
		data.append("disadvantageComment", that.state.disadvantage);
		data.append("otherComment", that.state.other);
				
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
				<Grommet theme={grommet}>

					<Box background="light-1" align="center" justify="center" pad="large">

						<Box width="medium">

							<Text weight="bold">Questionnaire on labeling experience</Text>

							<Form onSubmit={({value}) => {this.onSubmit(value)}}>

								<FormField label="Easiness" name="easiness" required>

							 		<Box align="center" pad={{top:"medium", bottom: "medium"}}>

										<RadioButtonGroup
											name="easiness"
											direction="row"
											gap="xsmall"
											options={this.state.numberOptions}/>

									</Box>

								</FormField>

								<FormField label="Satisfaction" name="satisfaction" required>

									<Box align="center" pad={{top:"medium", bottom: "medium"}}>

										<RadioButtonGroup
											name="easiness"
											direction="row"
											gap="xsmall"
											options={this.state.numberOptions}/>

									</Box>

								</FormField>

								<FormField label="Helpness" name="helpness" required>

									<Box align="center" pad={{top:"medium", bottom: "medium"}}>

										<RadioButtonGroup
											name="easiness"
											direction="row"
											gap="xsmall"
											options={this.state.numberOptions}/>

									</Box>

								</FormField>

								<FormField label="Comments on the advatange" name="advantage" required>

									<TextArea name="advantage" placeholder="Tell us about the advantage..." />

								</FormField>

								<FormField label="Comments on the disadvatange" name="disadvantage" required>

									<TextArea name="disadvantage" placeholder="Tell us about the disadvantage..." />

								</FormField>

								<FormField label="Other Comments" name="other" required>

									<TextArea name="other" placeholder="Other comments..." />

								</FormField>


								<Box direction="row" justify="between" margin={{ top: 'medium' }}>

									<Button label="Back" onClick={()=>{this.props.back()}}/>

									<Button type="reset" label="Reset" />

									<Button type="submit" label="Submit" primary />

								</Box>

							</Form>

						</Box>

					</Box>
			
					{this.state.open && 
					<Layer
						id="questionnaireConfirmation"
						position="center"
						onClickOutside={() => {this.onClose()}}
						onEsc={() => {this.onClose()}}>

						<Box pad="medium" gap="small" width="medium">
							
							<Heading level={3} margin="none">Confirm</Heading>

							<Text>Please double check the questionnaire input.</Text>
														
							<Text>Easiness: <strong>{this.state.easiness}</strong></Text> 
														
							<Text>Satisfaction: <strong>{this.state.satisfaction}</strong></Text> 
														
							<Text>Helpness: <strong>{this.state.helpness}</strong></Text> 
														
							<Text>Comments on advantage: <strong>{this.state.advantage}</strong></Text> 
														
							<Text>Comments on disadvantage: <strong>{this.state.disadvantage}</strong></Text> 
														
							<Text>Other comments: <strong>{this.state.other}</strong></Text> 
													
							<Box
								as="footer"
								gap="small"
								direction="row"
								align="center"
								justify="end"
								pad={{ top: 'medium', bottom: 'small' }}>

								<Button label="Cancel" onClick={() => {this.onClose()}} color="dark-3" />
																
								<Button 
									label={<Text color="white"><strong>Submit</strong></Text>}
									onClick={() => {this.onSubmitConfirmed()}}
									primary
									color="status-ok"/>

							</Box>
							
						</Box>
					
					</Layer>
					}
					
					<Box background="#EEEEEE" pad="large" />

			</Grommet>
		)
	}
}
