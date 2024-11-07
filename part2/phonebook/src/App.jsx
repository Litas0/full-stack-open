import { useState, useEffect } from "react"

import peopleService from "./services/people"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import People from "./components/People"
import Notification from "./components/Notification"

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [topMessage, setTopMessage] = useState(null)
  const [messageGrade, setMessageGrade] = useState('message')
  useEffect(() => {
    peopleService.getAll()
    .then(peopleRecived => {
      setPeople(peopleRecived)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const person = people.find(person => person.name === newName)
    console.log(person)
    if (person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = {...person, number: newNumber}
        console.log(newPerson)
        peopleService.update(person.id, newPerson)
        .then((returnedPeople) => {
          setPeople(people.map(p => p.id === person.id ? returnedPeople : p))
          setMessageGrade('message')
          setTopMessage(`Successfully changed ${person.name} number to ${newNumber}`)        
        })
        .catch(error => {
          setMessageGrade('error')
          if (error.response) {
            setTopMessage(`Error adding: ${error.response.data.error}`)
          } else if (error.request) {
            setTopMessage(`Error with request`)
          } else {
            setTopMessage('Error: ', error.message);
          }
        })
        setNewName("")
          setNewNumber("")
          setTimeout(() => {
            setTopMessage(null)
          }, 5000)
        console.log(people)
      }
      return;
    }
    peopleService.add({ name: newName, number: newNumber })
     .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
        setMessageGrade('message')
        setTopMessage(`Successfully added ${newName}`)
        
      })
      .catch(error => {
        setMessageGrade('error')
        if (error.response) {
          setTopMessage(`Error adding: ${error.response.data.error}`)
        } else if (error.request) {
          setTopMessage(`Error with request`)
        } else {
          setTopMessage('Error: ', error.message);
        }
      })
      setNewName("")
      setNewNumber("")
      setTimeout(() => {
        setTopMessage(null)
      }, 5000)
  };

  const deletePerson = (id) => {
    const person = people.find(person => person.id === id)
    if (window.confirm('Are you sure you want to delete this person?')) {
      peopleService.remove(id).then(response => {
        console.log(response)
        response.status === 204 ? setPeople(people.filter(person => person.id!== id)) : console.error('Failure deleting')
        setMessageGrade('message')
        setTopMessage(`Successfully deleted ${person.name}`)
        setTimeout(() => {
          setTopMessage(null)
        }, 5000)
      })
      .catch( () => {
        setPeople(people.filter(person => person.id!== id))
        setMessageGrade('error')
        setTopMessage(
          `${person.name} was already removed from server`
        )
        setTimeout(() => {
          setTopMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameImputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberImputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const peopleToShow = people.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={topMessage} grade={messageGrade}/>
      <Filter filter={filter} handler={handleFilterChange} />
      <h2> Add a number to the phonebook </h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        nameChange={handleNameImputChange}
        number={newNumber}
        numberChange={handleNumberImputChange}
      />
      <h2>Numbers</h2>
      <People persons={peopleToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
