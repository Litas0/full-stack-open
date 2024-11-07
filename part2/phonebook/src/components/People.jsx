/* eslint-disable react/prop-types */
const People = ({persons, deletePerson}) => {
    return (
      <>
      {persons.map(person => 
        <div key={person.id}>
          {person.name} - {person.number} <button type="button" onClick={() => deletePerson(person.id)}> Delete </button>
        </div>
      )}
      </>
    )
}

export default People