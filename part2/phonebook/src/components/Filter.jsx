/* eslint-disable react/prop-types */
const Filter = ({filter, handler}) => {
    return (
      <>
      Filter numbers with: 
      <input 
      value={filter}
      onChange={handler}
      />
      </>
    )
}

export default Filter