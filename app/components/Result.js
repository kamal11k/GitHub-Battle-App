import React from 'react'
import queryString from 'query-string'
import {battle} from '../utils/api'


class Result extends React.Component {
    componentDidMount(){
        var players = queryString.parse(this.props.location.search);

        battle([players.playerOneName,players.playerTwoName])
            .then((results)=>{
                console.log(results)
            })
    }
    render(){
        return (
            <div>Result page</div>
        )
    }
}

export default Result
