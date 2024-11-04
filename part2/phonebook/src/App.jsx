import { useState, useEffect } from "react"
import axios from 'axios'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const baseUrl = "/api/persons"

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [topMessage, setTopMessage] = useState(null)
  const [messageGrade, setMessageGrade] = useState('message')
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const url = `${baseUrl}/${person.id}`
        const newPerson = {...person, number: newNumber}
        axios
        .put(url, newPerson)
        .then((response) => {
          setPersons(persons.map(p => p.id === person.id ? response.data : p))
        })
        setMessageGrade('message')
        setTopMessage(`Successfully changed ${person.name} number to ${person.number}`)
        setTimeout(() => {
          setTopMessage(null)
        }, 5000)
      }
      return;
    }
    axios
     .post(baseUrl, { name: newName, number: newNumber })
     .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
      })
      setMessageGrade('message')
      setTopMessage(`Successfully added ${newName}`)
      setTimeout(() => {
        setTopMessage(null)
      }, 5000)
  };

  const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    const person = persons.find(person => person.id === id)
    if (window.confirm('Are you sure you want to delete this person?')) {
      axios.delete(url).then(response => {
        console.log(response)
        response.status === 204 ? setPersons(persons.filter(person => person.id!== id)) : console.error('Failure deleting')
        setMessageGrade('message')
        setTopMessage(`Successfully deleted ${person.name}`)
        setTimeout(() => {
          setTopMessage(null)
        }, 5000)
      })
      .catch( () => {
        setPersons(persons.filter(person => person.id!== id))
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

  const personsToShow = persons.filter((person) =>
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
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
