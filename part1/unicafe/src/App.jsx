import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const avarage = Math.round(((props.good - props.bad)/(total) + Number.EPSILON) * 100) / 100
  const positive = Math.round((props.good / total + Number.EPSILON) * 10000) / 100 + "%"
  if (total === 0) return <p>No feedback given</p>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Statistics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><StatisticLine text="Good" value={props.good}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Neutral" value={props.neutral}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Bad" value={props.bad}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Avarage" value={avarage}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Positive" value={positive}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}> {props.text} </button>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <p>{props.text}: {props.value}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App