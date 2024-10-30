import Part from './Part'
import Total from './Total'

const Content = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <>
      {course.parts.map((part) => 
        <Part key={part.id} part={part} />
      )}
      <Total total={total} />
      </>
    )
}

export default Content