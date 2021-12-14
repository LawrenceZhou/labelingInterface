import React from 'react';
import ReactDOM from 'react-dom';
import routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Esc"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

ReactDOM.render(routes, document.getElementById("content"));
