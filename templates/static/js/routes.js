import React from 'react';
import { BrowserRouter, HashRouter, Route, hashHistory, browserHistory } from 'react-router-dom';
import LabelInstance from './components/LabelInstance';

// import more components
export default (
    <BrowserRouter>
        <div className="OutContainer">
            <Route path='/' component={LabelInstance} />
        </div>
    </BrowserRouter>
);
