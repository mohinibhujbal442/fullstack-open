import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/api/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${response.data.name}`)

        setTimeout(() => setMessage(null), 3000)
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Something went wrong')

        setTimeout(() => setMessage(null), 3000)
      })
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)

    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    axios
      .delete(`http://localhost:3001/api/persons/${id}`)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Something went wrong')

        setTimeout(() => setMessage(null), 3000)
      })
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with{' '}
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>add a new</h2>

      {message && <div>{message}</div>}

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App