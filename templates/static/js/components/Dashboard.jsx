import React, { Component } from 'react';
import SemiCircleProgressBar from "react-progressbar-semicircle";
const attrs = ["Horns", "Fur", "Stripes"];
const listItems = attrs.map((attr) =>
  <li>{attr}</li>
);
export default class Dashboard extends Component {
	constructor(props) {
    	super(props);
    	this.state ={
    		accuracy : 0.0,
    		accuracy_str : "0.0%"
    	}

    	this.updateAccuracy = this.updateAccuracy.bind(this);
   }

   updateAccuracy() {
   		var that = this;
   		var http = new XMLHttpRequest();
		  var url = 'http://127.0.0.1:5000/getValidationAccuracy';
		  var params = 'orem=ipsum&name=binny';
		  http.open('POST', url, true);

		  //Send the proper header information along with the request
		  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		  http.onreadystatechange = function() {//Call a function when the state changes.
    		if(http.readyState == 4 && http.status == 200) {
        		//alert(http.responseText);
        		var obj = JSON.parse(http.responseText);
        		that.setState(state => ({
      				accuracy: parseFloat(obj.accuracy),
      				accuracy_str: obj.accuracy +"%"
    			}));
    		}
		  }
		  http.send(params);
   }

   componentDidMount() {
   	    this.updateAccuracy();
   }

    render() {
       return (
       <div>
       <h4>Attributes:</h4>
          <ul>{listItems}</ul>
       <h4>Validation Accuracy: </h4><p>{this.state.accuracy_str}</p>
       <SemiCircleProgressBar percentage={this.state.accuracy} />;
	</div>
       )
    }
}
