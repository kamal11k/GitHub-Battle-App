import React from 'react'
import queryString from 'query-string'
import {battle} from '../utils/api'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const Player = (props)=> (
    <div>
       <h1 className='header'>{props.label}</h1>
       <h3 style={{textAlign: 'center'}}>Score : {props.score}</h3>
    </div>
)

class Result extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        var players = queryString.parse(this.props.location.search);

        battle([players.playerOneName,players.playerTwoName])
            .then((results)=>{
                if(results===null)
                    this.setState(()=>{
                        return {
                            error: 'Looks like there was an error. Check if both users exist on Github.',
                            loading: false
                        }
                    })
                else
                    this.setState(()=>{
                        return {
                            error: null,
                            loading: false,
                            winner: results[0],
                            loser: results[1]
                        }
                    })
            })
    }
    render(){
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;

        if (loading === true) {
          return <p>Loading!</p>
        }

        if(error) {
            return(
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label = 'Winner'
                    score = {winner.score}
                    profile = {winner.profile}
                />
                <Player
                    label = 'Loser'
                    score = {loser.score}
                    profile = {loser.profile}
                />
            </div>
        )
    }
}

export default Result
