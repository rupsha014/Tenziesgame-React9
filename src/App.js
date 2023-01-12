import logo from './logo.svg';
import './App.css';
import Die from "./Die"
import { nanoid } from "nanoid"
import React from 'react';


function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main className='w-96 ml-auto mr-auto shadow-xl p-8 rounded-lg m-3'>
      <div>
        <h1 className="text-4xl font-bold   ml-20 mb-4">Tenzies</h1>
      </div>
      <div>
        <p className="font-semibold text-lg">Roll until all dice are the same.
          Click each die to freeze it at its current value between rolls.</p>
      </div>

      <div className="flex flex-wrap  space-x-1">
        {diceElements}
      </div>
      <div>
        <button
          className="p-3 bg-blue-600 ml-20 mt-4 pl-10 pr-10 text-lg font-bold text-white rounded-lg"
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>

    </main>
  )
}

export default App;
