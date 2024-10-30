/* eslint-disable react/prop-types */
const Notification = ({ message, grade }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={grade}>
        {message}
      </div>
    )
  }
  
  export default Notification