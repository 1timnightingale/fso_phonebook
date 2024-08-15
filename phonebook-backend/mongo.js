const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0.xduxr8y.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`Name: ${person.name} - Number: ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`Added ${process.argv[3]} number ${process.argv[4]} to the phonebook`)
    mongoose.connection.close()
  })
}



// save a new person
/*
const person = new Person({
    name: 'Bluey Heeler',
    number: '123456',
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})
*/

//// find a person
/*
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})

*/
