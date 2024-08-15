import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import AddPerson from './components/AddPerson'
import PersonCheck from './components/PersonCheck'
import FilterName from './components/FilterNames'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('enter name...')
  const [newNumber, setNewNumber] = useState('enter number...')
  const [filterName, setFilterName] = useState('')
  const [displayPersons, setDisplayPersons] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationLevel, setNotificationLevel] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setDisplayPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    if (event.target.value === '') {
      setDisplayPersons(persons)
      setFilterName('')
    }
    else {
      setFilterName(event.target.value)
      const filteredPersons = persons.filter((person) => RegExp(filterName, 'i').test(person.name))
      setDisplayPersons(filteredPersons)
    }
  }


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const personCheckObject = persons.filter(person => person.name === newName)
    if (personCheckObject.length > 0) {
      if (window.confirm(newName + ' already exists in the phonebook! Would you like to update the number?')) {
        const updatedNameObject = { ...personCheckObject[0], number: newNumber }
        personService
          .updateName(updatedNameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setDisplayPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('enter name...')
            setNewNumber('enter number...')

            setNotificationLevel('notificationInfo')
            setNotificationMessage(`${newName} number updated.`)
            setTimeout(() => {
              {
                setNotificationMessage('')
                setNotificationLevel('')
                setNewName('enter name...')
                setNewNumber('enter number...')
              }
            }, 2000)
          })
          .catch(error => {
            setNotificationLevel('notificationError')
            setNotificationMessage(`${newName} has already been deleted from the phonebook!`)
            setTimeout(() => {
              {
                setNotificationMessage('')
                setNotificationLevel('')
                setNewName('enter name...')
                setNewNumber('enter number...')
              }
            }, 2000)
            personService
              .getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
                setDisplayPersons(initialPersons)

              })

          })


      }
      else {
        console.log('Do nothing')
      }
    } else {
      personService
        .addName(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setDisplayPersons(persons.concat(returnedPerson))
          setNewName('enter name...')
          setNewNumber('enter number...')

          setNotificationLevel('notificationInfo')
          setNotificationMessage(`${newName} added to the phonebook.`)
          setTimeout(() => {
            {
              setNotificationMessage('')
              setNotificationLevel('')
            }
          }, 2000)
        })
        .catch(error => {
          console.log('OOOPS', error.response.data.error)
          setNotificationLevel('notificationError')
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            {
              setNotificationMessage('')
              setNotificationLevel('')
              setNewName('enter name...')
              setNewNumber('enter number...')
            }
          }, 2000)

        })
    }
  }



  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ` + person.name + `?`)) {
      personService
        .deleteName(person.id)
        .then(() => {
          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
              setDisplayPersons(initialPersons)

              setNotificationLevel('notificationInfo')
              setNotificationMessage(`${person.name} deleted from the phonebook.`)
              setTimeout(() => {
                {
                  setNotificationMessage('')
                  setNotificationLevel('')
                }
              }, 2000)
              personService
                .getAll()
                .then(initialPersons => {
                  setPersons(initialPersons)
                  setDisplayPersons(initialPersons)

                })
            })
        })
        .catch(error => {
          setNotificationLevel('notificationError')
          setNotificationMessage(`${person.name} has already been deleted from the phonebook!`)
          setTimeout(() => {
            {
              setNotificationMessage('')
              setNotificationLevel('')
            }
          }, 2000)

          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
              setDisplayPersons(initialPersons)

            })


        })
    }
    else {
    }

  }



  //////////////////////////////// App return here ///////////////////

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} level={notificationLevel} />
      <div>
        <FilterName
          filterName={filterName}
          onChange={handleFilterNameChange}
        />
        <AddPerson
          onSubmit={addName}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <Phonebook phonebook={displayPersons} deletePerson={(id) => deletePerson(id)} />
    </div>
  )
}

export default App