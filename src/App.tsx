import React, {Component, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import  GameHome from "./view/gameHome"
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link,
    Switch,
    withRouter
} from "react-router-dom";
import router from "./router/index"
import  { Request } from "./http/BasicHttp";
//

Request.init()

class App extends Component<any, any>{

    render() {
        return (
            <div style={{height: '100%'}}>
                <Suspense fallback={<></>}>
                    <Router>
                        <Route path={"/"} exact>
                            <Redirect to={"/gameHome"}></Redirect>
                        </Route>
                        <Switch>
                            {
                                router.map(r => (<Route path={r.path} key={r.key}>{r.component}</Route>))
                            }
                        </Switch>
                    </Router>
                </Suspense>
            </div>

        )
    }
}

export default App;
