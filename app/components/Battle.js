import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'


class PlayerInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_name :''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        var value = event.target.value;

        this.setState(()=>{
            return{user_name:value
            }});
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.props.id,this.state.user_name);
    }
    render(){
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='user_name'>{this.props.label}</label>
                <input
                    id='user_name'
                    placeholder='github username'
                    type='text'
                    value={this.state.user_name}
                    autoComplete='off'
                    onChange={this.handleChange}
                />
                <button className='button' type='submit' disabled={!this.state.user_name}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleSubmit(id,user_name){
        this.setState(()=>{
            var newState = {};
            newState[id + 'Name'] = user_name;
            newState[id + 'Image'] = 'https://github.com/' + user_name + '.png?size=200'
            return newState;
        });
    }
    handleReset(id) {
        this.setState(()=>{
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }
    render(){
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        return(
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                    />}

                    {playerOneImage!==null &&
                        <PlayerPreview
                            avatar = {playerOneImage}
                            user_name={playerOneName}>
                                <button
                                    className='button'
                                    onClick={this.handleReset.bind(null,'playerOne')}>
                                    Reset
                                </button>
                        </PlayerPreview>}

                    {!playerTwoName &&
                        <PlayerInput
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                    />}

                    {playerTwoImage!==null &&
                        <PlayerPreview
                            avatar = {playerTwoImage}
                            user_name={playerTwoName}>
                                <button
                                    className='button'
                                    onClick={this.handleReset.bind(null,'playerTwo')}>
                                    Reset
                                </button>
                        </PlayerPreview>}
                </div>
                {playerTwoImage && playerOneImage &&
                    <Link
                        className='button'
                        to = {{
                            pathname: match.url +'/results',
                            search: '?playerOneName=' +playerOneName+ '&playerTwoName=' +playerTwoName
                    }}>
                        Battle
                    </Link>}
            </div>
        )
    }
}

export default Battle
