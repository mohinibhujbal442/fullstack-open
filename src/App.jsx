import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleSearchChange = event => {
    const value = event.target.value

    setSearch(value)
    setSelectedCountry(null)
    setWeather(null)

    if (value === '') {
      setCountries([])
      return
    }

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
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

  const showCountry = country => {
    setSelectedCountry(country)
    setWeather(null)

    const capital = country.capital?.[0]

    if (!capital) {
      return
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
      )
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <div>
        find countries{' '}
        <input value={search} onChange={handleSearchChange} />
      </div>

      {selectedCountry ? (
        <div>
          <h1>{selectedCountry.name.common}</h1>

          <p>
            capital {selectedCountry.capital?.[0]}
          </p>

          <p>
            area {selectedCountry.area}
          </p>

          <h2>languages:</h2>

          <ul>
            {selectedCountry.languages &&
              Object.values(selectedCountry.languages).map(language => (
                <li key={language}>{language}</li>
              ))}
          </ul>

          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            width="200"
          />

          <h2>Weather in {selectedCountry.capital?.[0]}</h2>

          {weather && (
            <div>
              <p>
                temperature {weather.main.temp} Celsius
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />

              <p>
                wind {weather.wind.speed} m/s
              </p>
            </div>
          )}
        </div>
      ) : countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countries.map(country => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => showCountry(country)}>
              Show
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default App