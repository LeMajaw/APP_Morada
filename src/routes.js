import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Moradas from './pages/Moradas';
import NovaMorada from './pages/NovaMorada'

export default function Routes(){
    return (
        <BrowserRouter>
           <Switch>
               <Route path="/" exact component={Login}/>
               <Route path="/moradas" component={Moradas}/>
               <Route path="/morada/nova/:moradaId" component={NovaMorada}/>
               {/* <Route path="/"exact component={Moradas}/>
               <Route path="/morada/nova/:moradaId" component={NovaMorada}/> */}
            </Switch>
        </BrowserRouter>    
    );
}