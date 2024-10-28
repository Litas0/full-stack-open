import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}> {props.text} </button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const [bestAnecdote, setBest] = useState(0)

  const handleNext = () => {
    var next = Math.floor(Math.random() * (8))
    while (next == selected) next = Math.floor(Math.random() * (8))
    setSelected(next)
  }

  const handleUpvote = () => {
    const copy = [...points]
    copy[selected] += 1
    if (copy[selected] > copy[bestAnecdote]) setBest(selected)
    setPoints(copy)
  }
  
  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p> {anecdotes[selected]} </p>
      <Button text="Next anecdote" handleClick={handleNext} />
      <Button text="Upvote this anecdote" handleClick={handleUpvote} />
      <h2> Anecdote with most upvotes </h2>
      <p> {anecdotes[bestAnecdote]} </p>
    </div>
  )
}

export default App