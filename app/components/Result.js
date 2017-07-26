import React from 'react'
import queryString from 'query-string'
import {battle} from '../utils/api'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'

const Profile = (props)=> {
    console.log(props.info.login)
    var info = props.info;
    return(
        <PlayerPreview user_name={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

const Player = (props)=> (
    <div>
       <h1 className='header'>{props.label}</h1>
       <h3 style={{textAlign: 'center'}}>Score : {props.score}</h3>
       <Profile info={props.profile}/>
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
