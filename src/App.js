
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Send from './Send';
import Form from './Form';
import MgrPortal from './MgrPortal';

const App = () => (
    <BrowserRouter>
        <Route path="/" exact component={Send} />
        <Route path="/form/" component={Form} />
        <Route path="/mgr/" component={MgrPortal} />
    </BrowserRouter>
);

export default App;