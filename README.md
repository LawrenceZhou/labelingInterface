
# Emotional Speech Labeling Interface ( Full-Stack App Built with Go(Gin), NPM, Webpack, and Reactjs)

## About
Project targeting to augment human's engagement in AI-assisted music composition system


## Instructions
Below are the installing and running procedues

### Installing
1. Requirement: python3, pip3 node, and npm(**python3 v3.6.8**, **pip3 v9.0.1**, **node v12.13.0**, **npm v6.12.0**)
`curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
`sudo apt-get install nodejs`
2. Enter in to the directary *templates/static/* and run the command `npm install`. (Download and install all the dependencies listed in *package.json*.)
3. In the static directory, build the front end code with the command `npm run build`
4. Install flask and flask_restful with the command `$ pip3 install flask` and `pip3 install flask_restful`
5. Install Reactjs with the command `$ npm i react react-dom --save-dev`

### Running
1. Go to the root directory and start the server with `python3 run.py`
2. If all is working correctly, check the address http://127.0.0.1:8080/ which you can open in your  browser and see the application running.
