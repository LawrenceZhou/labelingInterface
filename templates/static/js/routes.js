import React from 'react';
import { BrowserRouter, HashRouter, Route, hashHistory, browserHistory } from 'react-router-dom';
import OuterFrame from './components/OuterFrame';

// import more components
export default (
    <BrowserRouter>
        <div className="OutContainer">
            <Route path='/' component={OuterFrame} />
        </div>
    </BrowserRouter>
);
