import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearchChange = event => {
    const value = event.target.value

    setSearch(value)

    if (value === '') {
      setCountries([])
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const allCountries = response.data

        const filteredCountries = allCountries.filter(country =>
          country.name.common
            .toLowerCase()
            .includes(value.toLowerCase())
        )

        setCountries(filteredCountries)
      })
  }

  return (
    <div>
      <div>
        find countries{' '}
        <input value={search} onChange={handleSearchChange} />
      </div>

      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countries.map(country => (
          <div key={country.cca3}>
            {country.name.common}
          </div>
        ))
      )}
    </div>
  )
}

export default App