
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Send from './Send';
import Form from './Form';
import MgrPortal from './MgrPortal';

const App = () => (
    <BrowserRouter>
        <Switch>
            {/* <Route path="/" exact component={Send} /> */}
            <Route exact={true} path="/" render={props => <Send {...props} /> } />
            {/* <Route path="/form" component={Form} /> */}
            <Route path="/form" render={props => <Form {...props} /> } />
            <Route path="/mgr" component={MgrPortal} />
        </Switch>
    </BrowserRouter>
);

export default App;