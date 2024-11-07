/* eslint-disable react/prop-types */
const PersonForm = ({onSubmit, name, nameChange, number, numberChange }) => {
    return (
      <>
      <form onSubmit={onSubmit}>
        <div>
          Name: 
          <input 
            value={name}
            onChange={nameChange}
          />
        </div>
        <div>
          Number:
          <input
            value={number}
            onChange={numberChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      </>
    )
}

export default PersonForm