const App = () => {
  const name = 'Arto Hellas'

  const names = ['Peter', 'Maya', 'John']

  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        <h2>{name}</h2>
      </div>

      <h2>Numbers</h2>

      <div>
        {names.map(name => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </div>
  )
}

export default App