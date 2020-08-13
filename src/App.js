import React from 'react';
import './App.css';
import { Action, withStateMachine, State } from 'react-automata'
// import ColorBubbleTray from './ColorBubbleTray'



// ==============================
// React Automata State Chart
// ==============================
const statechart = {
  initial: 'loading',
  states: {
    loading: {
      onEntry: 'readyAction',
      on: {
        READY: 'homeScreenPractice',
      },
    },
    homeScreenPractice: {
      onEntry: 'updateMessage',
      on: {
        SELECT_COLOR: 'homeScreenPractice',
        START_GAME: 'roundN',
      },
    },
    roundN: {
      onEntry: 'roundN',
      on: {
        INCREMENT_ROUND_COUNTER: 'incrementRoundCounter',
      },
    },
    incrementRoundCounter: {
      onEntry: 'incrementRoundCounter',
      on: {
        GO_TO_ATTEMPT_N: 'attemptN',
        NO_MORE_ROUNDS: 'gameOver',
      },
    },
    attemptN: {
      onEntry: 'attemptN',
      on: {
        SELECT_COLOR: 'checkColor',
      },
    },
    checkColor: {
      onEntry: 'checkColor',
      on: {
        CORRECT_GUESS: 'checkSolution',
        INCORRECT_GUESS: 'checkSolution',
      },
    },
    checkSolution: {
      onEntry: 'checkSolution',
      on: {
        CORRECT_SOLUTION: 'playerWinsRound',
        INCORRECT_SOLUTION: 'attemptN',
        INCORRECT_SOLUTION_NO_MORE_ATTEMPTS: 'playerLoosesRound',
      },
    },
    playerWinsRound: {
      onEntry: 'playerWinsRound',
      on: {
        NEXT_ROUND: 'roundN',
        NO_MORE_ROUNDS: 'gameOver'
      },
    },
    playerLoosesRound: {
      onEntry: 'playerLoosesRound',
      on: {
        NEXT_ROUND: 'roundN',
        NO_MORE_ROUNDS: 'gameOver'
      },
    },
    gameOver: {
      onEntry: 'gameOver',
      on: {
        PLAY_AGAIN: 'roundN',
        DONT_PLAY_AGAIN: 'homeScreenPractice',
      }
    }
  },
}



class App extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    round: 0,
    attempt: 0,


  };

  // This binding is necessary to make `this` work in the callback

}

 readyAction = () => {
  this.props.transition('READY')
  // this.setState({round: (this.state.round + 1)})
}


roundN(){
  console.log("Clearing attempts for new round")
  this.props.transition('INCREMENT_ROUND_COUNTER')
  this.setState({attempt: 0})
}


incrementRoundCounter() {
  if (this.state.round >= 3) {
    this.props.transition("NO_MORE_ROUNDS")
  } else {
    this.setState({round: (this.state.round + 1)})
    console.log("Increment Round by one")
    this.props.transition("GO_TO_ATTEMPT_N")
  }
}

attemptN() {
  console.log("attemptN() - user selects color")
  this.props.transition("CHECK_COLOR")
}

checkColor() {
  console.log("this.state.attempt: ", this.state.attempt)
  if (this.state.attempt < 1) {
    this.setState({attempt: (this.state.attempt + 1)})
    this.props.transition("INCORRECT_GUESS")
    console.log("checking color- hard coded INCORRECT_GUESS")
  } else {
    this.setState({attempt: (this.state.attempt + 1)})
    console.log("check color guess - hardcoded correct for now")
    this.props.transition("CORRECT_GUESS")
  }
}

checkSolution() {
  if (this.state.attempt > 1) {
    console.log("check solution - hardcoded correct for now")
    this.props.transition("CORRECT_SOLUTION")
  } else {
    console.log("There has only been one guess. There can't be a solution.")
    this.props.transition("INCORRECT_SOLUTION")
  }
 }


playerWinsRound() {
  console.log("player wins round")
 }


playerLoosesRound() {
  console.log("player looses round")
 }

gameOver() {
  console.log("game over")
  this.setState({attempt: 0})
  this.setState({round: 0})
}

  handleClick = () => {
    this.props.transition('READY')
  }

  render() {
    return (
      <div>

        <p>
         {(this.props.machineState.value)}
        </p>

        <hr/>

        <State is={['homeScreenPractice']}>
          <p>Welcome to twohue, a color mixing game. Practice clicking bubbles before starting.</p>
        </State>

        <State is={['roundN']}>
          <p>New Round. Select a color.</p>
        </State>

        <State is={['attemptN']}>
          <p>Select a color</p>
        </State>


        <State is={['roundFinal']}>
          <p>Choose final color.</p>
        </State>


        <State is={['attemptFinal']}>
          <p>final attempt message.</p>
        </State>


        <State is={['gameOver']}>
          <p>game over</p>
        </State>


        <State is={['playerWinsRound', 'playerLoosesRound']}>
          <button onClick={ () => {
            this.props.transition('NEXT_ROUND')
            console.log('NEXT_ROUND')
          }}>
            NEXT_ROUND
          </button>
        </State>

        <State is={['homeScreenPractice']}>
          <button onClick={ () => {
            this.props.transition('START_GAME')
          }}>
            START_GAME
          </button>
        </State>

        <State is={['gameOver']}>
          <button onClick={ () => {
            this.props.transition('PLAY_AGAIN')
          }}>
            PLAY_AGAIN
          </button>
        </State>

        <State is={['gameOver']}>
          <button onClick={ () => {
            this.props.transition('DONT_PLAY_AGAIN')
          }}>
            DONT_PLAY_AGAIN
          </button>
        </State>

        <State is="homeScreenPractice">practice round</State>

        <State is="loading">SPINNER</State>



        <p>round: {this.state.round}</p>
        <p>attempt: {this.state.attempt}</p>

        <div id="color-bubble-tray">
          <span className="bubble" id="bubble00" onClick={ () => {
              this.props.transition('SELECT_COLOR')

            }}>&nbsp;</span>
          <span className="bubble" id="bubble01" onClick={ () => {
              this.props.transition('SELECT_COLOR')

            }}>&nbsp;</span>
          <span className="bubble" id="bubble02" onClick={ () => {
              this.props.transition('SELECT_COLOR')

            }}>&nbsp;</span>
          <span className="bubble" id="bubble03" onClick={ () => {
              this.props.transition('SELECT_COLOR')

            }}>&nbsp;</span>
          <span className="bubble" id="bubble04" onClick={ () => {
              this.props.transition('SELECT_COLOR')

            }}>&nbsp;</span>
          <span className="bubble" id="bubble05" onClick={ () => {
              this.props.transition('SELECT_COLOR')

            }}>&nbsp;</span>
      </div>

      </div>
    )
  }
}

export default withStateMachine(statechart)(App)

