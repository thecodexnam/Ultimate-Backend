import React, { useContext } from 'react'
import { SubjectContext } from './Contextdata'

const Subject = () => {
    const Subject = useContext(SubjectContext)
  return (
    <div style={{backgroundColor:"green",padding:"10px"}}>
        <h1>Subject is : {Subject}</h1>
    </div>
  )
}

export default Subject