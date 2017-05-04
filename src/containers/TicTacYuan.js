import React, {Component} from 'react'
import {Stage} from 'react-konva'
import {Board, Squares} from '../styled/TicTacYuan'
import Relay from 'react-relay'

class TicTacYuan extends Component {

    // We need an array of all the winning functions, we hard coded it
    constructor(props) {
        super(props)
        this.combos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
    }
    // plan out what you want here
    state = {
        rows: 3,
        gameState: new Array(9).fill(false),
        ownMark: 'X',
        otherMark: 'O',
        gameOver: false,
        yourTurn: true,
        winner: false,
        win: false
    }

    componentWillMount() {
        // when my component mounts onto the DOM do this...
        let height = window.innerHeight
        let width = window.innerWidth
        let size = (height < width) ? height * .8 : width * .8
        let rows = this.state.rows
        let unit = size / rows
        let coordinates = []

        for (let y = 0; y < rows; y++) {        // we want 9 coordinates
            for (let x = 0; x < rows; x++) {
                coordinates.push([x*unit, y*unit])
            }
        }

        this.setState({
            size, //es6 shorthand instead of size: size
            rows,
            unit,
            coordinates
        })
    }

    move = (index, marker) => {
        // using prevState: Right before we made the move, what was the state like?
        this.setState( (prevState, prop) => {
            let {gameState, yourTurn, gameOver, winner} = prevState
            yourTurn = !yourTurn
            gameState.splice(index, 1, marker) // look at the location index of our move, take that one element and replace it with our marker
            let foundWin = this.winChecker(gameState)
            if (foundWin) {
                winner = gameState[foundWin[0]]
            }
            if (foundWin || !gameState.includes(false)) { //blank squares are false, we are checking to see if this is true
                // if we found a winner or there are no more blank squares, game over.
                gameOver = true
            }
            if (!yourTurn && !gameOver) { //if it's not your turn, and game is still not over, AI will make a move.
                this.makeAiMove(gameState)
            }
            return {          //this is the new state we set after the move
                gameState,
                yourTurn,
                gameOver,
                win: foundWin || false,
                winner
            }
        })
    }

    makeAiMove = (gameState) => {
        //placeholders for actions
        let otherMark = this.state.otherMark
        let openSquares = []
        gameState.forEach( (square, index) => {
            if (!square) {
                openSquares.push(index)
            }
        })
        let aiMove = openSquares[this.random(0, openSquares.length)]
        setTimeout(() => {
            this.move(aiMove,otherMark)
        }, 1000*this.random(0, openSquares.length))
    }

    // a utility function, to generate a random number
    random = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max-min)) + min
    }

    winChecker = (gameState) => {
        let combos = this.combos
        // find refers to find within an array
        return combos.find( (combo) => {
            let [a,b,c] = combo
            return (gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a])
        })
    }
    turningTest = () => {
        //placeholders for actions
    }

    recordGame = () => {
        //placeholders for actions
    }

    render() {
        let {
            size,
            unit,
            rows,
            coordinates,
            gameState,
            win,
            gameOver,
            yourTurn,
            ownMark
        } = this.state

        return (
            <div>
                <Stage
                    width={size}
                    height={size}
                >
                    <Board
                        unit={unit}
                        rows={rows}
                        size={size}
                    />
                    <Squares
                        unit={unit}
                        coordinates={coordinates}
                        gameState={gameState}
                        win={win}
                        gameOver={gameOver}
                        yourTurn={yourTurn}
                        ownMark={ownMark}
                        move={this.move}
                    />
                </Stage>
            </div>
        )
    }
}

export default Relay.createContainer(
    TicTacYuan, {
        fragments: {
            viewer: () => Relay.QL`
                fragment on Viewer {
                    user {
                        id
                    }
                }
            `,
        }
    }
)