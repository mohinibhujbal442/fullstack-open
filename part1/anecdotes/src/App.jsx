import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later.',
  'The first 90 percent of the code accounts for the first 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.',
  'Programming without an extremely heavy use of console.log is same as driving a car with your eyes closed.'
]

const App = () => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  )

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>

      <p>has {votes[selected]} votes</p>

      <button onClick={vote}>
        vote
      </button>

      <button
        onClick={() =>
          setSelected(
            Math.floor(Math.random() * anecdotes.length)
          )
        }
      >
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>

      <p>{anecdotes[maxIndex]}</p>

      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App