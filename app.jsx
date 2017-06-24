
//Libs
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//Css
import './css/style.css';

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
    onScoreChange: PropTypes.func.isRequired
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

    }

    onScoreChange(index, delta) {
        console.log('onScoreChange', index, delta);
        this.state.players[index].score += delta;
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
                            />
                        )
                    })}
                </div>

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