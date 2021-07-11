import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';
import Home from './components/Home';
import TopBar from './components/TopBar';
import LabelInstance from './components/LabelInstance';
import Navigation from './components/Navigation';

// import more components
export default (
    <HashRouter history={hashHistory}>
     <div className="OutContainer">
      <Route path='/' component={Home} />
      <Route path='/' component={TopBar} />
      <Route path='/' component={LabelInstance} />
      <Route path='/' component={Navigation} />
     </div>
    </HashRouter>
);
