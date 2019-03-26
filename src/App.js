
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Send from './Send';
import Form from './Form';


const App = () => (
    <BrowserRouter>
        <Route path="/" exact component={Send} />
        <Route path="/form/" component={Form} />
    </BrowserRouter>
);

export default App;