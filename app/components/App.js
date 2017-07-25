import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Popular from './Popular'


import BasicExample from './test'

export default class App extends React.Component {
    render(){
        return(
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route path='/' component={Home} />
                        <Route path='/Popular' component={Popular} />
                        <Route path='/Battle' component={Battle} />
                        <Route render= {()=>{
                            return <p>Not Found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

