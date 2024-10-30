const PersonForm = (props) => {
    return (
      <>
      <form onSubmit={props.onSubmit}>
        <div>
          Name: 
          <input 
            value={props.name}
            onChange={props.nameChange}
          />
        </div>
        <div>
          Number:
          <input
            value={props.number}
            onChange={props.numberChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      </>
    )
}

export default PersonForm