
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

function Header(props) { 
    return (
        <div className="header">
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
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

// var Counter = React.createClass({
//     render: function() {
//          return (
//             <div className="counter">
//                 <button className="counter-action decrement"> - </button>
//                 <div className="counter-score">{this.props.score}</div>
//                 <button className="counter-action increment"> + </button>
//             </div>
//         );
//     }
// });

// class Counter extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             score: this.props.initialScore
//         };

//         this.incrementScore = this.incrementScore.bind(this);
//         this.decrementScore = this.decrementScore.bind(this);
//     }

//     incrementScore(e) {
//         console.log('increment score', e);
//         console.log(this.state)
//         this.setState({
//             score: (this.state.score + 1)          
//         })
//     }

//     decrementScore(e) {
//         console.log('decrement score', e);
//         console.log(this.state)
//         this.setState({
//             score: (this.state.score - 1)          
//         })
//     }

//     render() {
//         return (
//             <div className="counter">
//                 <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
//                 <div className="counter-score">{this.state.score}</div>
//                 <button className="counter-action increment" onClick={this.incrementScore}> + </button>
//             </div>
//         );
//     }
// }

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

// Counter.propTypes = {
//     initialScore: PropTypes.number.isRequired
// }


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
                <Header title={this.props.title} />

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