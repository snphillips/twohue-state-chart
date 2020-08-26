import React, { Component } from 'react';
import { Action, withStateMachine, State } from 'react-automata'





export default class ScoreBoard extends Component {
  render() {
    return (

      <section className="score-board">

        <State is={['homeScreenPractice']}>
          <button onClick={ () => {
            this.props.transition('START_GAME')
          }}>
            start
          </button>
        </State>


        <State is={['roundN', 'roundFinal', 'incrementRoundCounter', 'attemptN', 'checkColor', 'colorGuessCorrect', 'colorGuessIncorrect', 'checkSolution', 'playerWinsRound', 'playerLoosesRound', 'showSolution', 'playerWinsRoundFinalRound', 'playerLoosesRoundFinalRound']}>
          <p>round: {this.props.round}/{this.props.maxRoundCount}</p>
          <p>attempt: {this.props.attempt}/6</p>
        </State>

        <State is={['roundN', 'roundFinal', 'incrementRoundCounter', 'attemptN', 'checkColor', 'colorGuessCorrect', 'colorGuessIncorrect', 'checkSolution', 'playerWinsRound', 'playerLoosesRound', 'showSolution', 'playerWinsRoundFinalRound', 'playerLoosesRoundFinalRound', 'gameOver']}>
          <p className="score">score: {this.props.score}/12</p>
        </State>

      </section>

    );
  }
}















