//Libs
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//Css
import './css/style.css';

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
               <Counter score={props.score} />
            </div>
        </div>
    );
}

Player.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
}


function Counter(props) {
    return (
        <div className="counter">
            <button className="counter-action decrement"> - </button>
            <div className="counter-score">{props.score}</div>
            <button className="counter-action increment"> + </button>
        </div>
    );
}

Counter.propTypes = {
    score: PropTypes.number.isRequired
}

function Application(props) {
    return (
        <div className="scoreboard">
            {/*<div className="header">
                <h1>{props.title}</h1>
            </div>*/}
            <Header title={props.title} />

            <div className="players">
                <Player name="Jim Hoskins" score={31} />
                {/*<div className="player">
                    <div className="player-name">
                        Jim Hoskins
                    </div>
                    <div className="player-score">
                        <div className="counter">
                            <button className="counter-action decrement"> - </button>
                            <div className="counter-score">31</div>
                            <button className="counter-action increment"> + </button>
                        </div>
                    </div>
                </div>*/}
                
                <Player name="Andrew Chalkley" score={33} />
                {/*<div className="player">
                    <div className="player-name">
                        Andrew Chalklay
                    </div>
                    <div className="player-score">
                        <div className="counter">
                            <button className="counter-action decrement"> - </button>
                            <div className="counter-score">43</div>
                            <button className="counter-action increment"> + </button>
                        </div>
                    </div>
                </div>*/}
            </div>

        </div>
    );
}

// Application.propTypes = {
//     title: PropTypes.string,
// };

// Application.defaultProps = {
//     title: "Scoreboard"
// }



ReactDOM.render(
    <Application />,
    document.getElementById('container')
);