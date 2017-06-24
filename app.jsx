
//Libs
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//Css
import './css/style.css';

var nextId = 4;

var PLAYERS = [
    { 
        name: 'Jim Hoskins',
        score: 31,
        id: 1
    },
    { 
        name: 'Andrew Chakley',
        score: 35,
        id: 2
    },
    { 
        name: 'Alena Hooligan',
        score: 42,
        id: 3
    }
];

class AddPlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};

        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameChange(e) {
        console.log('onNameChange', e.target.value);
        this.setState({name: e.target.value});
        
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onAdd(this.state.name);
        this.setState({name: ''})
    }

    render() {
        return (
            <div className="add-player-form">
                <form action="" onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/>
                    <input type="submit" value="Add Player" />
                </form>
            </div>
        )
    }
}

AddPlayerForm.propTypes = {
    onAdd: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

AddPlayerForm.defaultProps = {
    name: "Scoreboard"
}


function Stats(props) {
    var totalPlayers = props.players.length;
    var totalPoints = props.players.reduce((total, player,) => {
        return total + player.score;
    }, 0);

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <td>Players</td>
                    <td>{totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total Points:</td>
                    <td>{totalPoints}</td>
                </tr>
            </tbody>
        </table>
    )
}

Stats.propTypes = {
    players: PropTypes.array.isRequired
}


function Header(props) { 
    return (
        <div className="header">
            <Stats players={props.players}/>
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
};

Header.defaultProps = {
    title: "Scoreboard"
}


function Player(props) {
    return (
        <div className="player">
            <div className="player-name">
                <a className="remove-player" onClick={props.onRemove}>X</a>
                {props.name}
            </div>
            <div className="player-score">
               <Counter score={props.score} onChange={props.onScoreChange}/>
            </div>
        </div>
    );
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
}


function Counter(props) {
    return (
        <div className="counter">
            <button className="counter-action decrement" onClick={function() {props.onChange(-1)}} > - </button>
            <div className="counter-score">{props.score}</div>
            <button className="counter-action increment" onClick={function() {props.onChange(1)}} > + </button>
        </div>
    );
}

Counter.propTypes = {
    score: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.initialPlayers,
        };

        this.onPlayerAdd = this.onPlayerAdd.bind(this);
        this.onRemovePlayer = this.onRemovePlayer.bind(this);
    }

    onScoreChange(index, delta) {
        console.log('onScoreChange', index, delta);
        this.state.players[index].score += delta;
        this.setState(this.state);
    }

    onPlayerAdd(name) {
        console.log('Player added:', name);
        this.state.players.push({
            name: name,
            score: 0,
            id: nextId
        });
        this.setState(this.state);
        nextId += 1;
    }

    onRemovePlayer(index) {
        console.log(index);
        this.state.players.splice(index, 1);
        this.setState(this.state);
    }

    render() {
        return (
            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players} />

                <div className="players">
                    {this.state.players.map((player, index) => {
                        return (
                            <Player 
                                key={player.id} 
                                name={player.name} 
                                score={player.score} 
                                onScoreChange={(delta) => {this.onScoreChange(index, delta)}}
                                onRemove={() => {
                                   this.onRemovePlayer(index)
                                }}
                            />
                        )
                    })}
                </div>
                <AddPlayerForm onAdd={this.onPlayerAdd} />
            </div>
        );
    }
}

// function Application(props) {
//     return (
//         <div className="scoreboard">
//             <Header title={props.title} />

//             <div className="players">
//                 {props.players.map(function(player) {
//                     return <Player key={player.id} name={player.name} score={player.score} />
//                 })}
//             </div>

//         </div>
//     );
// }

Application.propTypes = {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    })).isRequired
};

Application.defaultProps = {
    title: "Scoreboard"
}



ReactDOM.render(
    <Application initialPlayers={PLAYERS} />,
    document.getElementById('container')
);