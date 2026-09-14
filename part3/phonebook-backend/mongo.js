require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Arto Hellas',
  number: '040-123456'
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})